-- Till code assigned by admin when approving; visible to customer after response
alter table public.applications
  add column if not exists till_code text;

comment on column public.applications.till_code is 'Till number/code assigned by admin on approval';
