import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../admin/components/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* Sidebar navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
