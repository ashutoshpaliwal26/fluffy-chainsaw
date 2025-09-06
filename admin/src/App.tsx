import React, { useEffect } from 'react';
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/pages/Dashboard';
import { Products } from './components/pages/Products';
import { Orders } from './components/pages/Orders';
import { Settings } from './components/pages/Settings';
import { ComingSoon } from './components/pages/ComingSoon';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { BrowserRouter as Router } from 'react-router-dom';
import apiClient from './utils/apiClient';
import ToastContext from './contexts/ToastContext';
import Loader from './components/ui/Loader';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState<boolean>(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/auth/check', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });
      console.log("dashboard res : ", response);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <Login
          onSwitchToSignup={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <Signup
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'customers':
        return <ComingSoon title="Customers" description="Customer management features are coming soon. You'll be able to view customer profiles, order history, and analytics." />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ToastContext>
      <Router>
        <ThemeProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </ThemeProvider>
      </Router>
    </ToastContext>
  );
}

export default App;