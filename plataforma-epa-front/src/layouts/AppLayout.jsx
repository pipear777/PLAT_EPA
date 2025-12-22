import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "./components";


export const AppLayout = ({ title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col w-full">
        <Navbar
          title={title}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="relative bg-gray-200 flex-1 overflow-auto p-4">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
