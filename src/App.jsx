import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';

// Placeholder component for under development pages
const UnderDevelopment = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-96 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <UserCircleIcon className="w-8 h-8 text-gray-400" />
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-500">This module is currently under development.</p>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-background-50 font-sans text-gray-900 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">

          {/* Header */}
          <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
              <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Punit Punde</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <UserCircleIcon className="h-9 w-9 text-gray-300" />
              </div>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto pb-10">
              <Routes>
                <Route path="/" element={<Navigate to="/services" replace />} />
                <Route path="/dashboard" element={<Dashboard transactions={[]} />} />
                <Route path="/services" element={<Services />} />
                <Route path="/nexus" element={<UnderDevelopment title="Nexus" />} />
                <Route path="/intake" element={<UnderDevelopment title="Intake" />} />
                <Route path="/invoices" element={<UnderDevelopment title="Invoices" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;