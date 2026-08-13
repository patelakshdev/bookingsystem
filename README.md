# Doctor On Call — Appointment Booking Platform

Doctor On Call is a doctor appointment booking platform ready for **Git push** and **Vercel serverless deployment** with database support (**PostgreSQL**, **Turso**, or **local SQLite**).

## Features

- **Live doctor availability** — Real-time status (Available / With a patient / Off duty) updated by reception staff.
- **7-day slot calendar** per doctor with 30-minute openings.
- **Flexible payment paths** — Pay online (mock card checkout) or pay at the hospital counter.
- **Patient portal** — Register, sign in, view & cancel appointments.
- **Reception desk portal** (`/reception`) — Staff window to manage appointments, book for walk-ins/phone callers, and update doctor statuses.
- **Universal Multi-Database Engine** — Runs on **PostgreSQL** (Neon / Supabase / Vercel Postgres), **Turso** (Cloud SQLite), or **Local SQLite**.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Local Server
```bash
npm start
# or
npm run dev
```
Open **http://localhost:3000** in your browser.

> On first run, a local database is created at `data/clinic.db` and seeded with demo doctors, slots, and demo accounts:
> - **Staff Login:** `reception@meridianhealth.example` / `reception123`
> - **Patient Login:** `patient@meridianhealth.example` / `patient123`

---

## 📤 Ready for Git Push

To push this project to GitHub or GitLab:

```bash
git init
git add .
git commit -m "Initial commit: Ready for Vercel deployment with database support"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

---

## ☁️ Deploying to Vercel with a Database

Vercel functions are serverless and stateless. To persist data across invocations on Vercel, attach a cloud database (such as **PostgreSQL** via Neon / Supabase / Vercel Postgres or **Turso**).

### Option 1: PostgreSQL with Neon or Supabase (Recommended)

1. **Create a Free PostgreSQL Database**:
   - Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com) and create a free project.
   - Copy your PostgreSQL connection string (e.g. `postgres://user:pass@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require`).

2. **Deploy on Vercel**:
   - Push your repository to GitHub.
   - Go to [Vercel.com](https://vercel.com) and click **Add New** -> **Project**.
   - Import your GitHub repository.
   - Under **Environment Variables**, add:
     - **Key:** `DATABASE_URL` (or `POSTGRES_URL`)
     - **Value:** `<your-postgres-connection-string>`
   - Click **Deploy**!

> **Automatic Setup:** On first request, the app will automatically create the PostgreSQL tables (`schema.pg.sql`) and seed the demo doctors, slots, and accounts!

---

### Option 2: Turso (Cloud SQLite)

1. Create a database at [Turso.tech](https://turso.tech).
2. On Vercel, set Environment Variables:
   - `TURSO_DATABASE_URL`: `libsql://your-db.turso.io`
   - `TURSO_AUTH_TOKEN`: `your-turso-token`
3. Click **Deploy**.

---

## 📁 Project Structure

```
├── api/
│   └── index.js             Vercel Serverless Function entry point
├── db/
│   ├── index.js             Universal database client (PostgreSQL / Turso / SQLite)
│   ├── schema.sql           SQLite / Turso schema
│   └── schema.pg.sql        PostgreSQL schema
├── public/                  Static frontend (HTML5 + Tailwind CSS)
│   ├── index.html           Landing page
│   ├── doctors.html         Doctor directory & search
│   ├── book.html            Appointment booking
│   ├── payment.html          Mock checkout page
│   ├── dashboard.html        Patient dashboard
│   └── reception/           Staff portal & desk
├── server.js                Node.js HTTP server & API router
├── vercel.json              Vercel deployment configuration
├── .env.example             Environment variables template
└── .gitignore               Git ignore configuration
```
