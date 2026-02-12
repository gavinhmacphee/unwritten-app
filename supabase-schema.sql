-- ============================================
-- ONELINE - Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. PROFILES TABLE
-- Auto-created when a user signs up
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  display_name text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. CHILDREN TABLE
create table public.children (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  date_of_birth date,
  emoji text default '🌱',
  created_at timestamptz default now() not null
);

alter table public.children enable row level security;

create policy "Users can CRUD own children"
  on public.children for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 3. ENTRIES TABLE
create table public.entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  child_id uuid references public.children(id) on delete cascade not null,
  entry_date date not null,
  text text not null check (char_length(text) <= 280),
  photo_path text,
  prompt_used text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  -- One entry per child per day
  unique(child_id, entry_date)
);

alter table public.entries enable row level security;

create policy "Users can CRUD own entries"
  on public.entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Index for fast timeline queries
create index entries_child_date_idx on public.entries(child_id, entry_date desc);
create index entries_user_date_idx on public.entries(user_id, entry_date desc);


-- 4. STREAKS VIEW (computed, not stored)
create or replace function public.get_current_streak(p_user_id uuid)
returns integer as $$
declare
  streak integer := 0;
  check_date date := current_date;
  has_entry boolean;
begin
  loop
    select exists(
      select 1 from public.entries 
      where user_id = p_user_id and entry_date = check_date
    ) into has_entry;
    
    if has_entry then
      streak := streak + 1;
      check_date := check_date - 1;
    else
      -- Allow skipping today if it's still early
      if check_date = current_date then
        check_date := check_date - 1;
      else
        exit;
      end if;
    end if;
  end loop;
  
  return streak;
end;
$$ language plpgsql security definer;


-- 5. STORAGE BUCKET FOR PHOTOS
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true);

create policy "Users can upload own photos"
  on storage.objects for insert
  with check (
    bucket_id = 'photos' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Anyone can view photos"
  on storage.objects for select
  using (bucket_id = 'photos');

create policy "Users can delete own photos"
  on storage.objects for delete
  using (
    bucket_id = 'photos' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );


-- ============================================
-- DONE! Your database is ready.
-- ============================================
