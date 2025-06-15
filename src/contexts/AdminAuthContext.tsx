
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ExamSchedule {
  [busId: string]: '1' | '3' | '5';
}

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  currentPassword: string;
  examSchedule: ExamSchedule;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  updateExamSchedule: (busId: string, time: '1' | '3' | '5') => void;
  getExamBusesByTime: (time: '1' | '3' | '5') => string[];
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('admin123');
  const [examSchedule, setExamSchedule] = useState<ExamSchedule>({});

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedPassword = localStorage.getItem('adminPassword');
    const savedExamSchedule = localStorage.getItem('examSchedule');
    
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
    // Allow override key or current password
    if (currentPass === 'NAEHA$24' || currentPass === currentPassword) {
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
    return Object.entries(examSchedule)
      .filter(([_, scheduleTime]) => scheduleTime === time)
      .map(([busId, _]) => busId);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminAuthenticated,
      currentPassword,
      examSchedule,
      login,
      logout,
      changePassword,
      updateExamSchedule,
      getExamBusesByTime
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
