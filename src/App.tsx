
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { HolidayProvider } from './contexts/HolidayContext';
import Index from './pages/Index';
import BusList from './pages/BusList';
import BusSchedules from './pages/BusSchedules';
import ExamTimings from './pages/ExamTimings';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import HelpSupport from './pages/HelpSupport';
import WelcomeToast from './components/WelcomeToast';
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <NotificationProvider>
            <HolidayProvider>
              <Router>
                <WelcomeToast />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/buses" element={<BusList />} />
                  <Route path="/schedules" element={<BusSchedules />} />
                  <Route path="/exam-timings" element={<ExamTimings />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/help-support" element={<HelpSupport />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
              <Toaster />
            </HolidayProvider>
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
