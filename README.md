# JSS The Print Zone — Website

Production website for JSS The Print Zone, an offset printing and packaging
manufacturer in Okhla Phase-II, New Delhi. Built for B2B lead generation:
qualified enquiries from FMCG, cosmetic, pharmaceutical and D2C buyers.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (stop the dev server first)
npm start        # serve the production build
npm test         # RFQ validation & message-composition checks
```

> **Replaced an image but still seeing the old one?** Next caches optimised
> images in `.next/cache/images`, keyed by path — swapping a file for a new one
> at the same path can keep serving the stale version. `rm -rf .next/cache/images`
> and restart.

> Do not run `npm run build` while `npm run dev` is serving — both write to
> `.next` and the dev server will start throwing module-resolution errors.

## Where the content lives

All copy and company facts are data, not markup. Editing these files updates
every page that uses them:

| File | Holds |
| --- | --- |
| `src/content/company.ts` | Address, phone, email, certification — **and the `PENDING` block** |
| `src/content/clients.ts` | The named clients and their logos |
| `src/content/products.ts` | The six general packaging formats and everything on their pages |
| `src/content/rigid.ts` | The rigid & luxury segment — its own content, route and section |
| `src/content/industries.ts` | Industries served and what each one needs |
| `src/content/capabilities.ts` | Manufacturing capabilities and the six-stage order process |
| `src/content/objections.ts` | Objection handling, FAQs, and the supplier-evaluation checklist |

## Colour

The whole palette derives from three values sampled out of the logo — the mark
is a three-step blue ramp, which happens to read like a press colour
progression.

| Token | Value | Where it comes from |
| --- | --- | --- |
| `brand-cyan` | `#01A0E2` | The dot, the first flame, the wordmark bar |
| `brand-blue` | `#006CB5` | The second flame |
| `brand-indigo` | `#393186` | The tallest flame |

Dark surfaces (`ink-*`) are neutrals pulled toward the indigo hue, so a dark
section reads as deep brand blue rather than generic graphite. Light surfaces
(`paper-*`) are cooled very slightly in the same direction.

### Which blue goes where is decided by contrast, not taste

Cyan is the loudest brand colour and the most tempting to over-use, but it is
weak against light backgrounds and against white text:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| White text on `brand-cyan` | 2.96 | **Never.** Fails AA badly |
| `brand-cyan` as small text on paper | 2.76 | **Never** |
| `brand-cyan` on `ink-950` | 6.66 | Good — the accent for dark surfaces |
| White text on `brand-blue` | 5.51 | Good — the primary button, everywhere |
| `brand-blue` as small text on paper | 5.13 | Good — the accent for light surfaces |
| `brand-blue` as small text on `ink-950` | 3.56 | Large text only — avoid |

So the rule the components follow is: **`accent-500` (mid blue) on light
surfaces and for every button; `accent-400` (cyan) for accents on dark
surfaces.** Swapping one for the other will silently break contrast.

`ink-400` is legible on dark surfaces only — it drops to 2.9:1 on paper, so use
`ink-500` for muted text on light backgrounds.

### Danger is deliberately not a brand colour

Form validation uses `danger-*` (`#C0362C`), outside the brand ramp. A blue
"error" reads as information rather than as something the user has to fix.
Required-field asterisks stay brand blue — they are markers, not errors.

### The three-blue signature

`.brand-rule` renders the logo's three blues as a single bar, in order. It
appears in the footer and on the Open Graph card. Used sparingly on purpose —
it is a signature, not a decoration.

## Two decisions that are easy to undo by accident

### The phone number is never shown as text

The number exists in `src/content/company.ts` only to build `tel:` and
`wa.me` links. Every contact control is labelled with words — "Call us",
"WhatsApp" — and the number appears in no visible copy, no meta description and
no structured data.

This is deliberate and was asked for. The trade-off is that a buyer cannot copy
the number or dial it from a desktop, so the enquiry form, WhatsApp and email
carry more of the load. If you want it hidden more strictly, removing the
`tel:`/`wa.me` hrefs is the next step; if you want it back, put it behind a
"show number" control rather than in the page copy.

### Rigid boxes are a separate segment

Rigid and luxury boxes are **not** in `products.ts`. They have their own content
file, their own route (`/rigid-boxes`), their own navigation entry and their own
homepage section, because the buyer and the decision criteria are different from
a folding carton. `/packaging/rigid-boxes` permanently redirects to
`/rigid-boxes`. Do not fold it back into the formats grid.

### The `PENDING` block

`src/content/company.ts` ends with a `PENDING` object covering the trust signals
serious buyers look for that have **not** been confirmed: monthly capacity,
standard lead time, minimum order quantity, facility size, named clients and
testimonials.

Nothing in it is invented, and the UI blocks that would display these values do
not render while `enabled: false`. To publish one, set a real value and flip
`enabled` to `true` — no component changes needed.

Client names and logos are confirmed and live in `src/content/clients.ts`.

### Client logos

Each mark is the company's own official asset, taken from their own website:

| Client | Asset | Source |
| --- | --- | --- |
| Revlon | `revlon.svg` | revlon.com |
| Nicobar | `nicobar.png` | nicobar.com |
| Coloressence | `coloressence.png` | coloressence.com |
| Multani Pharmaceuticals | `multani.png` | multani.org |
| Fifth Sense | `fifthsense.svg` | itsfifthsense.com |
| GearUp | `gearup.png` | Gear-Up Electric Pvt. Ltd., Faridabad |

Two things to know:

- **Coloressence publish only a white-on-transparent mark.** It is flattened to
  ink here so it is visible on a light background — same artwork, one flat
  colour.
- **GearUp's mark was only available as a small JPEG on a white background.**
  The white has been keyed out to alpha so it sits on the page rather than in a
  white box. At 192×64 it is the lowest-resolution asset on the wall; if
  Gear-Up supply an original PNG or vector it will sharpen noticeably.

`maxH` is set per logo rather than shared, because a 6:1 wordmark and a 1:1
badge at the same height look wrong beside each other. Those numbers balance
them optically — adjust by eye, not by arithmetic.

Displaying a customer's mark is normal B2B practice, but it is usually
something the customer should sign off on and some brand guidelines restrict
it. Removing one is a single line in `clients.ts`.

Confirming capacity, lead time and MOQ would meaningfully strengthen the
Manufacturing page, which currently has to say "we confirm this against your
specification" where a number would land harder.

## Lead capture

The RFQ form composes the enquiry into a WhatsApp message or an email addressed
to the company — there is no server or third-party form service in the path.
Logic lives in `src/lib/rfq.ts` and is covered by `npm test`.

Both submit buttons are `type="button"` deliberately: before React hydrates, a
real submit button would fall through to a native GET, navigate away and discard
everything typed.

## SEO

- Per-page `title`, `description`, canonical URL and Open Graph tags via `src/lib/seo.ts`
- JSON-LD: Organization + LocalBusiness, Product, FAQPage, BreadcrumbList
- `sitemap.xml` and `robots.txt` generated from the content files
- Favicon and OG image generated at build time (`src/app/icon.tsx`, `src/app/opengraph-image.tsx`)
- `/thank-you` is `noindex`

Set the production hostname in `siteUrl` (`src/content/company.ts`) if it ever
changes — canonicals, OG URLs and the sitemap all derive from it.

## Images

Two sources, and the difference matters:

- **The company's own** — `brand/logo.png`,
  `facility/offset-press.jpg` (their four-colour Heidelberg press line),
  `facility/die-cut-lamination.jpg`, `facility/custom-design.jpg` and
  `facility/finishing.jpg` (foil-stamped client work). These are photographs of
  the actual plant and real jobs. **Do not replace them with stock** — they are
  the evidence the manufacturing pages rest on. Client logos under
  `clients/` are each brand's own official mark.
- **Licensed stock** — everything under `products/`, `rigid/` and the remaining
  `facility/` shots is from [Pexels](https://www.pexels.com/license/), whose
  licence permits commercial use with no attribution required.

Stock is a stopgap, not the destination. A packaging manufacturer is selling the
quality of its own output, and a buyer who recognises a stock photograph
discounts everything around it. Replacing these with real photography is the
single highest-return improvement available to this site — the paths are already
wired up, so it is a file swap and nothing more.

Worth shooting, in priority order: finished packaging from actual jobs, the
production floor mid-run, and rigid boxes under controlled lighting.
