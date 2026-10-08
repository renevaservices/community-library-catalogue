# Community Library Catalogue

A responsive community library catalogue built for the volunteer web-development skills test.

## Features
- 24-book catalogue with title, author, genre, description and cover images
- Search by title or author
- Genre filtering
- Reading list saved in browser localStorage
- Validated “Suggest a book” form with success/error feedback
- Responsive mobile and desktop layout
- Accessible labels, buttons and status messages
- Light/dark mode with preference persistence

## Tech stack
React 19, TypeScript, Vite and plain CSS. The app is intentionally small and easy to explain.

## Run locally
```bash
npm install
npm run dev
```

For production:
```bash
npm run build
npm run preview
```

## Collaboration approach
For a six-person volunteer team, use feature branches and pull requests. Keep `main` stable, pull the latest changes before starting work, keep commits focused, and require at least one review plus a successful build before merging. Deploy from reviewed `main`.

## Design decisions
The catalogue is client-side only because the test does not require accounts or a database. localStorage keeps the reading list and theme preference after refresh. Remote seeded placeholder covers keep the repository lightweight.