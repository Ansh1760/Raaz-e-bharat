import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('raaz_admin_token');
    localStorage.removeItem('raaz_admin_user');
    setIsAdmin(false);
    navigate('/');
  };

  const NAV_LINKS = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/videos', label: 'Videos', icon: '🎥' },
    { to: '/submit-news', label: 'Submit News', icon: '📰' },
    { to: '/join-us', label: 'Join Us', icon: '🤝' },
  ];

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-dark-card/95 backdrop-blur-xl border-b border-dark-border shadow-2xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Raaz-e-Bharat"
              className="w-10 h-10 rounded-full shadow-lg group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105"
            />
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
            {isAdmin && (
              <NavLink to="/admin/dashboard" label="Dashboard" active={location.pathname.includes('/admin/dashboard')} />
            )}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe
            </a>
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="text-gray-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all duration-200 active:scale-95"
          >
            <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu — Full-width dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/10 bg-dark-card/98 backdrop-blur-xl px-4 pt-3 pb-6">
          {/* Navigation Links */}
          <div className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.to}
                to={link.to}
                label={link.label}
                icon={link.icon}
                active={location.pathname === link.to}
              />
            ))}
            {isAdmin && (
              <MobileNavLink
                to="/admin/dashboard"
                label="Dashboard"
                icon="⚙️"
                active={location.pathname.includes('/admin/dashboard')}
              />
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-3" />

          {/* Subscribe Button */}
          <a
            href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-semibold px-4 py-3.5 rounded-xl transition-all duration-200 text-sm mb-2 active:scale-95"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>

          {/* Admin / Logout */}
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-gray-400 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm"
            >
              <span>🚪</span> Logout
            </button>
          ) : (
            <MobileNavLink to="/admin/login" label="Admin Login" icon="🔐" />
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-primary/20 text-primary shadow-sm shadow-primary/10'
        : 'text-gray-300 hover:text-white hover:bg-white/5'
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, icon, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
      active
        ? 'bg-primary/15 text-primary border border-primary/20'
        : 'text-gray-300 hover:text-white hover:bg-white/8'
    }`}
    style={!active ? {} : {}}
  >
    {icon && <span className="text-base">{icon}</span>}
    {label}
    {active && (
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
    )}
  </Link>
);

export default Navbar;
