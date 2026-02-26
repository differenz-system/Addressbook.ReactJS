import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
