import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function RootLayout() {
  return (
    // <div className="min-h-screen bg-background">
    //   {/* Sidebar - Fixed on desktop */}
    //   <Sidebar />

    //   {/* Main area */}
    //   <div className="flex flex-col min-h-screen lg:ml-64">
    //     {/* Navbar - sticky, starts after sidebar on desktop */}
    //     <Navbar />

    //     {/* Content */}
    //     <main className="flex-1 overflow-auto pt-16 lg:pt-0">
    //       <div className="p-4 lg:p-8">
    //         <Outlet />
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col min-h-screen flex-1 ml-0 lg:ml-64">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-8 ">
              <Outlet />
            </div>
          </main>
        </div>
   
    </div>
  );
}
