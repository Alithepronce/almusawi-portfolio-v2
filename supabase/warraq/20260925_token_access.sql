-- Warraq (Supabase project rpxqzpfhbtuavrkeevnm): stop anonymous table reads.
-- The public pages used the anon key to query whole tables filtered by a token *in the client*,
-- which means anyone with the key could list every portal, tracking token, customer and order.
-- After this, anon can only call three functions that return exactly one record (or counts).
-- Apply in the Warraq project's SQL editor when the project is restored.
-- Assumes orders.service_id and orders.customer_id are the foreign keys the old embeds used
-- (services(...), customers(...)); check with \d public.orders before applying.
begin;

revoke select on public.customer_portals, public.order_tracking, public.orders, public.customers,
  public.customer_accounts, public.delivery_drivers, public.shops, public.online_orders from anon;

create or replace function public.warraq_portal_by_token(p_token text)
returns jsonb language sql stable security definer set search_path = public, pg_temp as $$
  select jsonb_build_object(
    'customer', jsonb_build_object('name', c.name, 'phone', c.phone),
    'orders', coalesce((
      select jsonb_agg(jsonb_build_object('id', o.id, 'title', o.title, 'status', o.status, 'total_price', o.total_price,
        'created_at', o.created_at, 'services', jsonb_build_object('name', s.name, 'price', s.price)) order by o.created_at desc)
      from public.orders o left join public.services s on s.id = o.service_id
      where o.customer_id = c.id and o.owner_id = cp.user_id), '[]'::jsonb))
  from public.customer_portals cp join public.customers c on c.id = cp.customer_id
  where cp.token = p_token and cp.is_active and length(p_token) >= 16;
$$;

create or replace function public.warraq_track_by_token(p_token text)
returns jsonb language sql stable security definer set search_path = public, pg_temp as $$
  select jsonb_build_object('id', o.id, 'title', o.title, 'status', o.status, 'total_price', o.total_price,
    'created_at', o.created_at, 'services', jsonb_build_object('name', s.name, 'price', s.price),
    'customers', jsonb_build_object('name', c.name))
  from public.order_tracking t join public.orders o on o.id = t.order_id
  left join public.services s on s.id = o.service_id left join public.customers c on c.id = o.customer_id
  where t.token = p_token and length(p_token) >= 8;
$$;

create or replace function public.warraq_public_stats()
returns jsonb language sql stable security definer set search_path = public, pg_temp as $$
  select jsonb_build_object('shops', (select count(*) from public.shops), 'customers', (select count(*) from public.customer_accounts),
    'orders', (select count(*) from public.online_orders), 'drivers', (select count(*) from public.delivery_drivers));
$$;

revoke all on function public.warraq_portal_by_token(text), public.warraq_track_by_token(text), public.warraq_public_stats() from public;
grant execute on function public.warraq_portal_by_token(text), public.warraq_track_by_token(text), public.warraq_public_stats() to anon, authenticated;

-- Payment receipts: private bucket, images/PDF only, drivers write only in their own folder.
update storage.buckets set public = false, file_size_limit = 10485760,
  allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'application/pdf']
where id = 'order-files';



-- Receipts are uploaded to receipts/<uid>/<uuid>.<ext>; each user writes only their own folder.
-- receipt_image now stores the storage path ("order-files/receipts/..."), not a public URL:
-- staff views must open it with storage.from('order-files').createSignedUrl(path, 300).
drop policy if exists "receipts own folder upload" on storage.objects;
create policy "receipts own folder upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'order-files' and (storage.foldername(name))[1] = 'receipts'
              and (storage.foldername(name))[2] = (select auth.uid())::text);
commit;
