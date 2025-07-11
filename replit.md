# TraceIntel - Cybersecurity SaaS Platform

## Overview

TraceIntel is a licensed cybersecurity SaaS tool that recreates and enhances functionality from the Linux-based Seeker tool. It's a web-based platform for creating tracking links and collecting intelligence data from visitors. The application follows a full-stack architecture with React frontend, Express backend, and PostgreSQL database, all designed to run within the Replit environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom cyber-themed color palette
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy using session-based auth
- **Session Management**: Express sessions with PostgreSQL store
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Password Hashing**: Node.js crypto module with scrypt
- **API Design**: RESTful endpoints with Express middleware

### Database Architecture
- **Database**: PostgreSQL via Neon Database
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless driver with connection pooling
- **Tables**: Users, shortlinks, click_events, and session storage

## Key Components

### Authentication System
- Session-based authentication using Passport.js
- Password hashing with scrypt and salt
- Protected routes with middleware validation
- JWT-like session management with secure cookies

### Tracking System
- Dynamic shortlink generation using nanoid
- Comprehensive visitor data collection including:
  - Geolocation (latitude/longitude)
  - IP address and location data
  - Browser and OS information
  - Screen resolution and language
- Server-side tracking page handling at `/s/:slug`

### Dashboard Interface
- Cybersecurity-themed UI with dark color scheme
- Interactive map visualization using Leaflet.js
- Real-time statistics and threat assessment
- Link management with CRUD operations
- Campaign organization and analytics

### Map Integration
- Leaflet.js for interactive map display
- Dark theme tiles from CartoDB
- Marker clustering for click events
- Geolocation visualization with custom styling

## Data Flow

### User Registration/Login
1. User submits credentials via React form
2. Backend validates and hashes password
3. Session created and stored in PostgreSQL
4. Frontend receives user data and updates state
5. Protected routes become accessible

### Link Creation
1. User creates tracking link with target URL
2. System generates unique slug using nanoid
3. Link stored in database with user association
4. Frontend updates link list via React Query

### Visitor Tracking
1. Visitor accesses `/s/:slug` endpoint
2. Server serves tracking page with JavaScript
3. Client-side script collects visitor data
4. Data sent to backend and stored in database
5. User redirected to target URL
6. Dashboard updates with new click event

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI components
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **leaflet**: Interactive maps

### Authentication & Security
- **passport**: Authentication middleware
- **bcrypt**: Password hashing (types only)
- **connect-pg-simple**: PostgreSQL session store
- **zod**: Runtime type validation

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **eslint**: Code linting
- **drizzle-kit**: Database toolkit

## Deployment Strategy

### Environment Setup
- **Platform**: Replit with integrated development environment
- **Database**: Neon Database (PostgreSQL) with automatic provisioning
- **Environment Variables**: DATABASE_URL and SESSION_SECRET required
- **Asset Management**: Vite handles static assets and bundling

### Build Process
1. Client-side React app built with Vite
2. Server-side Express app bundled with esbuild
3. Static assets served from dist/public
4. Database migrations applied via Drizzle Kit

### Production Considerations
- Session security with httpOnly cookies
- Database connection pooling for performance
- Error handling and logging middleware
- CORS configuration for cross-origin requests

### Development Workflow
- Hot module replacement for frontend development
- TypeScript compilation for type safety
- Automatic database schema synchronization
- Integrated debugging with source maps

The application is designed for immediate deployment in Replit with minimal configuration, requiring only database provisioning and environment variable setup.