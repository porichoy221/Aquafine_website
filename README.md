# Aqua Fine Engineering website
1. `npm install`
2. Copy `.env.example` to `.env.local` and set ADMIN_PASSWORD and SESSION_SECRET
3. `npm run dev` -> http://localhost:3000 (admin panel: /admin)
Production: `npm run build && npm start` on a server with a persistent disk. Data lives in data/db.json and uploaded photos in data/uploads. Back both up.
Delete data/db.json once to load the current starter products (it is only created when missing).

Things to fill in (lib/site.ts): fees (delivery/installation), mfs (bKash/Nagad/Rocket numbers), whatsapp number.
Logo: public/logo.png (horizontal) and public/logo-stacked.png. Colors and fonts: tailwind.config.ts and app/layout.tsx.
