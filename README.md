# DSK Law Associates Website

Modern, responsive legal website for **DSK Law Associates** — criminal and civil law practice in Prayagraj, Uttar Pradesh.

## Features

- Single-page design with smooth anchor navigation
- Dark / light mode with system preference support
- WhatsApp "Talk to Us" floating button
- Consultation booking and contact forms
- PostgreSQL database via Prisma
- Email notifications via Resend
- Password-protected admin dashboard at `/admin`
- SEO: JSON-LD, Open Graph, sitemap, robots.txt

## Prerequisites

- Node.js 18+
- PostgreSQL database (Neon, Supabase, or local)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and fill in values:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dsk_law"
   RESEND_API_KEY="re_..."
   NOTIFICATION_EMAIL="ds9500068@gmail.com"
   ADMIN_PASSWORD="your-secure-password"
   ```

3. **Push database schema**

   ```bash
   npm run db:push
   ```

4. **Add your assets**

   Replace placeholder files in `public/`:

   - `logo.svg` → your logo (or use `logo.png` and update references)
   - `owner.svg` → your owner photo as `owner.jpg`

5. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Connect Neon/Supabase PostgreSQL for `DATABASE_URL`

## Admin Dashboard

Visit `/admin` and enter the password set in `ADMIN_PASSWORD` to view and manage consultation requests.

## Contact Details

- **Phone / WhatsApp:** +91 9415445087
- **Email:** ds9500068@gmail.com
- **Address:** 200L/3R/1, Kasari Masari Road near Sabri Masjid, IIITA Rd, Roshan Bag, Prayagraj, UP 211015
