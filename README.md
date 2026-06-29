# Wakala Portal

A modern, full-stack web application built with TanStack Start, React, and TypeScript. The Wakala Portal is a comprehensive business management system designed for **GJ General Traders Company Limited** in Tanzania, powered by Halotel Tanzania infrastructure.

## 🎯 Overview

The Wakala Portal is a professional business management platform providing a complete suite of tools for managing operations, communications, and business processes. Built with modern web technologies and best practices, it delivers a seamless user experience across all devices.

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with server-side rendering support
- **TypeScript** - Type-safe development
- **TanStack Start** - Full-stack React framework
- **TanStack React Router** - Declarative routing
- **TanStack React Query** - Server state management
- **Tailwind CSS 4** - Utility-first styling framework
- **Radix UI** - Accessible, unstyled components

### Backend & Infrastructure
- **Vite** - Lightning-fast build tool
- **Nitro** - Universal JavaScript server
- **Cloudflare Workers** - Serverless deployment (default)
- **Vercel** - Alternative serverless platform
- **Supabase** - Backend-as-a-service (PostgreSQL, Auth, Realtime)

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **TypeScript ESLint** - Type-aware linting
- **Bun** - Fast JavaScript runtime

## 📋 Features

- **Authentication & Authorization** - Supabase Auth integration
- **Responsive UI** - Mobile-first design with Tailwind CSS
- **Real-time Capabilities** - Supabase Realtime support
- **PDF Generation** - pdf-lib for document creation
- **Data Visualization** - Recharts for charts and graphs
- **Form Management** - React Hook Form with Zod validation
- **Rich UI Components** - Comprehensive Radix UI collection
- **Dark Mode Support** - Theme switching capabilities

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ or **Bun** (recommended for faster performance)
- **npm** or **Bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Itmo39/wakala-portal.git
   cd wakala-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or using Bun
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables in `.env`:
   - Supabase credentials
   - API endpoints
   - Cloudflare/Vercel configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build            # Build for production
npm run build:dev        # Build in development mode
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

## 📁 Project Structure

```
wakala-portal/
├── src/
│   ├── routes/           # TanStack Router routes
│   ├── components/       # Reusable React components
│   │   └── ui/          # Radix UI component library
│   ├── lib/             # Utility functions and libraries
│   │   └── auth.tsx     # Authentication provider
│   ├── server/          # Server-side code (SSR/API)
│   └── styles.css       # Global styles
├── public/              # Static assets
├── supabase/            # Supabase configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── wrangler.jsonc       # Cloudflare Workers configuration
```

## 🔐 Authentication

The application uses **Supabase Authentication** for secure user management:
- Email/password authentication
- Session management
- Protected routes via `AuthProvider`

## 🌐 Deployment

### Cloudflare Workers (Default)
```bash
npm run build
wrangler deploy
```

### Vercel
The application includes Nitro integration for Vercel deployments:
```bash
npm run build
# Deploy through Vercel UI or CLI
```

Set `VERCEL=1` environment variable during Vercel builds.

## 🎨 Styling

The project uses **Tailwind CSS 4** for styling with a comprehensive UI component library built on **Radix UI**:

- Fully customizable theme
- Dark mode support
- Responsive design patterns
- Accessible component library

## 🔌 API Integration

### Supabase
- PostgreSQL database
- Real-time subscriptions
- Row-level security
- Authentication

### Form Handling
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

## 📊 Data Visualization

The project includes **Recharts** for creating interactive charts and visualizations.

## 📄 Document Generation

**pdf-lib** is integrated for PDF generation and manipulation capabilities.

## 🔍 Code Quality

- **ESLint** configuration for code standards
- **Prettier** for consistent formatting
- **TypeScript** strict mode enabled
- Pre-commit hooks (optional via `.husky`)

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is occupied:
```bash
npm run dev -- --port 3000
```

### Build Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection
Verify credentials in `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📚 Documentation

- [TanStack Start Docs](https://tanstack.com/start)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Supabase](https://supabase.com/docs)

## 🤝 Contributing

Contributions are welcome! Please ensure:
1. Code passes linting: `npm run lint`
2. Code is formatted: `npm run format`
3. TypeScript compiles without errors
4. Changes are well-documented

## 📝 License

This project is private and maintained by **GJ General Traders Company Limited**.

## 🏢 Organization

**Company:** GJ General Traders Company Limited  
**Location:** Tanzania  
**Powered by:** Halotel Tanzania

## 📞 Support

For support and inquiries, please contact the development team.

---

**Built with ❤️ using TanStack Start and modern web technologies**
