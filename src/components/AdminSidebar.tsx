import { Link, useNavigate } from '@tanstack/react-router';
import { clearAuth } from '@/features/auth/authUtils';
import Home_light from '/images/Home_light.svg';
import Calendar_light from '/images/Calendar_light.svg';
import Wallet_alt_light from '/images/Wallet_alt_light.svg';
import Subttasks_light from '/images/Subttasks_light.svg';
import Line_up_light from '/images/Line_up_light.svg';
import Group_light from '/images/Group_light.svg';
import suitcase_light from '/images/suitcase_light.svg';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate({ to: '/login' });
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home_light, alt: "Home" },
    { to: "/admin/shift", label: "Shift", icon: Calendar_light, alt: "Calendar" },
    { to: "/admin/payroll", label: "Payroll", icon: Wallet_alt_light, alt: "Payroll" },
    { to: "/admin/tasks", label: "Tasks", icon: Subttasks_light, alt: "Tasks" },
    { to: "/admin/analytics", label: "Analytics", icon: Line_up_light, alt: "Analytics" },
    { to: "/admin/employees", label: "Employees", icon: Group_light, alt: "Employees" },
    { to: "/admin/vacation", label: "Vacation", icon: suitcase_light, alt: "Vacation" },
  ] as const;

  const navLinkClassName = "p-4 rounded-lg bg-background hover:bg-background-primary w-full text-start p-4 flex items-start gap-2"

  return (
    <aside className="w-65 h-screen bg-background-secondary p-6 flex flex-col gap-6">
      <h2 className="font-bebas text-2xl text-center">Restaurant CRM</h2>
      <hr className="border-0.25 border-border-color" />
      <nav className="flex flex-col gap-2 justify-center items-center border-box">
        {navLinks.map((item) => (
          <Link key={item.to} to={item.to} className={navLinkClassName}>
            <img src={item.icon} alt={item.alt} className="w-6 h-6" />
            {item.label}
          </Link>
        ))}
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
