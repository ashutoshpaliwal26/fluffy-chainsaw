import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronLeft,
  Store
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, sidebarCollapsed, setSidebarCollapsed } = useApp();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile backdrop */}
      {!sidebarCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:relative transition-all duration-200 ${
          sidebarCollapsed && isMobile ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        } ${sidebarCollapsed && !isMobile ? 'w-20' : 'w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Store className="w-8 h-8 text-blue-600" />
              {(!sidebarCollapsed || isMobile) && (
                <span className="text-xl font-bold text-gray-900 dark:text-white overflow-hidden whitespace-nowrap">
                  AdminHub
                </span>
              )}
            </div>
            
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft 
                className={`w-4 h-4 transition-transform duration-200 ${
                  sidebarCollapsed && !isMobile ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <div
                  key={item.id}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (isMobile) {
                      setSidebarCollapsed(true);
                    }
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {(!sidebarCollapsed || isMobile) && (
                    <span className="font-medium overflow-hidden whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
