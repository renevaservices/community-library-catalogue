# Community Library Catalogue

A polished, simple catalogue for a volunteer-run community library. Built as a
static front-end prototype — no accounts, no database, no backend.

## Features

- **Catalogue of 24 books** — each with title, author, genre, a short
  description, and a lightweight placeholder cover image (picsum.photos,
  seeded so each book always shows the same cover).
- **Search** — live search matches on book title **or** author.
- **Genre filter** — dropdown filter that combines with the search.
- **Reading list** — save/unsave any book; the list persists across page
  refreshes via `localStorage`.
- **Suggest a book form** — client-side validation with clear error messages
  and a success confirmation.
- **Dark mode toggle** — respects your system preference on first visit and
  remembers your choice in `localStorage`.
- **Responsive & accessible** — works on phone and laptop, with labelled form
  controls, `aria-pressed` toggle buttons, visible focus rings, live-region
  result counts, and clear empty states.

## Tech stack

- **React 19 + TypeScript** — UI and type safety
- **TanStack Start / Router** — file-based routing and static rendering
- **Tailwind CSS v4** — utility styling driven by a design-token theme
- **Vite** — fast dev server and static build
- **lucide-react** — icons

## Project structure

```text
src/
  data/books.ts              # The catalogue: one plain array of Book objects
  hooks/useReadingList.ts    # Reading-list state synced to localStorage
  components/
    Header.tsx               # Site header + dark mode toggle
    BookCard.tsx             # One book: cover, details, save button
    SuggestForm.tsx          # Suggestion form with validation
  routes/
    __root.tsx               # HTML shell, fonts, global metadata
    index.tsx                # The catalogue page (search, filter, grid,
                             # reading list, suggest form)
  styles.css                 # Design tokens (warm library palette, light/dark)
```

### How the pieces fit together

1. `index.tsx` holds the page state: the search text and selected genre.
2. It derives the visible books with a `useMemo` filter over `data/books.ts`.
3. Each book renders as a `BookCard`, which calls `toggleBook` from
   `useReadingList` when the save button is clicked.
4. `useReadingList` stores an array of book ids in `localStorage`, so the
   reading list survives refreshes.
5. `SuggestForm` is self-contained: it validates on submit and shows errors
   or a success message.

## Running locally

```bash
# Install dependencies
bun install        # or: npm install

# Start the dev server
bun dev            # or: npm run dev

# Build a static production bundle
bun run build      # or: npm run build
```

## Deploying as a static site

`bun run build` produces a static bundle in `dist/` (client output) that can
be hosted on any static host (Netlify, Vercel, GitHub Pages, Cloudflare
Pages). No server-side runtime is required for the catalogue features —
everything runs in the browser.