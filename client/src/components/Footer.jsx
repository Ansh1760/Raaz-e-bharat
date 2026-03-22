import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Raaz-e-Bharat" className="w-12 h-12 rounded-full shadow-lg" />
              <div>
                <div className="text-white font-bold text-lg">Raaz-e-Bharat</div>
                <div className="text-gray-500 text-sm font-hindi">राज़-ए-भारत</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              भारत की सच्ची खबरें, निष्पक्ष विश्लेषण और ताज़ा समाचार। देश की हर बड़ी घटना पर हमारी पैनी नज़र।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-primary transition-colors text-sm">All Videos</Link></li>
              <li><Link to="/submit-news" className="text-gray-400 hover:text-primary transition-colors text-sm">Submit News</Link></li>
              <li><Link to="/join-us" className="text-gray-400 hover:text-primary transition-colors text-sm">Join Our Team</Link></li>
              <li><Link to="/admin/login" className="text-gray-400 hover:text-primary transition-colors text-sm">Admin Panel</Link></li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">External</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="https://www.youtube.com/@raaz.ebharat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  YouTube Channel
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/raazebharat/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Subscribe */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3 flex-wrap">
              {/* YouTube */}
              <a href="https://www.youtube.com/@raaz.ebharat" target="_blank" rel="noopener noreferrer" title="YouTube"
                className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/raazebharat/" target="_blank" rel="noopener noreferrer" title="Instagram"
                className="w-10 h-10 bg-pink-500/10 border border-pink-500/20 rounded-lg flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" title="Facebook"
                className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-lg flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.774-.773 1.774-1.729v-20.542c0-.955-.796-1.729-1.774-1.729z" /></svg>
              </a>
              {/* Email */}
              <a href="mailto:raazebharaat@gmail.com" title="Email"
                className="w-10 h-10 bg-gray-500/10 border border-gray-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-500 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <a
                href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                Subscribe Now
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Raaz-e-Bharat. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></span>
            <span>Live Updates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
