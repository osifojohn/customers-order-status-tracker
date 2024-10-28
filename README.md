# Order Status Tracker 📦

A modern, type-safe order management system built with Next.js, tRPC, and Prisma. Track, filter, and manage fulfillment orders with ease.

![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)

![Order Status Tracker UI](https://i.imghippo.com/files/AYfm8418Co.png)

## 🚀 Features

- **Real-time Order Tracking**: View and manage fulfillment orders in a responsive table interface
- **Smart Filtering**: Filter orders by:
  - Customer name, email
  - Order information: state, city, country, street, house number, orderId
  - Fulfillment status
  - Date range
- **Server-side Pagination**: Efficient handling of large datasets
- **Type-safe**: End-to-end type safety with TypeScript and tRPC
- **Modern UI**: Clean, accessible interface built with shadcn/ui components
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**:

  - Next.js 14
  - React 18
  - TypeScript
  - TanStack Table v8
  - Tailwind CSS
  - shadcn/ui components

- **Backend**:
  - tRPC
  - Prisma
  - PostgreSQL
  - TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17 or higher)
- PostgreSQL
- npm (preferred package manager)

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/osifojohn/customers-order-status-tracker.git
cd customers-order-status-tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy the example env file
cp .env.example .env

# Fill in your environment variables
DATABASE_URL="postgresql://user:password@localhost:5432/customers-order-status-tracker"
```

4. **Set up the database**

```bash
# Run migrations
npm prisma migrate dev

# Seed the database (optional)
npm prisma db seed
```

5. **Start the development server**

```bash
npm dev
```

Visit `http://localhost:3000` to see the application in action!

## 🏗️ Project Structure

```
customers-order-status-tracker/
├── src/                  # Source code root directory
│   ├── app/             # Next.js app router - All pages and API routes
│   ├── components/      # Reusable React components
│   ├── server/         # Backend logic - tRPC routers, API handlers, middleware
│   ├── lib/            # Shared utilities, helpers, and business logic
│   ├── types/          # TypeScript type definitions and interfaces
│   ├── hooks/          # Custom React hooks for shared functionality
│   ├── trpc/           # tRPC client configuration and utilities
│   └── styles/         # Global styles, themes, and CSS modules
│
├── prisma/             # Database configuration and management
└── public/            # Static files served directly by Next.js
```

## 🔍 Key Features Explained

### Order Management

- View comprehensive order details including customer information and line items
- Track fulfillment status with real-time updates
- Filter and search orders with server-side processing

### Type Safety

- End-to-end type safety with TypeScript
- Auto-generated types from Prisma schema
- Type-safe API calls with tRPC

### Data Handling

- Efficient server-side pagination
- Advanced filtering capabilities
- Optimized database queries

## 📦 Deployment

This application can be deployed to any platform that supports Next.js applications. Here's how to deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure your environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Prisma](https://www.prisma.io/) for the excellent database toolkit
- [tRPC](https://trpc.io/) for the end-to-end type safety
- [TanStack Table](https://tanstack.com/table/v8) for the powerful table functionality

## 📞 Contact

Osifo John - osifojohntec@gmail.com
Project Link: [https://github.com/osifojohn/customers-order-status-tracker.git](https://github.com/osifojohn/customers-order-status-tracker.git)

---

Made with ❤️ by [Osifo John]
