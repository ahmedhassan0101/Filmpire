import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";


export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-col min-h-screen flex-1 ml-0 lg:ml-64">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
