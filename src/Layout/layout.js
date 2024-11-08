import { Outlet } from "react-router-dom";
import '../App.css';
const LayoutComponent = () => {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
    );
  }
export default LayoutComponent;  