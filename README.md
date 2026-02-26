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
