import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { StudentDashboard } from './components/StudentDashboard';

type Page = 'landing' | 'login' | 'register' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login logic
    setUser({ name: 'John Doe', email });
    setIsLoggedIn(true);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigateTo('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />;
      case 'register':
        return <RegistrationPage onNavigate={navigateTo} />;
      case 'dashboard':
        // return <StudentDashboard user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
        return <StudentDashboard onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
}