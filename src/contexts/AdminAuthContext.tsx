
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ExamSchedule {
  [busId: string]: '1' | '3' | '5';
}

interface LoginAttempt {
  timestamp: number;
  ip: string;
}

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  currentPassword: string;
  examSchedule: ExamSchedule;
  feedbackEmail: string;
  isExamModeActive: boolean;
  sessionTimeout: number;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  updateExamSchedule: (busId: string, time: '1' | '3' | '5') => void;
  getExamBusesByTime: (time: '1' | '3' | '5') => string[];
  updateFeedbackEmail: (email: string) => void;
  toggleExamMode: () => void;
  isRateLimited: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('rec');
  const [examSchedule, setExamSchedule] = useState<ExamSchedule>({});
  const [feedbackEmail, setFeedbackEmail] = useState('transport@rajalakshmi.edu.in');
  const [isExamModeActive, setIsExamModeActive] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30 * 60 * 1000); // 30 minutes
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Auto-logout after session timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isAdminAuthenticated) {
      timeoutId = setTimeout(() => {
        logout();
        console.log('Session expired - auto logout');
      }, sessionTimeout);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAdminAuthenticated, sessionTimeout]);

  // Rate limiting: max 5 attempts per 15 minutes
  useEffect(() => {
    const now = Date.now();
    const fifteenMinutesAgo = now - (15 * 60 * 1000);
    
    // Clean old attempts
    const recentAttempts = loginAttempts.filter(attempt => attempt.timestamp > fifteenMinutesAgo);
    setLoginAttempts(recentAttempts);
    
    // Check if rate limited
    if (recentAttempts.length >= 5) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 15 * 60 * 1000);
    } else {
      setIsRateLimited(false);
    }
  }, [loginAttempts]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedPassword = localStorage.getItem('adminPassword');
    const savedExamSchedule = localStorage.getItem('examSchedule');
    const savedFeedbackEmail = localStorage.getItem('feedbackEmail');
    const savedExamMode = localStorage.getItem('examModeActive');
    const savedSessionTime = localStorage.getItem('adminSessionStart');
    
    if (savedAuth === 'true' && savedSessionTime) {
      const sessionStart = parseInt(savedSessionTime);
      const now = Date.now();
      
      // Check if session is still valid
      if (now - sessionStart < sessionTimeout) {
        setIsAdminAuthenticated(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminSessionStart');
      }
    }
    
    if (savedPassword) {
      setCurrentPassword(savedPassword);
    }
    if (savedExamSchedule) {
      try {
        setExamSchedule(JSON.parse(savedExamSchedule));
      } catch (error) {
        console.error('Error parsing exam schedule:', error);
      }
    }
    if (savedFeedbackEmail) {
      setFeedbackEmail(savedFeedbackEmail);
    }
    if (savedExamMode === 'false') {
      setIsExamModeActive(false);
    }
  }, [sessionTimeout]);

  const validatePasswordStrength = (password: string): boolean => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return minLength && hasUpper && hasLower && hasNumber;
  };

  const login = (password: string): boolean => {
    if (isRateLimited) {
      console.log('Login rate limited');
      return false;
    }

    // Add login attempt
    const newAttempt: LoginAttempt = {
      timestamp: Date.now(),
      ip: 'unknown' // In real app, would get actual IP
    };
    setLoginAttempts(prev => [...prev, newAttempt]);

    // Check override key or current password
    if (password === 'NAEHA$24' || password === currentPassword) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminSessionStart', Date.now().toString());
      
      // Log successful login
      console.log('Admin login successful at:', new Date().toISOString());
      return true;
    }
    
    console.log('Failed login attempt at:', new Date().toISOString());
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminSessionStart');
    console.log('Admin logout at:', new Date().toISOString());
  };

  const changePassword = (currentPass: string, newPass: string): boolean => {
    // Validate current password
    if (currentPass !== 'NAEHA$24' && currentPass !== currentPassword) {
      return false;
    }
    
    // Don't allow changing override key
    if (currentPass === 'NAEHA$24' && currentPassword === 'NAEHA$24') {
      return false;
    }
    
    // Validate new password strength
    if (!validatePasswordStrength(newPass)) {
      console.log('New password does not meet security requirements');
      return false;
    }
    
    setCurrentPassword(newPass);
    localStorage.setItem('adminPassword', newPass);
    console.log('Admin password changed at:', new Date().toISOString());
    return true;
  };

  const updateExamSchedule = (busId: string, time: '1' | '3' | '5') => {
    const newSchedule = { ...examSchedule, [busId]: time };
    setExamSchedule(newSchedule);
    localStorage.setItem('examSchedule', JSON.stringify(newSchedule));
    console.log('Exam schedule updated:', busId, time);
  };

  const getExamBusesByTime = (time: '1' | '3' | '5'): string[] => {
    if (!isExamModeActive) return [];
    return Object.entries(examSchedule)
      .filter(([_, scheduleTime]) => scheduleTime === time)
      .map(([busId, _]) => busId);
  };

  const updateFeedbackEmail = (email: string) => {
    setFeedbackEmail(email);
    localStorage.setItem('feedbackEmail', email);
    console.log('Feedback email updated to:', email);
  };

  const toggleExamMode = () => {
    const newMode = !isExamModeActive;
    setIsExamModeActive(newMode);
    localStorage.setItem('examModeActive', newMode.toString());
    console.log('Exam mode toggled to:', newMode);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminAuthenticated,
      currentPassword,
      examSchedule,
      feedbackEmail,
      isExamModeActive,
      sessionTimeout,
      login,
      logout,
      changePassword,
      updateExamSchedule,
      getExamBusesByTime,
      updateFeedbackEmail,
      toggleExamMode,
      isRateLimited
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
