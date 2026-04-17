import { Link, useNavigate } from '@tanstack/react-router';
import { clearAuth } from '@/features/auth/authUtils';
import Home_light from '../assets/images/Home_light.svg';
import Calendar_light from '../assets/images/Calendar_light.svg';
import Wallet_alt_light from '../assets/images/Wallet_alt_light.svg';
import Subttasks_light from '../assets/images/Subttasks_light.svg';
import Line_up_light from '../assets/images/Line_up_light.svg';
import Group_light from '../assets/images/Group_light.svg';
import suitcase_light from '../assets/images/suitcase_light.svg';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate({ to: '/login' });
  };

  return (
    <aside className="w-65 h-screen bg-background-secondary p-6 flex flex-col gap-6">
      <h2 className="font-bebas text-2xl text-center">Restaurant CRM</h2>
      <hr className="border-0.25 border-border-color" />
      <nav className="flex flex-col gap-2 justify-center items-center border-box">
        <Link
          to="/"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={Home_light} alt="Home" className="w-6 h-6" />
          Home
        </Link>
        <Link
          to="/admin/shift"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={Calendar_light} alt="Calendar" className="w-6 h-6" />
          Shift
        </Link>
        <Link
          to="/admin/payroll"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={Wallet_alt_light} alt="Payroll" className="w-6 h-6" />
          Payroll
        </Link>
        <Link
          to="/admin/tasks"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={Subttasks_light} alt="Tasks" className="w-6 h-6" />
          Tasks
        </Link>
        <Link
          to="/admin/analytics"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={Line_up_light} alt="Analytics" className="w-6 h-6" />
          Analytics
        </Link>
        <Link
          to="/admin/employees"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={Group_light} alt="Employees" className="w-6 h-6" />
          Employees
        </Link>
        <Link
          to="/admin/vacation"
          className="p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"
        >
          <img src={suitcase_light} alt="Vacation" className="w-6 h-6" />
          Vacation
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto p-4 rounded-lg w-full text-start flex items-center gap-2 text-red-500 hover:bg-red-500/10 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
