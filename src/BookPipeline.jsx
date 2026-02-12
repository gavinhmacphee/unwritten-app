import { useState } from "react";

const CREAM = "#FFF8F0";
const SAGE = "#7C9A82";
const CORAL = "#E8836B";
const DARK = "#2C2C2C";
const WARM_GRAY = "#8B8178";
const LIGHT_SAGE = "#E8F0E9";

function BookPage({ children, label, dim }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 280, height: 280, background: "#fff", borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        overflow: "hidden", position: "relative",
      }}>
        {children}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          border: "1px dashed rgba(200,60,60,0.2)", pointerEvents: "none",
        }} />
      </div>
      <div style={{ fontSize: 11, color: WARM_GRAY, textAlign: "center" }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        {dim && <div style={{ fontSize: 10, opacity: 0.7 }}>{dim}</div>}
      </div>
    </div>
  );
}

function CoverPage() {
  return (
    <BookPage label="Front Cover" dim="7.125 x 7.125 in (with bleed)">
      <div style={{
        width: "100%", height: "100%",
        background: "linear-gradient(145deg, #E8F0E9 0%, #D4E4D6 40%, #C5D8C7 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: 32, boxSizing: "border-box",
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(255,255,255,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20, fontSize: 42,
        }}>
          🌱
        </div>
        <div style={{
          fontFamily: "'Georgia', serif", fontSize: 22, color: DARK,
          fontWeight: 700, textAlign: "center", lineHeight: 1.2, marginBottom: 8,
        }}>
          One Line a Day
        </div>
        <div style={{
          fontFamily: "'Georgia', serif", fontSize: 13, color: WARM_GRAY,
          textAlign: "center", marginBottom: 16, fontStyle: "italic",
        }}>
          Emma's First Year
        </div>
        <div style={{ width: 40, height: 1, background: SAGE, marginBottom: 16, opacity: 0.5 }} />
        <div style={{ fontSize: 11, color: WARM_GRAY, textAlign: "center", letterSpacing: 1 }}>
          JUNE 2025 — MAY 2026
        </div>
      </div>
    </BookPage>
  );
}

function EntryPageText() {
  return (
    <BookPage label="Entry Page (text only)" dim="7 x 7 in trim">
      <div style={{
        width: "100%", height: "100%", background: CREAM,
        padding: "28px 24px", boxSizing: "border-box",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ fontSize: 9, color: SAGE, letterSpacing: 2, marginBottom: 4, fontWeight: 600 }}>
          SEPTEMBER 2025
        </div>
        <div style={{ width: 24, height: 1.5, background: SAGE, marginBottom: 16, opacity: 0.4 }} />
        {[
          { day: "Mon 1", text: "First day of daycare. She waved bye without crying — I cried in the car." },
          { day: "Tue 2", text: "Said 'more' at dinner while pointing at the pasta bowl. Her first real word?" },
          { day: "Wed 3", text: "Laughed hysterically at the dog sneezing. Replayed it six times." },
          { day: "Thu 4", text: "Took three steps between the couch and coffee table. Walking is coming." },
          { day: "Fri 5", text: "Fell asleep holding my finger during the 2am feeding." },
          { day: "Sat 6", text: "Spent 20 minutes stacking blocks just to knock them down. Pure joy." },
          { day: "Sun 7", text: "Grammy visited — Emma reached for her immediately. My heart." },
        ].map((entry, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, marginBottom: 8, paddingBottom: 8,
            borderBottom: i < 6 ? "1px solid rgba(124,154,130,0.1)" : "none",
          }}>
            <div style={{
              fontSize: 9, color: CORAL, fontWeight: 700, minWidth: 32, paddingTop: 1,
              fontFamily: "monospace",
            }}>
              {entry.day}
            </div>
            <div style={{
              fontSize: 10.5, color: DARK, lineHeight: 1.5, fontFamily: "'Georgia', serif",
            }}>
              {entry.text}
            </div>
          </div>
        ))}
      </div>
    </BookPage>
  );
}

function EntryPagePhoto() {
  return (
    <BookPage label="Entry Page (with photo)" dim="7 x 7 in trim">
      <div style={{
        width: "100%", height: "100%", background: CREAM,
        padding: "24px 20px", boxSizing: "border-box",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ fontSize: 9, color: SAGE, letterSpacing: 2, marginBottom: 4, fontWeight: 600 }}>
          OCTOBER 2025
        </div>
        <div style={{ width: 24, height: 1.5, background: SAGE, marginBottom: 12, opacity: 0.4 }} />
        <div style={{
          background: "linear-gradient(135deg, #f0e6d6 0%, #e8ddd0 100%)",
          borderRadius: 4, padding: 10, marginBottom: 10, display: "flex", gap: 10,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 3,
            background: "linear-gradient(145deg, #C5D8C7 0%, #A8C4AB 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>
            📸
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: CORAL, fontWeight: 700, fontFamily: "monospace", marginBottom: 3 }}>
              Sat 4
            </div>
            <div style={{ fontSize: 10.5, color: DARK, lineHeight: 1.45, fontFamily: "'Georgia', serif" }}>
              First time at the pumpkin patch. She hugged every single pumpkin.
            </div>
          </div>
        </div>
        {[
          { day: "Sun 5", text: "Danced to the Bluey theme song. Full spin moves." },
          { day: "Mon 6", text: "Pointed at the moon and said 'ball.' Close enough." },
          { day: "Tue 7", text: "She shared her cracker with the cat. Unprompted kindness." },
          { day: "Wed 8", text: "Built a tower of 5 blocks — new record." },
        ].map((entry, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, marginBottom: 7, paddingBottom: 7,
            borderBottom: i < 3 ? "1px solid rgba(124,154,130,0.1)" : "none",
          }}>
            <div style={{
              fontSize: 9, color: CORAL, fontWeight: 700, minWidth: 32, paddingTop: 1,
              fontFamily: "monospace",
            }}>
              {entry.day}
            </div>
            <div style={{ fontSize: 10.5, color: DARK, lineHeight: 1.45, fontFamily: "'Georgia', serif" }}>
              {entry.text}
            </div>
          </div>
        ))}
      </div>
    </BookPage>
  );
}

function BackCover() {
  return (
    <BookPage label="Back Cover" dim="7.125 x 7.125 in (with bleed)">
      <div style={{
        width: "100%", height: "100%",
        background: "linear-gradient(145deg, #E8F0E9 0%, #D4E4D6 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: 40, boxSizing: "border-box",
      }}>
        <div style={{
          fontFamily: "'Georgia', serif", fontSize: 13, color: WARM_GRAY,
          textAlign: "center", lineHeight: 1.8, fontStyle: "italic", marginBottom: 24,
        }}>
          "365 tiny moments.<br />
          One big story."
        </div>
        <div style={{ width: 30, height: 1, background: SAGE, marginBottom: 24, opacity: 0.4 }} />
        <div style={{ fontSize: 10, color: WARM_GRAY, textAlign: "center", letterSpacing: 1, opacity: 0.7 }}>
          MADE WITH UNWRITTEN
        </div>
      </div>
    </BookPage>
  );
}

function PipelineStep({ number, title, subtitle, details, color, icon }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "#fff", borderRadius: 10, padding: "18px 20px",
      border: `1px solid ${color}22`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 14, cursor: "pointer", userSelect: "none",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: `${color}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>{title}</div>
          <div style={{ fontSize: 12, color: WARM_GRAY }}>{subtitle}</div>
        </div>
        <div style={{
          fontSize: 11, color, fontWeight: 600, background: `${color}12`,
          padding: "3px 10px", borderRadius: 12, flexShrink: 0,
        }}>
          Step {number}
        </div>
        <div style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s", fontSize: 14, color: WARM_GRAY,
        }}>
          ▼
        </div>
      </div>
      {open && (
        <div style={{
          marginTop: 14, paddingTop: 14, borderTop: `1px solid ${color}15`,
          fontSize: 12.5, color: "#555", lineHeight: 1.7,
        }}>
          {details}
        </div>
      )}
    </div>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div style={{ marginTop: 8, marginBottom: 8 }}>
      {label && <div style={{ fontSize: 10, color: SAGE, fontWeight: 600, marginBottom: 4 }}>{label}</div>}
      <pre style={{
        background: "#1a1a2e", color: "#e0e0e0", padding: 14, borderRadius: 6,
        fontSize: 11, lineHeight: 1.6, overflow: "auto", margin: 0,
        fontFamily: "'SF Mono', 'Fira Code', monospace",
      }}>
        {code}
      </pre>
    </div>
  );
}

export default function BookPipeline() {
  const [tab, setTab] = useState("template");

  return (
    <div style={{
      minHeight: "100vh", background: "#F7F5F2",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #2C2C2C 0%, #3d3d3d 100%)",
        padding: "28px 24px 20px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: SAGE, letterSpacing: 2, marginBottom: 6, fontWeight: 600 }}>
            UNWRITTEN — PRINTED BOOK
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
            Book Printing Pipeline
          </div>
          <div style={{ fontSize: 13, color: "#aaa" }}>
            Blurb / RPI Print API Integration Architecture
          </div>
        </div>
      </div>

      <div style={{
        background: "#fff", borderBottom: "1px solid #e8e4e0",
        padding: "0 24px", position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { id: "template", label: "Book Template" },
            { id: "pipeline", label: "Order Pipeline" },
            { id: "api", label: "API Integration" },
            { id: "economics", label: "Unit Economics" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "14px 18px", fontSize: 13, fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? SAGE : WARM_GRAY,
              background: "none", border: "none", cursor: "pointer",
              borderBottom: tab === t.id ? `2px solid ${SAGE}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 24px 60px" }}>

        {tab === "template" && (
          <div>
            <div style={{
              background: LIGHT_SAGE, borderRadius: 10, padding: "16px 20px",
              marginBottom: 24, fontSize: 13, color: DARK, lineHeight: 1.6,
            }}>
              <strong>Format:</strong> 7x7" Square Softcover — Blurb Photo Book<br />
              <strong>Paper:</strong> Premium Lustre (100# semi-gloss) — best for photos + text<br />
              <strong>Pages:</strong> 40-80 (depending on date range selected)<br />
              <strong>Bleed:</strong> 0.125" on top, bottom, outside edge. 0" on gutter.
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 16 }}>
              Page Templates
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 24,
            }}>
              <CoverPage />
              <EntryPageText />
              <EntryPagePhoto />
              <BackCover />
            </div>
            <div style={{
              background: "#fff", borderRadius: 10, padding: "18px 20px",
              border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 10 }}>
                Page Layout Logic
              </div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ color: CORAL, fontWeight: 600 }}>Cover:</span> Child name + date range + decorative element. User picks from 4-5 preset designs.
                </div>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ color: CORAL, fontWeight: 600 }}>Interior:</span> Each page = 1 week (7 entries). Date on left, text on right. Photo entries get a highlighted card with inline thumbnail.
                </div>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ color: CORAL, fontWeight: 600 }}>Photo pages:</span> When a week has 2+ photos, a full-bleed photo spread is inserted after that week's text page.
                </div>
                <div>
                  <span style={{ color: CORAL, fontWeight: 600 }}>Back:</span> Tagline + branding. Subtle — this is their keepsake, not our ad.
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "pipeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              background: LIGHT_SAGE, borderRadius: 10, padding: "16px 20px",
              marginBottom: 8, fontSize: 13, color: DARK, lineHeight: 1.6,
            }}>
              When a parent taps <strong>"Order Book"</strong>, here's everything that happens. Total time from tap to doorstep: <strong>5-8 business days</strong>.
            </div>

            <PipelineStep number={1} color={SAGE} icon="🛒"
              title="Parent Selects Book Options"
              subtitle="App frontend — happens instantly"
              details={
                <div>
                  <div>Parent picks: date range (e.g. "Emma's First Year"), softcover vs hardcover, and quantity. They see a live preview and a price.</div>
                  <CodeBlock code={`{
  child_id: "emma_abc123",
  date_range: { start: "2025-06-01", end: "2026-05-31" },
  format: "softcover_7x7",
  cover_template: "garden",
  quantity: 2,
  shipping: {
    name: "Sarah Johnson",
    street: "123 Oak St",
    city: "Portland", state: "OR", zip: "97201"
  }
}`} />
                </div>
              }
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 2, height: 20, background: "#ddd" }} />
            </div>

            <PipelineStep number={2} color={CORAL} icon="💳"
              title="Stripe Checkout"
              subtitle="Payment processed before we generate anything"
              details={
                <div>
                  <div>Stripe Checkout Session collects payment. We charge the retail price ($34.99 softcover / $54.99 hardcover). Payment is captured immediately.</div>
                  <div style={{ marginTop: 8 }}>On successful payment, Stripe webhook fires <code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>checkout.session.completed</code> which triggers the PDF generation job.</div>
                  <div style={{ marginTop: 8, background: "#FFF3E8", padding: 10, borderRadius: 6, fontSize: 11 }}>
                    <strong>Why Stripe first:</strong> Never generate a PDF (compute cost) until money is in hand. PDF generation takes 15-60 seconds of server time.
                  </div>
                </div>
              }
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 2, height: 20, background: "#ddd" }} />
            </div>

            <PipelineStep number={3} color="#6B7FD7" icon="📄"
              title="PDF Generation (Your Server)"
              subtitle="Puppeteer renders HTML template → press-ready PDF"
              details={
                <div>
                  <div>This is the piece YOU build. A serverless function that:</div>
                  <div style={{ margin: "10px 0", paddingLeft: 12, borderLeft: "2px solid #6B7FD722" }}>
                    <div>1. Fetches all entries + photos for the date range from Supabase</div>
                    <div>2. Renders an HTML template with proper 7x7" dimensions + 0.125" bleed</div>
                    <div>3. Uses Puppeteer to convert to PDF at 300 DPI</div>
                    <div>4. Outputs TWO PDFs: cover file + interior ("guts") file</div>
                    <div>5. Uploads both to S3 with pre-signed URLs</div>
                  </div>
                  <CodeBlock label="PDF specs for Blurb 7x7 Softcover" code={`Cover PDF:
  - Single page: 14.375" x 7.25"
  - (front + spine + back + bleeds)
  - Spine width varies by page count

Interior ("Guts") PDF:
  - Page size: 7.125" x 7.125" (trim + bleed)
  - Trim: 7" x 7"
  - Bleed: 0.125" top, bottom, outside
  - Inner bleed (gutter): 0"
  - Safe area: 0.25" from trim edge
  - Images: 300 PPI minimum
  - Color: sRGB (CMYK optional)
  - Fonts: must be embedded`} />
                </div>
              }
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 2, height: 20, background: "#ddd" }} />
            </div>

            <PipelineStep number={4} color="#D4A843" icon="🖨️"
              title="RPI Print API Order"
              subtitle="Send PDFs + shipping → book gets printed"
              details={
                <div>
                  <div>Your server sends a POST to RPI's API with the S3 URLs for cover + guts PDFs, the product SKU, and the shipping address.</div>
                  <CodeBlock label="Create Order (simplified)" code={`POST https://api.rpiprint.com/api/v1/orders

{
  "external_id": "unwritten_order_abc123",
  "items": [{
    "sku": "7x7_softcover_lustre",
    "quantity": 2,
    "cover_url": "https://s3.../cover.pdf",
    "guts_url": "https://s3.../interior.pdf"
  }],
  "shipping": {
    "name": "Sarah Johnson",
    "street1": "123 Oak St",
    "city": "Portland",
    "state": "OR",
    "zip": "97201",
    "method": "standard"
  }
}`} />
                  <div style={{ marginTop: 8 }}>
                    <strong>Order enters Holding Bin</strong> — cancellable via API. After payment clears (auto-charged at 9 PM EST daily), order moves to production.
                  </div>
                  <div style={{ marginTop: 8, background: "#FFF3E8", padding: 10, borderRadius: 6, fontSize: 11 }}>
                    <strong>Rate limit:</strong> 50 orders per 24 hours on self-service API. Overflow queues (up to 350). Fine for early stage.
                  </div>
                </div>
              }
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 2, height: 20, background: "#ddd" }} />
            </div>

            <PipelineStep number={5} color={SAGE} icon="📦"
              title="Print + Ship (RPI Handles Everything)"
              subtitle="5-day SLA from order acceptance"
              details={
                <div>
                  <div>RPI preflights the PDFs (automated checks for bleed, resolution, color), prints at their nearest facility, and ships directly to the customer. You never touch a book.</div>
                  <div style={{ marginTop: 10, fontWeight: 600 }}>Webhooks keep you informed:</div>
                  <div style={{ margin: "8px 0", paddingLeft: 12, borderLeft: `2px solid ${SAGE}22` }}>
                    <div><code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>order.accepted</code> — Payment confirmed, entering production</div>
                    <div><code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>order.printing</code> — Book is being printed</div>
                    <div><code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>order.shipped</code> — Tracking number available</div>
                    <div><code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>order.delivered</code> — Complete</div>
                  </div>
                  <div style={{ marginTop: 8 }}>You forward the tracking number to the parent via email/push notification.</div>
                </div>
              }
            />
          </div>
        )}

        {tab === "api" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "#fff", borderRadius: 10, padding: "18px 20px", border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>
                Integration Checklist
              </div>
              {[
                { done: true, text: "Sign up at api.rpiprint.com (free, no approval needed)" },
                { done: true, text: "Get API credentials (start in sandbox)" },
                { done: false, text: "Build PDF generator (cover + guts templates)" },
                { done: false, text: "Set up S3 bucket for PDF hosting (us-west-2)" },
                { done: false, text: "Implement Stripe checkout flow" },
                { done: false, text: "Build order creation endpoint (your server → RPI)" },
                { done: false, text: "Set up webhook receiver for order status updates" },
                { done: false, text: "Build order tracking UI for parents" },
                { done: false, text: "Test end-to-end in sandbox (orders don't actually print)" },
                { done: false, text: "Add payment method to RPI → go live" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
                  fontSize: 13, color: item.done ? SAGE : "#555",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 4,
                    background: item.done ? SAGE : "#f0ede8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 12, flexShrink: 0,
                  }}>
                    {item.done ? "✓" : ""}
                  </div>
                  {item.text}
                </div>
              ))}
            </div>

            <div style={{
              background: "#fff", borderRadius: 10, padding: "18px 20px", border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>
                Tech Stack for Book Pipeline
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "PDF Generation", value: "Puppeteer on AWS Lambda", note: "Renders HTML → PDF at print resolution" },
                  { label: "File Storage", value: "AWS S3 (us-west-2)", note: "Pre-signed URLs for RPI to pull PDFs" },
                  { label: "Payments", value: "Stripe Checkout", note: "Hosted checkout, webhook-driven" },
                  { label: "Print + Ship", value: "RPI Print API (Blurb)", note: "RESTful, JSON, US shipping, 5-day SLA" },
                  { label: "Order Tracking", value: "Webhooks → Supabase", note: "Store order status, push to user" },
                  { label: "Notifications", value: "Resend (email)", note: "Shipping confirmation + tracking link" },
                ].map((item, i) => (
                  <div key={i} style={{ background: "#fafaf8", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 10, color: SAGE, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
                      {item.label.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 2 }}>{item.value}</div>
                    <div style={{ fontSize: 11, color: WARM_GRAY }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: "#fff", borderRadius: 10, padding: "18px 20px", border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>
                RPI Print API — Key Details
              </div>
              <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.8 }}>
                <div style={{ marginBottom: 8 }}>
                  <strong>Production:</strong> <code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>https://api.rpiprint.com/api/v1/</code><br />
                  <strong>Sandbox:</strong> <code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>https://api.sandbox.rpiprint.com</code><br />
                  <strong>Test card:</strong> <code style={{ background: "#f0ede8", padding: "1px 5px", borderRadius: 3 }}>4111 1111 1111 1111</code> (any expiry)
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Core concept:</strong> Print assets (cover PDF + guts PDF + SKU) are auto-created when you submit orders. You don't create them separately — just reference PDF URLs in your order request.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Payment to RPI:</strong> Pay-as-you-go or batched daily at 9 PM EST. This is YOUR wholesale cost, separate from what you charge the customer via Stripe.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>PDF hosting:</strong> Must be publicly accessible via HTTPS. S3 pre-signed URLs in us-west-2 recommended. Keep files available 60 days for potential reprints.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Max file size:</strong> 2 GB combined (cover + guts). Smaller = faster processing.
                </div>
                <div>
                  <strong>Support:</strong> printapidevelopers@rpiprint.com
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "economics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 16 }}>
                Per-Book Economics
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: LIGHT_SAGE, borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: SAGE, marginBottom: 12 }}>SOFTCOVER 7x7"</div>
                  {[
                    { label: "You charge", value: "$34.99", bold: true },
                    { label: "Blurb print cost (~60pg)", value: "-$15.00" },
                    { label: "Shipping (standard)", value: "-$4.00" },
                    { label: "Stripe fee (2.9% + $0.30)", value: "-$1.31" },
                    { label: "S3 + compute", value: "-$0.10" },
                    { label: "YOUR MARGIN", value: "$14.58", bold: true, color: SAGE },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", padding: "4px 0",
                      fontSize: 12, color: row.color || DARK, fontWeight: row.bold ? 700 : 400,
                      borderTop: i === 5 ? `1px solid ${SAGE}33` : "none",
                      marginTop: i === 5 ? 6 : 0, paddingTop: i === 5 ? 8 : 4,
                    }}>
                      <span>{row.label}</span><span>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#FFF3E8", borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: CORAL, marginBottom: 12 }}>HARDCOVER 7x7"</div>
                  {[
                    { label: "You charge", value: "$54.99", bold: true },
                    { label: "Blurb print cost (~60pg)", value: "-$28.00" },
                    { label: "Shipping (standard)", value: "-$5.00" },
                    { label: "Stripe fee (2.9% + $0.30)", value: "-$1.89" },
                    { label: "S3 + compute", value: "-$0.10" },
                    { label: "YOUR MARGIN", value: "$20.00", bold: true, color: CORAL },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", padding: "4px 0",
                      fontSize: 12, color: row.color || DARK, fontWeight: row.bold ? 700 : 400,
                      borderTop: i === 5 ? `1px solid ${CORAL}33` : "none",
                      marginTop: i === 5 ? 6 : 0, paddingTop: i === 5 ? 8 : 4,
                    }}>
                      <span>{row.label}</span><span>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 16 }}>
                Revenue Scenarios (Year 1)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { label: "Conservative", users: "500 users", books: "200 books/yr", avg: "1.3 books avg", revenue: "$9,100", margin: "$4,500", color: WARM_GRAY },
                  { label: "Moderate", users: "2,000 users", books: "1,000 books/yr", avg: "1.5 books avg", revenue: "$52,500", margin: "$24,000", color: SAGE },
                  { label: "Optimistic", users: "5,000 users", books: "3,500 books/yr", avg: "1.8 books avg", revenue: "$157,500", margin: "$70,000", color: CORAL },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: "#fafaf8", borderRadius: 8, padding: 14, borderTop: `3px solid ${s.color}`,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#555", lineHeight: 1.8 }}>
                      <div>{s.users}</div><div>{s.books}</div><div>{s.avg}</div>
                    </div>
                    <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #e8e4e0" }}>
                      <div style={{ fontSize: 11, color: "#555" }}>Gross Revenue</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: DARK }}>{s.revenue}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Your Margin</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.margin}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 14, padding: "12px 14px", background: LIGHT_SAGE,
                borderRadius: 6, fontSize: 12, color: DARK, lineHeight: 1.6,
              }}>
                <strong>The multiplier:</strong> Grandparents. If 30% of families order a second copy, that's a 30% revenue bump at near-zero incremental cost — the PDF is already generated.
              </div>
            </div>

            <div style={{
              background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #e8e4e0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>
                Fixed Costs (Monthly)
              </div>
              {[
                { item: "Supabase (free tier, 50K MAU)", cost: "$0" },
                { item: "Vercel hosting (free tier)", cost: "$0" },
                { item: "Domain", cost: "$1" },
                { item: "S3 storage (100GB)", cost: "$2" },
                { item: "Resend email (3K/month free)", cost: "$0" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", padding: "6px 0",
                  fontSize: 13, color: "#555", borderBottom: "1px solid #f0ede8",
                }}>
                  <span>{row.item}</span><span style={{ fontWeight: 600 }}>{row.cost}</span>
                </div>
              ))}
              <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "10px 0 0", fontSize: 14, fontWeight: 700, color: SAGE,
              }}>
                <span>Total monthly overhead</span><span>~$3/month</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
