<div align="center">

# DocuMind

**Intelligent, AI-Powered Document Interaction**

Chat with your PDFs naturally. An advanced RAG (Retrieval-Augmented Generation) assistant built with Next.js, Gemini, and pgvector.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

</div>

---

## 🚀 Features

- **Conversational Document Analysis:** Upload any PDF and chat with it as if it were a human expert.
- **Robust "Zero-Fetch" Pipeline:** A highly reliable, server-side document ingestion architecture using UploadThing webhooks for text extraction, chunking, and immediate vector storage without unreliable client fetches.
- **Advanced Vector Search:** Employs PostgreSQL with `pgvector` to store embeddings and perform rapid semantic similarity grouping to find exactly the context the AI needs.
- **Premium User Experience:** Immersive SaaS-tier UI featuring deep glassmorphism layouts, sophisticated micro-interactions, dark-mode, and Framer Motion animations.
- **Seamless Chat Streaming:** Utilizes the Vercel AI SDK to stream LLM responses in real-time, preventing long loading screens and providing an interactive experience.
- **Secure Authentication:** Integrated with Clerk to securely manage user accounts, isolated sessions, and document permissions.

---

## 📸 Screenshots

Here is a glimpse of the DocuMind interface in action:

<div align="center">

**1. Dashboard & Document Upload**  
*(Showcasing the clean, glassmorphism UI and UploadThing integration)*  
![Dashboard View](./public/screenshots/dashboard.png)

<br>

**2. Intelligent Chat Interface**  
*(Demonstrating real-time AI streaming and document insight retrieval)*  
![Chat Interface](./public/screenshots/chat.png)

</div>

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** TypeScript

### AI & Embeddings
- **Models:** Google Gemini & Groq
- **Orchestration:** [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Parsers:** `pdf-parse`

### Database & Storage
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL with `pgvector` extensions
- **File Storage:** [UploadThing](https://uploadthing.com/)

### UI & Styling
- **Styling:** Tailwind CSS 4
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** Lucide React

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js and npm (or pnpm/yarn) installed on your machine.
You will also need a PostgreSQL database instance that supports the `pgvector` extension (e.g., Supabase, Neon).

### 1. Clone the repository
```bash
git clone https://github.com/SimerjeetSingh304/documind.git
cd documind
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add all required keys. You will need API keys from Clerk, UploadThing, your Database provider, and Google Gemini / Groq.

```env
# Database Credentials
DATABASE_URL="postgres://user:password@host/dbname?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://user:password@host/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# UploadThing
UPLOADTHING_TOKEN="your_uploadthing_token"

# AI Models
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
```

### 4. Setup Prisma Database
Push the schema to your database. This will also enable the `vector` and `uuid-ossp` extensions.
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Architecture Overview

- `/src/app`: Next.js App Router containing all pages, layouts, and API routes.
- `/src/components`: Reusable UI components including Shadcn integrations.
- `/src/lib`: Core utility functions including AI logic (`gemini.ts`), RAG logic (`rag.ts`), and the Prisma client.
- `/src/hooks`: Custom React hooks (e.g., `use-documents.ts`).
- `/src/app/api/uploadthing`: Server-side file upload and ingestion handlers for "Zero-Fetch" architecture.

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.
