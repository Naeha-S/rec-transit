# REC Transit System 

A modern, responsive web application for college transportation management featuring real-time bus tracking, schedule management, and administrative controls.

## Project Overview:

REC Transit System is a comprehensive transportation management platform designed for my college . It provides students and staff with real-time bus information, route tracking, and schedule management while offering administrators powerful tools to manage the entire transit system.

### Key Features:

- **Real-time Bus Tracking** - Live bus locations and arrival times
- **Interactive Route Maps** - Visual route planning with Mapbox integration
- **Multi-language Support** - English and Tamil language options
- **Admin Dashboard** - Comprehensive management tools for administrators
- **Holiday Management** - Special schedule handling for holidays and events
- **Feedback System** - User feedback collection and management
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **PWA Support** - Progressive Web App capabilities for mobile installation
- **Offline Functionality** - Cached data for offline access
  
## Technical Architecture:

### Frontend Stack
- **React** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **React Router** - Client-side routing
- **TanStack React Query** - Data fetching and caching
- **React Hook Form** - Form handling and validation

### Backend & Data Integration
- **Supabase** - Backend-as-a-Service (configured for future use)
- **Google Sheets API** - Real-time data fetching from Google Sheets
- **Mapbox GL JS** - Interactive maps and geolocation

### UI/UX Libraries
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization and charts
- **Next Themes** - Dark/light theme management
- **Sonner** - Toast notifications
  
## Project Structure:

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components 
│   ├── admin/           # Admin-specific components
│   └── home/            # Home page components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API and data services
├── utils/               # Utility functions
├── translations/        # i18n translation files
└── lib/                 # Shared libraries and configurations

Key Files:
├── src/App.tsx          # Main application component
├── src/main.tsx         # Application entry point
├── src/index.css        # Global styles and design tokens
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite build configuration
```

## API Integrations:

### Google Sheets API
- **Purpose**: Real-time bus schedule and route data
- **Implementation**: CSV export from Google Sheets
- **Data Types**: Bus schedules, routes, timings, driver information
- **Update Frequency**: Real-time with 5-minute cache intervals

### Mapbox API
- **Purpose**: Interactive maps and route visualization
- **Features**: Real-time bus tracking, route planning, geolocation
- **Map Styles**: Light theme with custom styling
- **Components**: Navigation controls, markers, route overlays

### Supabase Integration (Ready for Activation)
- **Authentication**: User login and role-based access
- **Database**: Persistent data storage
- **Real-time**: Live data synchronization
- **File Storage**: Asset and document management
- 
## Features Documentation

### User Features

#### Bus Schedules & Tracking
- View real-time bus schedules
- Track bus locations on interactive maps
- Filter by time slots (10 AM, 1 PM, 5 PM, Exam timings)
- Search buses by route or destination

#### Multi-language Support
- Toggle between English and Tamil
- Persistent language preferences
- Localized content and UI elements

#### Mobile Experience
- Responsive design for all screen sizes
- Touch-optimized controls
- PWA installation support
- Offline data access

### Administrative Features

#### Schedule Management
- Update bus timings and routes
- Manage driver information
- Handle special event schedules

#### Holiday Management
- Configure holiday schedules
- Set special operating hours
- Manage semester breaks

#### System Settings
- Configure application settings
- Manage user notifications
- Monitor system performance

#### Feedback Management
- Review user feedback
- Respond to suggestions
- Track system improvements

## Security Features

- Role-based access control
- Secure admin authentication
- Data validation and sanitization
- HTTPS enforcement in production
- Secure API key management

## Performance Features

- Lazy loading for optimal performance
- Image optimization and compression
- Efficient data caching strategies
- Bundle size optimization
- Real-time performance monitoring

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Text size adjustment options

## Version History:

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added multi-language support
- **v1.2.0** - Enhanced mobile responsiveness
- **v1.3.0** - Added admin dashboard
- **v1.4.0** - Implemented PWA features


---

**REC Transit System** - Making campus transportation smarter, faster, and more accessible for everyone. 🚌✨
