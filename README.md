# REC Transit System 🚌

A modern, responsive web application for college transportation management featuring real-time bus tracking, schedule management, and administrative controls.

## 📋 Project Overview

REC Transit System is a comprehensive transportation management platform designed for educational institutions. It provides students and staff with real-time bus information, route tracking, and schedule management while offering administrators powerful tools to manage the entire transit system.

### ✨ Key Features

- **Real-time Bus Tracking** - Live bus locations and arrival times
- **Interactive Route Maps** - Visual route planning with Mapbox integration
- **Multi-language Support** - English and Tamil language options
- **Admin Dashboard** - Comprehensive management tools for administrators
- **Holiday Management** - Special schedule handling for holidays and events
- **Feedback System** - User feedback collection and management
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **PWA Support** - Progressive Web App capabilities for mobile installation
- **Offline Functionality** - Cached data for offline access
- **Performance Monitoring** - Built-in performance tracking and optimization

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **React Router** - Client-side routing
- **TanStack React Query** - Data fetching and caching
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Backend & Data Integration
- **Supabase** - Backend-as-a-Service (configured for future use)
- **Google Sheets API** - Real-time data fetching from Google Sheets
- **Mapbox GL JS** - Interactive maps and geolocation
- **Papa Parse** - CSV parsing for data processing

### UI/UX Libraries
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization and charts
- **Next Themes** - Dark/light theme management
- **Sonner** - Toast notifications
- **React i18next** - Internationalization

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
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

## 🔌 API Integrations

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

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd rec-transit-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Mapbox (Required for maps)
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here

# Google Sheets (Optional - uses public sheets by default)
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key

# Supabase (When activated)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### API Keys Setup

1. **Mapbox Token**:
   - Sign up at [Mapbox](https://mapbox.com)
   - Create a new access token
   - Add to environment variables

2. **Google Sheets API**:
   - Enable Google Sheets API in Google Cloud Console
   - Create API credentials
   - Configure sheet permissions

3. **Supabase**:
   - Click the green Supabase button in Lovable interface
   - Follow integration setup process

## 📱 Features Documentation

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

## 🔒 Security Features

- Role-based access control
- Secure admin authentication
- Data validation and sanitization
- HTTPS enforcement in production
- Secure API key management

## 📊 Performance Features

- Lazy loading for optimal performance
- Image optimization and compression
- Efficient data caching strategies
- Bundle size optimization
- Real-time performance monitoring

## 🌟 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Text size adjustment options

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel via CLI or GitHub integration
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Self-hosted
```bash
npm run build
# Serve dist/ folder with any static file server
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow React best practices
- Maintain responsive design principles
- Write accessible components
- Add proper error handling
- Include appropriate tests

### Naming Conventions
- **Variables**: camelCase
- **Components**: PascalCase
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: kebab-case
- **Constants**: UPPER_SNAKE_CASE

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](wiki-url)
- **Issues**: [GitHub Issues](issues-url)
- **Discussions**: [GitHub Discussions](discussions-url)
- **Email**: support@rectransit.edu

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added multi-language support
- **v1.2.0** - Enhanced mobile responsiveness
- **v1.3.0** - Added admin dashboard
- **v1.4.0** - Implemented PWA features

## 🏗️ Built With Love

This project was built using [Lovable](https://lovable.dev) - a platform for rapid web application development.

---

**REC Transit System** - Making campus transportation smarter, faster, and more accessible for everyone. 🚌✨