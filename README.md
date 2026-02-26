# AddressBook.ReactJs

A structured Address Book CRUD application built with React and Vite. This repository serves as a reference implementation demonstrating a clean, scalable frontend architecture for single-page React apps using Vite, Tailwind CSS and a centralized client-side data flow.

Highlights

- Clean separation of UI, state, and services
- Centralized API/service layer for network calls
- Optimistic UI updates for responsive UX
- Client-side authentication flow and protected routes
- Reusable components and modals

Tech stack

- React (JSX)
- Vite (dev server + build)
- Tailwind CSS
- Redux-style reducers / custom store (in `store/` and `reducers/`)
- React Router-like routing via `routes/` (project routing helpers)
- PostCSS

Project structure

```.
├── src/
│ ├── components/ # Reusable UI components (tables, modals, loaders)
│ ├── layout/ # App layout (Header, Footer, layout wrapper)
│ ├── modals/ # Confirmation and contact modals
│ ├── modules/ # Feature modules (addressbook form/list, login)
│ ├── pages/ # Page containers (contacts, dashboard, login)
│ ├── routes/ # Routing config and helpers
│ ├── services/ # Centralized API/service abstractions
│ ├── store/ # App store setup
│ ├── reducers/ # Reducers for app state
│ └── utils/ # Shared utilities and validation schemas
├── public/ # Static assets
├── index.html
├── package.json
├── tailwind.config.js
└── README.md # <- you are here
```

Key features

- Contacts CRUD
  - List contacts in a styled table
  - Create contact via modal/form
  - Inline edit / update contact rows
  - Delete with confirm modal and rollback support (optimistic removal)
- Authentication flow
  - Client-side login pages and auth state (store + cookies/session helpers)
  - Protected-route helpers and redirects on unauthorized access
- UX & DX
  - Centralized service layer for API requests and error normalization
  - Loading indicators and accessible form labels
  - Responsive layout with Tailwind CSS

Architecture notes

- Centralized API layer (see `src/services/`) abstracts headers, error handling and response normalization so components and hooks stay focused on UI.
- Optimistic UI updates: create/update/delete operations update local state immediately and rollback if the server call fails. This improves perceived performance and keeps network usage minimal.
- Shared validation (in `src/utils/`) ensures consistent form rules across create and edit forms.

Requirements

- Node.js >= 18
- npm >= 9

Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/differenz-system/Addressbook.ReactJs
cd Addressbook.ReactJs
npm install
```

Development

Start the dev server with Vite (HMR enabled):

```bash
npm run dev
```

The app will usually be available at http://localhost:5173 (Vite default) or the port shown in your terminal.

Build

Create an optimized production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Notes & assumptions

- This repository is a frontend reference implementation; it expects either a mock API or a backend that exposes the necessary endpoints for authentication and contacts CRUD. Check `src/services/` to see how API requests are wired and adapt base URLs or auth headers as needed.
- Authentication in this project is handled client-side with helper modules and persisted store; for production you should pair it with a secure server-side session or token strategy.

Suggested next steps / improvements

- Add integration tests (Jest/React Testing Library) for critical flows (login, create contact, delete/rollback).
- Extract form validation into shared schemas and add unit tests for validation rules.
- Add E2E tests (Cypress or Playwright) for the full user flows.
- Add TypeScript for stricter typing and improved DX.

License

MIT

If you want, I can also:

- add a short CONTRIBUTING.md
- create a minimal set of unit tests
- wire an example mock-server for quick local testing

Tell me which of those you'd like next.
