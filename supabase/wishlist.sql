-- Create wishlist table and policies for Supabase
create table if not exists public.wishlist (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  movie_id bigint not null,
  movie jsonb not null,
  created_at timestamptz not null default now(),
  constraint wishlist_user_movie_unique unique (user_id, movie_id)
);

-- Enable row level security
alter table public.wishlist enable row level security;

-- Create policies only if they do not exist (prevents duplicate errors)
do $$
begin
  if not exists (
    select 1 from pg_policies where policyname = 'Users can view own wishlist'
  ) then
    create policy "Users can view own wishlist" on public.wishlist
      for select using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'Users can insert into own wishlist'
  ) then
    create policy "Users can insert into own wishlist" on public.wishlist
      for insert with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'Users can delete from own wishlist'
  ) then
    create policy "Users can delete from own wishlist" on public.wishlist
      for delete using (auth.uid() = user_id);
  end if;
end$$;

-- Grant privileges to authenticated users (required alongside RLS policies)
grant usage on schema public to authenticated;
grant select, insert, delete on public.wishlist to authenticated;

-- If your anon key is used for API calls, also grant permissions to anon
grant usage on schema public to anon;
grant select, insert, delete on public.wishlist to anon;
