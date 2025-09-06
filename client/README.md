# Modulive - Modern E-Commerce Platform

A fully responsive, modern e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 Modern, clean UI design with dark/light mode support
- 📱 Fully responsive for mobile, tablet, and desktop
- 🛒 Complete shopping cart and wishlist functionality
- 🔍 Advanced product search and filtering
- 🎭 Smooth animations with Framer Motion
- 🚀 Optimized performance with code splitting and lazy loading
- ♿ Accessibility-first design
- 🎯 SEO-optimized with React Helmet

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   └── layout/         # Layout components
├── pages/              # Page components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Mock data
```

## Features Overview

### 🏠 Landing Page
- Hero section with dynamic content
- Featured products carousel
- Statistics and testimonials
- Newsletter signup

### 🛍️ Product Catalog
- Category-based filtering
- Search functionality
- Sort options (price, rating, newest)
- Grid/list view toggle

### 📦 Product Details
- Image gallery with zoom
- Color and size selection
- Add to cart/wishlist
- Related products

### 🛒 Shopping Cart
- Real-time price calculations
- Quantity adjustments
- Persistent storage

### ❤️ Wishlist
- Save favorite products
- Move items to cart
- Persistent storage

### 🔐 Authentication
- Login/signup forms
- Mock authentication flow
- Protected routes

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
