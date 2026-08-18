import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../admin/components/AdminHeader';

const AdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased overflow-x-hidden">
      {/* Sidebar navigation */}
      <AdminSidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col min-w-0 w-full transition-all duration-200">
        <AdminHeader 
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)} 
        />
        <main className="flex-1 p-3 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
