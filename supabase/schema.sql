create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text,
  current_tip_balance numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references auth.users(id) on delete set null,
  staff_id uuid not null references public.staff(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  service_amount numeric(12, 2) not null check (service_amount >= 0),
  tip_amount numeric(12, 2) not null check (tip_amount >= 0),
  processing_fee_on_tip numeric(12, 2) generated always as (round(tip_amount * 0.03, 2)) stored,
  net_tip_to_staff numeric(12, 2) generated always as (round(tip_amount - (tip_amount * 0.03), 2)) stored,
  created_at timestamptz not null default now()
);

alter table public.transactions
  add column if not exists client_id uuid references public.clients(id) on delete set null;

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references auth.users(id) on delete set null,
  staff_id uuid not null references public.staff(id) on delete cascade,
  amount_paid numeric(12, 2) not null check (amount_paid >= 0),
  created_at timestamptz not null default now()
);

alter table public.staff enable row level security;
alter table public.clients enable row level security;
alter table public.transactions enable row level security;
alter table public.payouts enable row level security;

drop policy if exists "Allow local app access to staff" on public.staff;
create policy "Allow local app access to staff"
  on public.staff
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow local app access to transactions" on public.transactions;
create policy "Allow local app access to transactions"
  on public.transactions
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow local app access to clients" on public.clients;
create policy "Allow local app access to clients"
  on public.clients
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow local app access to payouts" on public.payouts;
create policy "Allow local app access to payouts"
  on public.payouts
  for all
  to anon, authenticated
  using (true)
  with check (true);

create or replace function public.add_transaction_tip_to_staff_balance()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  update public.staff
  set current_tip_balance = current_tip_balance + new.net_tip_to_staff
  where id = new.staff_id;

  return new;
end;
$$;

drop trigger if exists on_transaction_created_update_staff_balance on public.transactions;
create trigger on_transaction_created_update_staff_balance
  after insert on public.transactions
  for each row
  execute function public.add_transaction_tip_to_staff_balance();
