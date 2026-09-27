# María & Dafydd — Wedding Website

Plain HTML/CSS/JS, no build step, no framework. Open `index.html` in a browser
and it just works; edit any file directly and refresh to see changes.

## Files

- `index.html` — all page content. Sections are labeled with HTML comments
  like `<!-- EDIT: ... -->` wherever something needs your input.
- `css/style.css` — colors, fonts, layout. Colors are set once as CSS
  variables at the top (`:root { --ivory: ...; --main: ...; }`) — change
  them there to retheme the whole site. Seashell-ivory background
  (`#fff5ee`), black lettering, Playfair Display font.
- `js/script.js` — countdown timer, floating menu, modal popups, and the
  English/Español language switch.
- `images/` — photos and artwork (see "Images" below).

## Bilingual site (English / Español)

Every visitor sees a language-select screen with a Spain flag and a UK flag
when they open the site, and must pick one to continue. They can switch
again later from the floating menu ("Language / Idioma").

Every piece of bilingual text in `index.html` is written as a pair of
elements right next to each other:

```html
<span data-lang="en">Welcome!</span>
<span data-lang="es">¡Bienvenidos!</span>
```

`js/script.js` shows only the one matching the active language. To add or
edit copy, just edit both `data-lang="en"` and `data-lang="es"` versions
together so they stay in sync.

Some content is deliberately in one version only:

- **English only:** the FAQ cards "What time should I arrive at the
  church?", "What is the dress code?" and "Can I bring a guest?", and the
  UK (GBP) bank account.
- **Spanish only:** the Spanish (EUR) bank account.

To make something show in both versions, add a matching block with the
other language's `data-lang` value.

## Previewing locally

Easiest: just double-click `index.html`, or drag it into a browser tab.

If you want it served over `http://` instead of `file://` (some browsers are
stricter about `file://`), run from this folder:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Images

| File | Where it appears |
|---|---|
| `mariaanddafydd.jpg` | Welcome section photo |
| `iglesia-de-las-calatravas.jpg` | Ceremony card + Ceremony popup |
| `elcasino.jpeg` | Reception card + Reception popup |
| `madrid_alojamientos.jpeg` | Travel & Hotels card |

Ink-sketch versions (`calatravas.jpg`, `casino.jpg`, `alojamiento.jpg`)
are also in `images/` but not currently used.
| `daffodil-br.png` | Daffodil in the bottom-right corner at the end of the page, a transparent cut-out of `dafoddyls.jpg` (`daffodil-tl.png` is a spare top-left version, not currently used) |

To swap an image, save the new file in `images/` and change the matching
`src="images/..."` in `index.html`. Ink sketches on a seashell (`#fff5ee`)
or transparent background blend in best.

If you change `dafoddyls.jpg`, the corner cut-outs won't update on their
own — ask Claude to regenerate `daffodil-br.png`.

## Things still marked `[EDIT: ...]` / `[EDITAR: ...]`

Search the files for `EDIT` to find every spot that needs real content —
in both languages:

- **Travel & Hotels modal** — hotel name/link suggestions.
- **Gifts section**: both bank-detail cards are empty placeholders. The
  English version shows the UK account (name, sort code, account number,
  optional IBAN); the Spanish version shows the EUR account (titular, IBAN,
  BIC/SWIFT). Fill in the real details carefully before publishing, since
  guests will send money to whatever is written there.
- **RSVP deadline** text near the RSVP section.

## Setting up the RSVP form (Google Form)

The form should collect exactly three things: **full name** (required),
**address** (optional, free text — no need for a structured address field),
and **food allergies** (required), where answering "Yes" to allergies
reveals a text box to describe them. No bus/transport or accommodation
questions — that's covered elsewhere on the site.

1. Go to [forms.google.com](https://forms.google.com) and create a new form
   (e.g. "RSVP — María & Dafydd").
2. **Question 1 — Full name**: Short answer. Toggle **Required** on.
3. **Question 2 — Address**: Short answer (or Paragraph). Leave
   **Required** off. Add helper text like "Optional — only if you'd like us
   to send you something."
4. **Question 3 — Food allergies**: Multiple choice, options `No` / `Yes`.
   Toggle **Required** on. Click the **⋮** (three-dot) menu on this
   question → **Go to section based on answer**:
   - `No` → *Continue to next section* (or *Submit form*, if it's your last
     question).
   - `Yes` → *Go to section 2* (create a new section first via the **Add
     section** icon in the right-hand toolbar).
5. In **Section 2**, add one question: **"Please describe your allergies"**
   — Short answer or Paragraph. Toggle **Required** on. Set this section's
   "After section 2" dropdown to continue to the next section / submit.
   (Guests who answered "No" skip this section entirely — that's the
   conditional text box.)
6. Click **Send** (top right) → the **`<>`** (embed) tab → copy the
   `src="..."` URL from the `<iframe>` code shown.
7. In `index.html`, find the RSVP section (search for `RSVP PLACEHOLDER`).
   Delete the placeholder `<div class="rsvp-placeholder">...</div>`, then
   uncomment the `<div class="rsvp-frame-wrapper">` block just below it and
   paste your copied URL in place of `PASTE_YOUR_GOOGLE_FORM_EMBED_URL_HERE`.
8. Responses collect automatically into a linked Google Sheet (in the form
   editor, go to the **Responses** tab → the green Sheets icon).

_Note: this only has three fields — there's no "attending Yes/No" question.
If you want one, add it as Question 1 in the same form._

## Changing the wedding date

The date appears in two places that must stay in sync:

- `index.html` — the `<div class="hero__date">` text (both language spans).
- `js/script.js` — the `WEDDING_DATETIME` value at the top (format:
  `'YYYY-MM-DDTHH:MM:SS'`), which drives the countdown.

## Deploying to GitHub Pages

This repo's `origin` remote already points at
`github.com/mariaanddafydd/Wedding2027`. Once you're happy with the content:

```
git add .
git commit -m "Build wedding site"
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy
from a branch → Branch: `main`, folder: `/ (root)`**. GitHub will give you a
URL like `https://mariaanddafydd.github.io/Wedding2027/` within a minute or
two of pushing.

(If you'd rather use a custom domain later, GitHub Pages supports that too —
just ask.)
