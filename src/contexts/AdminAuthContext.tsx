
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ExamSchedule {
  [busId: string]: '1' | '3' | '5';
}

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  currentPassword: string;
  examSchedule: ExamSchedule;
  feedbackEmail: string;
  isExamModeActive: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  updateExamSchedule: (busId: string, time: '1' | '3' | '5') => void;
  getExamBusesByTime: (time: '1' | '3' | '5') => string[];
  updateFeedbackEmail: (email: string) => void;
  toggleExamMode: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('rec');
  const [examSchedule, setExamSchedule] = useState<ExamSchedule>({});
  const [feedbackEmail, setFeedbackEmail] = useState('transport@rajalakshmi.edu.in');
  const [isExamModeActive, setIsExamModeActive] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedPassword = localStorage.getItem('adminPassword');
    const savedExamSchedule = localStorage.getItem('examSchedule');
    const savedFeedbackEmail = localStorage.getItem('feedbackEmail');
    const savedExamMode = localStorage.getItem('examModeActive');
    
    if (savedAuth === 'true') {
      setIsAdminAuthenticated(true);
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
    if (savedExamMode !== null) {
      setIsExamModeActive(savedExamMode === 'true');
    }
  }, []);

  const login = (password: string): boolean => {
    // Check override key or current password
    if (password === 'NAEHA$24' || password === currentPassword) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const changePassword = (currentPass: string, newPass: string): boolean => {
    // Allow override key or current password, but don't allow changing the override key
    if (currentPass === 'NAEHA$24' || currentPass === currentPassword) {
      // Don't allow changing password if current password is the override key
      if (currentPass === 'NAEHA$24' && currentPassword === 'NAEHA$24') {
        return false; // Cannot change override key
      }
      setCurrentPassword(newPass);
      localStorage.setItem('adminPassword', newPass);
      return true;
    }
    return false;
  };

  const updateExamSchedule = (busId: string, time: '1' | '3' | '5') => {
    const newSchedule = { ...examSchedule, [busId]: time };
    setExamSchedule(newSchedule);
    localStorage.setItem('examSchedule', JSON.stringify(newSchedule));
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
  };

  const toggleExamMode = () => {
    const newMode = !isExamModeActive;
    setIsExamModeActive(newMode);
    localStorage.setItem('examModeActive', newMode.toString());
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminAuthenticated,
      currentPassword,
      examSchedule,
      feedbackEmail,
      isExamModeActive,
      login,
      logout,
      changePassword,
      updateExamSchedule,
      getExamBusesByTime,
      updateFeedbackEmail,
      toggleExamMode
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
