import { Link, useNavigate } from "@tanstack/react-router";
import { clearAuth } from "@/features/auth/authUtils";
import drink_light from "../assets/images/drink_light.svg";
import Desk_alt_light from "../assets/images/Desk_alt_light.svg";
import pie_chart_light from "../assets/images/pie_chart_light.svg";
function EmployeeSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate({ to: '/login' });
  };

  return (
          <aside className="w-65 h-screen bg-dark-background p-6 flex flex-col gap-6">
            <h2 className="font-bebas text-2xl text-center text-white">Restaurant CRM</h2>
            <hr className="border-0.25 border-border-color" />
            <nav className="flex flex-col gap-2 justify-center items-center border-box">
              <Link
                to="/employee/tables"
                className="p-4 rounded-lg bg-dark-button hover:bg-background-primary w-full text-start p-4 flex items-start gap-2 text-white"
              >
                <img src={drink_light} alt="Drink" className="w-6 h-6" />
                Tables
              </Link>
              <Link
                to="/employee/orders"
                className="p-4 rounded-lg bg-dark-button hover:bg-background-primary w-full text-start p-4 flex items-start gap-2 text-white"
              >
                <img src={Desk_alt_light} alt="Desk" className="w-6 h-6" />
                Orders
              </Link>
              <Link
                to="/employee/statistics"
                className="p-4 rounded-lg bg-dark-button hover:bg-background-primary w-full text-start p-4 flex items-start gap-2 text-white"
              >
                <img src={pie_chart_light} alt="Pie" className="w-6 h-6" />
                Statistics
              </Link>
            </nav>

            <button
              onClick={handleLogout}
              className="mt-auto p-4 rounded-lg w-full text-start flex items-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
              </svg>
              Logout
            </button>
          </aside>
          
  )
}

export default EmployeeSidebar