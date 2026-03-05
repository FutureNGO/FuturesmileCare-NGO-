# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Running the backend server

The repository also includes a simple Express service used by the career page and contact forms. It handles:

- `/api/jobs`, `/api/categories`, `/api/apply` for job listings/applications
- `/api/subscribe` for newsletter sign‑ups
- `/api/contact` for general "Contact Us" messages (NGO page and navbar modal)

When the server is offline or credentials are missing, all routes return mock data so the UI still works.

1. Install dependencies (if not already done):
   ```bash
   npm install multer nodemailer resend
   ```

2. Create a `.env` file in the project root.  The following example uses Resend to send emails, but you can also configure SMTP values if you prefer.
   ```env
   # Supabase (optional)
   SUPABASE_URL=https://...
   SUPABASE_ANON_KEY=...

   # server settings
   PORT=5000
   CLIENT_URL=http://localhost:8080
   CORS_ORIGIN=http://localhost:8080
   VITE_API_URL=http://localhost:5000/api  # used by frontend tests

   # email (Resend)
   RESEND_API_KEY=your_api_key_here
   FROM_EMAIL=no-reply@yourdomain.com
   CONTACT_EMAIL=sahoodipanjali765@gmail.com   # contact form destination

   # (legacy SMTP – ignored when using Resend)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=you@gmail.com
   SMTP_PASS=<app-password>
   SMTP_SECURE=false
   NOTIFY_EMAIL=sahoodipanjali765@gmail.com
   ```

3. Start the server:
   ```bash
   npm run backend
   ```

The server listens on port 5000 and will correctly respond to the front-end's CORS preflight request when the client is running on http://localhost:8080. Adjust `CORS_ORIGIN` if you change the client port.

---
