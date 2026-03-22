import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('raaz_admin_token');
    setIsAdmin(!!token);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('raaz_admin_token');
    localStorage.removeItem('raaz_admin_user');
    setIsAdmin(false);
    navigate('/');
  };

  const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/videos', label: 'Videos' },
    { to: '/submit-news', label: 'Submit News' },
    { to: '/join-us', label: 'Join Us' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-card/95 backdrop-blur-md border-b border-dark-border shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Raaz-e-Bharat" className="w-10 h-10 rounded-full shadow-lg group-hover:shadow-primary/40 transition-shadow" />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-none">Raaz-e-Bharat</div>
              <div className="text-gray-400 text-xs font-hindi">राज़-ए-भारत</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} label={link.label} active={location.pathname === link.to} />
            ))}
            {isAdmin && <NavLink to="/admin/dashboard" label="Dashboard" active={location.pathname.includes('/admin/dashboard')} />}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe
            </a>
            {isAdmin ? (
              <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition-colors px-3 py-2">
                Logout
              </button>
            ) : (
              <Link to="/admin/login" className="text-gray-400 hover:text-white text-sm transition-colors px-3 py-2">
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-dark-border transition-colors"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-[400px] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-dark-border pt-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <MobileNavLink key={link.to} to={link.to} label={link.label} active={location.pathname === link.to} />
            ))}
            {isAdmin && <MobileNavLink to="/admin/dashboard" label="Dashboard" active={location.pathname.includes('/admin/dashboard')} />}
            <a
              href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary font-semibold px-3 py-2.5 rounded-lg hover:bg-dark-border transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
            {isAdmin ? (
              <button onClick={handleLogout} className="text-left text-gray-400 px-3 py-2.5 rounded-lg hover:bg-dark-border hover:text-white transition-colors text-sm">
                Logout
              </button>
            ) : (
              <MobileNavLink to="/admin/login" label="Admin Login" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:text-white hover:bg-white/5'
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      active ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-white hover:bg-dark-border'
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
