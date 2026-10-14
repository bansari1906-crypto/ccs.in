import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../admin/AdminSidebar";
import { AdminTopbar } from "../admin/AdminTopbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F6F8F7] font-sans">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AdminTopbar setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F6F8F7] p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
