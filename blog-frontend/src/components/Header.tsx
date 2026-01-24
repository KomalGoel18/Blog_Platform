import { NavLink } from 'react-router-dom';

export function Header() {
  const linkClass =
    'px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600';
  const activeClass =
    'px-3 py-2 text-sm font-semibold text-blue-600 border-b-2 border-blue-600';

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
            📘 BlogPlatform
          </div>

          <nav className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Posts Showcase
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Analytics
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
