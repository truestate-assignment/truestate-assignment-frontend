import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Squares2X2Icon,
  UserGroupIcon,
  InboxArrowDownIcon,
  BoltIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({ services: true, invoices: false });

  // Map paths to menu names for active state
  const getActiveMenu = (pathname) => {
    if (pathname === '/' || pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/services') return 'Services';
    if (pathname === '/nexus') return 'Nexus';
    if (pathname === '/intake') return 'Intake';
    if (pathname === '/invoices') return 'Invoices';
    return '';
  };

  const currentView = getActiveMenu(location.pathname);

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const handleItemClick = (item) => {
    if (item.expandable) {
      toggleMenu(item.name.toLowerCase());
    }

    // Navigate based on item name
    switch (item.name) {
      case 'Dashboard':
        navigate('/dashboard');
        onClose && onClose(); // Close sidebar on mobile after navigation
        break;
      case 'Services':
        navigate('/services');
        onClose && onClose();
        break;
      case 'Nexus':
        navigate('/nexus');
        onClose && onClose();
        break;
      case 'Intake':
        navigate('/intake');
        onClose && onClose();
        break;
      case 'Invoices':
        navigate('/invoices');
        onClose && onClose();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: Squares2X2Icon },
    { name: 'Nexus', icon: UserGroupIcon },
    { name: 'Intake', icon: InboxArrowDownIcon },
    {
      name: 'Services',
      icon: BoltIcon,
      expandable: true,
      expanded: expandedMenus.services,
      submenu: [
        { name: 'Pre-active', active: false },
        { name: 'Active', active: true },
        { name: 'Blocked', active: false },
        { name: 'Closed', active: false },
      ]
    },
    {
      name: 'Invoices',
      icon: DocumentTextIcon,
      expandable: true,
      expanded: expandedMenus.invoices,
      submenu: [
        { name: 'Proforma Invoices', active: false },
        { name: 'Final Invoices', active: false },
      ]
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-auto md:h-screen
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-gray-800">Vault</span>
              <span className="text-xs text-gray-500">Anurag Yadav</span>
            </div>
          </div>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = currentView === item.name;
            return (
              <div key={item.name}>
                {/* Main Menu Item */}
                <div
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                  {item.expandable && (
                    item.expanded ?
                      <ChevronDownIcon className="w-4 h-4" /> :
                      <ChevronRightIcon className="w-4 h-4" />
                  )}
                </div>

                {/* Submenu */}
                {item.expandable && item.expanded && (
                  <div className="ml-8 mt-1 space-y-0.5">
                    {item.submenu.map((subItem) => (
                      <div
                        key={subItem.name}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm transition-all duration-200
                          ${subItem.active
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${subItem.active ? 'bg-red-600' : 'bg-blue-600'}`} />
                        {subItem.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;