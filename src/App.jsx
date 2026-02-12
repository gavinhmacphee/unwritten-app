import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from './lib/supabase'
import { getDailyPrompt, getRandomPrompt } from './lib/prompts'

// ─── HELPERS ──────────────────────────────────────────────
const TODAY = new Date().toISOString().split('T')[0]

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatMonthYear(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function formatDayShort(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  const day = d.toLocaleDateString('en-US', { weekday: 'short' })
  const num = d.getDate()
  return `${day} ${num}`
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function groupByMonth(entries) {
  const groups = {}
  entries.forEach(e => {
    const key = e.entry_date.substring(0, 7) // YYYY-MM
    if (!groups[key]) groups[key] = []
    groups[key].push(e)
  })
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}

const CHILD_EMOJIS = ['✒️', '🌟', '🦋', '🐣', '🌈', '🎨', '⚽', '🎵', '🌻', '🐾']


// ─── AUTH SCREEN ──────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('signin') // signin | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } }
      })
      if (error) {
        setError(error.message)
      } else {
        setError('')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      }
    }
    setLoading(false)
  }

  return (
    <div className="auth-screen">
      <div className="auth-logo">✒️</div>
      <h1 className="auth-title">Unwritten</h1>
      <p className="auth-subtitle">Their story is unwritten. One line a day makes it forever.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        
        {mode === 'signup' && (
          <input
            className="auth-input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}
        
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />
        
        <button
          type="submit"
          className="auth-btn auth-btn-primary"
          disabled={loading}
        >
          {loading ? '...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="auth-toggle">
        {mode === 'signin' ? (
          <>Don't have an account? <button onClick={() => { setMode('signup'); setError('') }}>Sign up</button></>
        ) : (
          <>Already have an account? <button onClick={() => { setMode('signin'); setError('') }}>Sign in</button></>
        )}
      </div>
    </div>
  )
}


// ─── ONBOARDING (ADD FIRST CHILD) ────────────────────────
const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Every day', desc: 'Build a daily habit' },
  { value: 'weekly', label: 'Once a week', desc: 'A weekly reflection' },
  { value: 'whenever', label: 'Whenever I want', desc: 'No pressure, no schedule' },
]

function OnboardingScreen({ onAdd }) {
  const [step, setStep] = useState(1) // 1 = frequency, 2 = add child
  const [frequency, setFrequency] = useState(null)
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [emoji, setEmoji] = useState('✒️')
  const [loading, setLoading] = useState(false)

  function handleFrequencyNext() {
    if (!frequency) return
    localStorage.setItem('unwritten-frequency', frequency)
    setStep(2)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    await onAdd({ name: name.trim(), date_of_birth: dob || null, emoji })
    setLoading(false)
  }

  if (step === 1) {
    return (
      <div className="onboarding">
        <div className="onboarding-emoji">📖</div>
        <h2>How often do you want to capture memories?</h2>
        <p>You can always change this later</p>

        <div className="onboarding-form">
          {FREQUENCY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`frequency-option ${frequency === opt.value ? 'selected' : ''}`}
              onClick={() => setFrequency(opt.value)}
            >
              <span className="frequency-label">{opt.label}</span>
              <span className="frequency-desc">{opt.desc}</span>
            </button>
          ))}

          <button
            className="auth-btn auth-btn-primary"
            onClick={handleFrequencyNext}
            disabled={!frequency}
            style={{ marginTop: 8 }}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding">
      <div className="onboarding-emoji">👶</div>
      <h2>Who are we journaling about?</h2>
      <p>Add your child to get started</p>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="emoji-picker">
          {CHILD_EMOJIS.map(e => (
            <button
              key={e}
              type="button"
              className={`emoji-option ${emoji === e ? 'selected' : ''}`}
              onClick={() => setEmoji(e)}
            >
              {e}
            </button>
          ))}
        </div>

        <input
          className="auth-input"
          type="text"
          placeholder="Child's name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          autoFocus
        />

        <input
          className="auth-input"
          type="date"
          placeholder="Date of birth (optional)"
          value={dob}
          onChange={e => setDob(e.target.value)}
        />

        <button
          type="submit"
          className="auth-btn auth-btn-primary"
          disabled={loading || !name.trim()}
        >
          {loading ? 'Adding...' : "Let's go!"}
        </button>
      </form>
    </div>
  )
}


// ─── ADD CHILD MODAL ──────────────────────────────────────
function AddChildModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [emoji, setEmoji] = useState('🌟')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    await onAdd({ name: name.trim(), date_of_birth: dob || null, emoji })
    setLoading(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <h3 className="modal-title">Add a child</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={handleSubmit}>
          <div className="emoji-picker">
            {CHILD_EMOJIS.map(e => (
              <button
                key={e}
                type="button"
                className={`emoji-option ${emoji === e ? 'selected' : ''}`}
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>

          <input
            className="auth-input"
            type="text"
            placeholder="Child's name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />

          <input
            className="auth-input"
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              className="auth-btn"
              style={{ background: 'var(--light-gray)', color: 'var(--warm-gray)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="auth-btn auth-btn-primary"
              disabled={loading || !name.trim()}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


// ─── JOURNAL VIEW (TODAY) ─────────────────────────────────
function JournalView({ user, children, selectedChild, onSelectChild, entries, onSaveEntry, streak, onShowAddChild }) {
  const child = children.find(c => c.id === selectedChild)
  const [entryDate, setEntryDate] = useState(TODAY)
  const dateEntry = entries.find(e => e.entry_date === entryDate && e.child_id === selectedChild)

  const [text, setText] = useState(dateEntry?.text || '')
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(dateEntry?.photo_path ? getPhotoUrl(dateEntry.photo_path) : null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(!!dateEntry)
  const [promptText, setPromptText] = useState(null)
  const fileInput = useRef(null)

  // Update text when child, date, or entry changes
  useEffect(() => {
    setText(dateEntry?.text || '')
    setPhotoPreview(dateEntry?.photo_path ? getPhotoUrl(dateEntry.photo_path) : null)
    setPhotoFile(null)
    setSaved(!!dateEntry)
    setPromptText(null)
  }, [selectedChild, entryDate, dateEntry?.id])

  function getPhotoUrl(path) {
    if (!path) return null
    const { data } = supabase.storage.from('photos').getPublicUrl(path)
    return data.publicUrl
  }

  function handlePhotoSelect(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
    setSaved(false)
  }

  function removePhoto() {
    setPhotoFile(null)
    setPhotoPreview(null)
    if (fileInput.current) fileInput.current.value = ''
    setSaved(false)
  }

  function handleInspireMe() {
    if (child) {
      setPromptText(getRandomPrompt(child.name))
    }
  }

  async function handleSave() {
    if (!text.trim() || !child) return
    setSaving(true)

    let photoPath = dateEntry?.photo_path || null

    // Upload photo if new one selected
    if (photoFile) {
      const ext = photoFile.name.split('.').pop()
      const path = `${user.id}/${selectedChild}/${entryDate}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(path, photoFile, { upsert: true })

      if (!uploadError) {
        photoPath = path
      }
    } else if (!photoPreview && dateEntry?.photo_path) {
      // Photo was removed
      photoPath = null
    }

    await onSaveEntry({
      child_id: selectedChild,
      entry_date: entryDate,
      text: text.trim(),
      photo_path: photoPath,
      prompt_used: promptText || '',
    })

    setSaving(false)
    setSaved(true)
  }

  if (!child) return null

  const charCount = text.length
  const isBackdated = entryDate !== TODAY

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="header-greeting">{getGreeting()}</div>
        <div className="header-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Child tabs */}
      <div className="child-tabs">
        {children.map(c => (
          <button
            key={c.id}
            className={`child-tab ${c.id === selectedChild ? 'active' : ''}`}
            onClick={() => onSelectChild(c.id)}
          >
            <span>{c.emoji}</span>
            <span>{c.name}</span>
          </button>
        ))}
        <button className="child-tab child-tab-add" onClick={onShowAddChild}>
          + Add
        </button>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="streak-card">
          <div className="streak-flame">{streak >= 7 ? '🔥' : '✨'}</div>
          <div className="streak-info">
            <div className="streak-count">{streak} day{streak !== 1 ? 's' : ''}</div>
            <div className="streak-label">
              {streak >= 30 ? 'Incredible streak!' :
               streak >= 7 ? 'You\'re on fire!' :
               'Keep it going!'}
            </div>
          </div>
        </div>
      )}

      {/* Date picker */}
      <div className="date-picker-row">
        <input
          type="date"
          className="date-picker"
          value={entryDate}
          max={TODAY}
          onChange={e => setEntryDate(e.target.value)}
        />
        {isBackdated && (
          <button className="date-today-btn" onClick={() => setEntryDate(TODAY)}>
            Back to today
          </button>
        )}
      </div>

      {/* Journal entry */}
      <div className="journal-card">
        {promptText && (
          <div className="journal-prompt">{promptText}</div>
        )}

        <textarea
          className="journal-textarea"
          placeholder={isBackdated ? "What happened that day?" : "What happened today?"}
          value={text}
          onChange={e => {
            if (e.target.value.length <= 280) {
              setText(e.target.value)
              setSaved(false)
            }
          }}
          rows={3}
        />

        <div className={`char-count ${charCount > 250 ? 'near-limit' : ''}`}>
          {charCount}/280
        </div>

        {photoPreview && (
          <div className="photo-preview">
            <img src={photoPreview} alt="Photo" />
            <button className="photo-preview-remove" onClick={removePhoto}>×</button>
          </div>
        )}

        <div className="journal-actions">
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoSelect}
          />
          <button
            className={`photo-btn ${photoPreview ? 'has-photo' : ''}`}
            onClick={() => fileInput.current?.click()}
          >
            📷 {photoPreview ? 'Change' : 'Photo'}
          </button>
          <button
            className="inspire-btn"
            onClick={handleInspireMe}
          >
            💡 Prompt
          </button>
          <button
            className={`save-btn ${saved ? 'saved' : ''}`}
            onClick={handleSave}
            disabled={saving || !text.trim()}
          >
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Recent entries preview */}
      {entries.filter(e => e.child_id === selectedChild && e.entry_date !== entryDate).length > 0 && (
        <div style={{ padding: '0 20px', marginBottom: 16 }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: 'var(--sage)',
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10
          }}>
            Recent
          </div>
          {entries
            .filter(e => e.child_id === selectedChild && e.entry_date !== entryDate)
            .slice(0, 3)
            .map(e => (
              <div key={e.id} className="timeline-entry">
                <div className="timeline-date">{formatDayShort(e.entry_date)}</div>
                <div className="timeline-text">{e.text}</div>
                {e.photo_path && (
                  <img
                    className="timeline-photo"
                    src={supabase.storage.from('photos').getPublicUrl(e.photo_path).data.publicUrl}
                    alt=""
                  />
                )}
              </div>
            ))
          }
        </div>
      )}
    </>
  )
}


// ─── TIMELINE VIEW ────────────────────────────────────────
function TimelineView({ children, selectedChild, onSelectChild, entries }) {
  const childEntries = entries
    .filter(e => e.child_id === selectedChild)
    .sort((a, b) => b.entry_date.localeCompare(a.entry_date))

  const grouped = groupByMonth(childEntries)

  return (
    <>
      <div className="timeline-header">
        <h2>Timeline</h2>
      </div>

      <div className="child-tabs">
        {children.map(c => (
          <button
            key={c.id}
            className={`child-tab ${c.id === selectedChild ? 'active' : ''}`}
            onClick={() => onSelectChild(c.id)}
          >
            <span>{c.emoji}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {grouped.length === 0 ? (
        <div className="timeline-empty">
          <div className="timeline-empty-icon">📝</div>
          <p>No entries yet. Start writing today!</p>
        </div>
      ) : (
        grouped.map(([month, monthEntries]) => (
          <div key={month} className="timeline-month">
            <div className="timeline-month-label">
              {formatMonthYear(month + '-01')}
            </div>
            {monthEntries
              .sort((a, b) => b.entry_date.localeCompare(a.entry_date))
              .map(e => (
                <div key={e.id} className="timeline-entry">
                  <div className="timeline-date">{formatDayShort(e.entry_date)}</div>
                  <div className="timeline-text">{e.text}</div>
                  {e.photo_path && (
                    <img
                      className="timeline-photo"
                      src={supabase.storage.from('photos').getPublicUrl(e.photo_path).data.publicUrl}
                      alt=""
                    />
                  )}
                </div>
              ))
            }
          </div>
        ))
      )}
    </>
  )
}


// ─── SETTINGS VIEW ────────────────────────────────────────
function SettingsView({ user, children, entries, onSignOut }) {
  const totalEntries = entries.length
  const daysSinceFirst = entries.length > 0
    ? Math.ceil((new Date() - new Date(entries[entries.length - 1]?.entry_date + 'T12:00:00')) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <>
      <div className="timeline-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-section">
        <h3>Your Stats</h3>
        <div className="settings-card">
          <div className="settings-row">
            <span className="settings-row-label">Total entries</span>
            <span className="settings-row-value">{totalEntries}</span>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Days journaling</span>
            <span className="settings-row-value">{daysSinceFirst}</span>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Children</span>
            <span className="settings-row-value">{children.length}</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Children</h3>
        <div className="settings-card">
          {children.map(c => (
            <div key={c.id} className="settings-row">
              <span style={{ fontSize: 20 }}>{c.emoji}</span>
              <span className="settings-row-label">{c.name}</span>
              {c.date_of_birth && (
                <span className="settings-row-value">
                  Born {new Date(c.date_of_birth + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>Account</h3>
        <div className="settings-card">
          <div className="settings-row">
            <span className="settings-row-label">Email</span>
            <span className="settings-row-value">{user.email}</span>
          </div>
          <button className="settings-row-danger" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{
        textAlign: 'center', padding: '20px', fontSize: 12, color: 'var(--warm-gray)'
      }}>
        Unwritten v1.0 — Made with ❤️
      </div>
    </>
  )
}


// ─── BOTTOM NAV ───────────────────────────────────────────
function BottomNav({ view, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${view === 'today' ? 'active' : ''}`}
        onClick={() => onNavigate('today')}
      >
        <span className="nav-item-icon">✏️</span>
        <span>Today</span>
      </button>
      <button
        className={`nav-item ${view === 'timeline' ? 'active' : ''}`}
        onClick={() => onNavigate('timeline')}
      >
        <span className="nav-item-icon">📖</span>
        <span>Timeline</span>
      </button>
      <button
        className={`nav-item ${view === 'settings' ? 'active' : ''}`}
        onClick={() => onNavigate('settings')}
      >
        <span className="nav-item-icon">⚙️</span>
        <span>Settings</span>
      </button>
    </nav>
  )
}


// ─── TOAST ────────────────────────────────────────────────
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return <div className="toast">{message}</div>
}


// ─── MAIN APP ─────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState(null)
  const [entries, setEntries] = useState([])
  const [streak, setStreak] = useState(0)
  const [view, setView] = useState('today')
  const [showAddChild, setShowAddChild] = useState(false)
  const [toast, setToast] = useState(null)

  // ─── AUTH LISTENER ────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ─── LOAD DATA WHEN USER CHANGES ────
  useEffect(() => {
    if (!user) {
      setChildren([])
      setEntries([])
      setSelectedChild(null)
      return
    }
    loadChildren()
    loadEntries()
    loadStreak()
  }, [user])

  async function loadChildren() {
    const { data } = await supabase
      .from('children')
      .select('*')
      .order('created_at')
    
    if (data) {
      setChildren(data)
      if (data.length > 0 && !selectedChild) {
        setSelectedChild(data[0].id)
      }
    }
  }

  async function loadEntries() {
    const { data } = await supabase
      .from('entries')
      .select('*')
      .order('entry_date', { ascending: false })
      .limit(200)
    
    if (data) setEntries(data)
  }

  async function loadStreak() {
    const { data, error } = await supabase.rpc('get_current_streak', { p_user_id: user.id })
    if (!error && data !== null) setStreak(data)
  }

  // ─── ADD CHILD ────
  async function handleAddChild({ name, date_of_birth, emoji }) {
    const { data, error } = await supabase
      .from('children')
      .insert({ user_id: user.id, name, date_of_birth, emoji })
      .select()
      .single()
    
    if (data) {
      setChildren(prev => [...prev, data])
      setSelectedChild(data.id)
      setToast(`${emoji} ${name} added!`)
    }
  }

  // ─── SAVE ENTRY ────
  async function handleSaveEntry(entryData) {
    const existing = entries.find(
      e => e.child_id === entryData.child_id && e.entry_date === entryData.entry_date
    )

    if (existing) {
      // Update
      const { data, error } = await supabase
        .from('entries')
        .update({
          text: entryData.text,
          photo_path: entryData.photo_path,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single()
      
      if (data) {
        setEntries(prev => prev.map(e => e.id === data.id ? data : e))
        setToast('Updated ✓')
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from('entries')
        .insert({ user_id: user.id, ...entryData })
        .select()
        .single()
      
      if (data) {
        setEntries(prev => [data, ...prev])
        setStreak(prev => prev + 1)
        setToast('Saved ✓')
      }
    }
  }

  // ─── SIGN OUT ────
  async function handleSignOut() {
    await supabase.auth.signOut()
    setView('today')
  }

  // ─── RENDER ────
  if (loading) {
    return <div className="loading">✒️</div>
  }

  if (!user) {
    return <AuthScreen />
  }

  if (children.length === 0) {
    return <OnboardingScreen onAdd={handleAddChild} />
  }

  return (
    <div className="app-container">
      <div className="main-content">
        {view === 'today' && (
          <JournalView
            user={user}
            children={children}
            selectedChild={selectedChild}
            onSelectChild={setSelectedChild}
            entries={entries}
            onSaveEntry={handleSaveEntry}
            streak={streak}
            onShowAddChild={() => setShowAddChild(true)}
          />
        )}
        {view === 'timeline' && (
          <TimelineView
            children={children}
            selectedChild={selectedChild}
            onSelectChild={setSelectedChild}
            entries={entries}
          />
        )}
        {view === 'settings' && (
          <SettingsView
            user={user}
            children={children}
            entries={entries}
            onSignOut={handleSignOut}
          />
        )}
      </div>

      <BottomNav view={view} onNavigate={setView} />

      {showAddChild && (
        <AddChildModal
          onAdd={handleAddChild}
          onClose={() => setShowAddChild(false)}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
