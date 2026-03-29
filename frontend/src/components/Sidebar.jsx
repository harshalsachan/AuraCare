import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, Users, UserPlus, HeartPulse, LogOut } from 'lucide-react';
import { AuthContext } from './AuthContext'; // 1. Import our brain

const Sidebar = () => {
  // 2. Grab the user and logout function from the global state
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`;

  // Helper function to get initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "DR";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // 3. Handle the actual logout process
  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // This clears the browser memory!
    navigate('/login'); // Send them back to the login screen
  };

  return (
    <aside className="w-64 bg-slate-900 h-full flex flex-col text-slate-200 shadow-xl z-10">
      
      {/* Logo and App Title */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-700">
        <HeartPulse className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold tracking-wide text-white">AuraCare</h1>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/" className={navLinkClasses}>
          <Activity className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/patients" className={navLinkClasses}>
          <Users className="w-5 h-5" />
          <span className="font-medium">Patient Directory</span>
        </NavLink>

        <NavLink to="/add-patient" className={navLinkClasses}>
          <UserPlus className="w-5 h-5" />
          <span className="font-medium">Add Patient</span>
        </NavLink>
      </nav>

      {/* Bottom Profile/Logout Section */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        
        {/* Clickable Profile Card */}
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `block p-3 rounded-lg transition-colors ${isActive ? 'bg-slate-800 border border-slate-600' : 'hover:bg-slate-800 border border-transparent'}`}
        >
          <div className="flex items-center gap-3">
            
            {/* Dynamic Avatar or Initials */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-inner overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                getInitials(user?.name)
              )}
            </div>
            
            <div className="text-sm overflow-hidden">
              {/* Dynamic Name! */}
              <p className="font-medium text-white truncate">{user?.name || "Loading..."}</p>
              <p className="text-slate-400 text-xs truncate">View Profile</p>
            </div>
            
          </div>
        </NavLink>

        {/* Real Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200 w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;