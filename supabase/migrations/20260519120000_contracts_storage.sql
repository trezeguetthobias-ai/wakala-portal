-- Private bucket for generated contract PDFs (path: {user_id}/Mkataba-{ref_no}.pdf)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'contracts',
  'contracts',
  false,
  10485760,
  array['application/pdf']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "contracts: users upload own folder"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'contracts'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "contracts: users update own folder"
on storage.objects for update to authenticated
using (
  bucket_id = 'contracts'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'contracts'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "contracts: users read own folder"
on storage.objects for select to authenticated
using (
  bucket_id = 'contracts'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "contracts: admins read all"
on storage.objects for select to authenticated
using (
  bucket_id = 'contracts'
  and public.has_role(auth.uid(), 'admin'::public.app_role)
);
