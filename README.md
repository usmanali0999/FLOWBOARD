# FLOWBOARD

Flowboard is a production-grade collaborative workflow management platform built with modern web technologies.
This project is designed to showcase professional frontend architecture, authentication, database-driven workflows, and scalable product design.

---

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v4 (Credentials)
- **State Management:** Zustand + TanStack Query
- **Forms & Validation:** React Hook Form + Zod
- **Notifications:** Sonner
- **Icons:** Lucide React

---

## ✨ Features

- Professional landing page
- Dark / Light theme toggle
- User registration
- Credentials-based authentication
- Protected dashboard routes
- Workspace creation flow
- Auto-generated default board on workspace creation
- Auto-generated workflow columns:
  - backlog
  - in progress
  - review
  - done
- Real dashboard stats from database
- Workspace switcher
- Board summary cards
- Board details page
- Task creation with priority levels
- Modular feature-based folder architecture

---

## 📁 Project Structure

```txt
src/
├── app/
│   ├── api/
│   ├── board/
│   ├── dashboard/
│   └── login/
├── components/
│   ├── layout/
│   ├── shared/
│   └── ui/
├── config/
├── features/
│   ├── auth/
│   ├── board/
│   ├── task/
│   └── workspace/
├── lib/
├── services/
├── store/
└── types/
```

---

## 🔐 Authentication

Flowboard uses **NextAuth.js v4** with:

- Credentials login
- Protected dashboard routes
- Session-based authentication
- Secure password hashing with `bcryptjs`

---

## 🗄 Database Models

- User
- Workspace
- WorkspaceMember
- Board
- Column
- Task
- Account
- Session
- VerificationToken

---

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/usmanali0999/FLOWBOARD.git
cd FLOWBOARD
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```env
DATABASE_URL="your_neon_postgresql_connection_string"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret"
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="false"
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start development server

```bash
npm run dev
```

---

## 🌐 Main Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Authentication page |
| `/dashboard` | Protected dashboard |
| `/board?id=BOARD_ID` | Board view |

---

## 📌 Current Status

**Implemented:**
- Base app architecture
- Auth system
- Prisma + PostgreSQL integration
- Workspace engine
- Dashboard module
- Board module
- Task creation module

**Planned:**
- Drag and drop tasks
- Team invitations
- Role management UI
- Realtime updates
- Analytics widgets
- Deployment

---

## 🎯 Project Goal

Built as **professional portfolio project no. 15** to demonstrate real-world frontend engineering, scalable architecture, and production-grade SaaS design patterns.

---

## 👨‍💻 Author

**Usman Ali**  
GitHub: [usmanali0999](https://github.com/usmanali0999)

---

## 📄 License

For learning, portfolio, and demonstration purposes.