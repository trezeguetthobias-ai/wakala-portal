
Asante kaka kwa maelekezo ya kina. Nimegawanya kazi katika sehemu kubwa nne. Naomba uthibitishe kabla sijaanza, kwani ni kazi nyingi — ningependa kuhakikisha vipaumbele.

## 1. Admin Dashboard (mpya kabisa)

Badilisha `/admin` kuwa dashboard kamili yenye:

- **Quick Actions cards** (kama picha uliyotuma — orange gradient): Manage Users, Add User, Review Requests, Full Reports, System Settings, Audit Logs, Manage Documents.
- **Stats**: jumla ya maombi (pending / approved / rejected), jumla ya commission ya mwezi.
- **Review Requests page** (`/admin/requests`): orodha ya maombi yote ya watumiaji wote. Kila moja inaonyesha:
  - Jina la mtumiaji (mteja) aliyetuma — full name + email (siyo namba tu).
  - Aina (Wakala / Lipa / Voda), tarehe, status.
  - Bofya kufungua: form yote aliyoijaza + nyaraka alizopakia + PDF preview + signature.
  - **Approve**: ingiza Till/Agent code → save → status = approved.
  - **Reject**: andika sababu → save → status = rejected.
- **Manage Users page** (`/admin/users`): orodha ya watumiaji wote (full_name, email, idadi ya maombi). Add user (email + temp password) na Remove user.
- **Reports page** (`/admin/reports`): jedwali la kazi zote + total commission, na kitufe cha **Download CSV/Excel**.

## 2. Payments Section ("Malipo Yangu")

- Tab/section mpya chini ya Voda kwenye homepage inayoonyesha bei zako kwa kila huduma na maelekezo ya kulipa (admin-only au public kama unavyopendelea — naomba uniambie).
- Admin ataona "Payments received" log.

**Swali**: bei na akaunti za malipo ni zipi hasa? (Hujaweka kwenye prompt — niliona "bei nimeziweka kwa maelekez ya juu" lakini sijaona namba. Tuma orodha ya bei kwa Wakala / Lipa / Voda.)

## 3. PDF Lipa Fix

Tatizo: maandishi yanaandikwa juu ya boxes badala ya ndani, na maneno yanagawanyika.

- Pima upya coordinates zote za `lipa.pdf` (na `voda` inayotumia template hiyohiyo) kwa kufuata picha ya PDF uliyotuma.
- Namba (Phone, TIN, VAT, Account Number) zianze kwenye **box ya kwanza kushoto**, digit moja kwa box, mpaka zikwishe — siyo katikati.
- Maandishi (majina, business type, ward, district, region) yatumie font ya `Caveat` (handwriting) iliyo-ndani ya box, pasipo kupita mipaka, na isigawanyike maneno.
- Tumia mfumo ule ule wa Wakala (uliokuwa unafanya kazi vizuri).

## 4. Vipengele Vingine

- **Reset password**: link "Nimesahau password" kwenye `/login` → tuma reset email → page mpya `/reset-password` ya kuweka password mpya.
- **Customer care floating button**: WhatsApp icon kona ya chini-kulia kwenye kila page, inafungua chat. **Swali**: WhatsApp number ni ipi?
- **Identify sender**: kila ombi liwe linked na `user_id` (tayari lipo) lakini onyesha `full_name` + `email` ya mtumiaji, siyo namba ya simu, kwenye admin view. Hii inahitaji `profiles` table ndogo (id, user_id, full_name, email) yenye auto-create trigger wakati wa signup.

---

## Technical scope

- DB migration: `profiles` table + trigger; add `till_code`, `reject_reason`, `approved_at`, `commission_amount` columns to `applications`.
- Admin: 4 new route files under `/admin/*` plus updated `/admin` index.
- PDF: rewrite coordinate maps in `src/lib/pdf.ts` for lipa/voda using digit-per-box logic.
- Auth: `/reset-password` route + "forgot password" link.
- UI: WhatsApp FAB component in `__root.tsx`.
- "Payments" page + admin payments log.

---

## Naomba majibu kwa haya kabla sijaanza:

1. **Bei** za huduma (Wakala, Lipa, Voda) — kiasi gani kila moja?
2. **WhatsApp number** ya customer care.
3. **Akaunti za malipo** za "Malipo Yangu" (jina, namba, mtandao).
4. Je, **commission per application** ni kiasi sawa kwa zote, au ina tofautiana?
5. Je, **payments page** iwe public (kila mtu aone bei) au admin-only?

Nikishaipata hii nitaanza moja kwa moja — nitaanza na **PDF fix + admin dashboard** kwanza kwa kuwa ndizo muhimu zaidi, kisha vingine.
