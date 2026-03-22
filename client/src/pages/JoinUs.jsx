import { useState } from 'react';
import toast from 'react-hot-toast';

const ROLES = [
  { value: '', label: 'Select a role...' },
  { value: 'Video Editor', label: 'Video Editor' },
  { value: 'Content Writer', label: 'Content Writer / Reporter' },
  { value: 'Social Media Manager', label: 'Social Media Manager' },
  { value: 'Graphic Designer', label: 'Graphic Designer' },
  { value: 'Research Analyst', label: 'Research / Analyst' },
  { value: 'Voiceover Artist', label: 'Voiceover Artist' },
  { value: 'Other', label: 'Other' },
];

const JoinUs = () => {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xpzvgkqe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'Job Application' }),
      });
      if (res.ok) {
        toast.success('Application submitted!');
        setSubmitted(true);
        setForm({ name: '', email: '', role: '', message: '' });
      } else {
        toast.error('Failed to submit. Try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark via-dark-card to-dark py-12 px-4 border-b border-dark-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,119,6,0.1),_transparent_60%)]" />
        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="gradient-text">Join</span> Our Team
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            हमारी टीम का हिस्सा बनें — Be part of the Raaz-e-Bharat family!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — Why Join */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">Why Join Raaz-e-Bharat?</h2>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { icon: '🎥', text: 'Work on impactful video content about India' },
                { icon: '📈', text: 'Grow your portfolio with a rising YouTube channel' },
                { icon: '🤝', text: 'Collaborate with passionate creators' },
                { icon: '💡', text: 'Creative freedom and flexible schedule' },
                { icon: '🌍', text: 'Tell stories that matter' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mt-8 mb-3">Open Roles</h3>
            <div className="flex flex-wrap gap-2">
              {ROLES.filter(r => r.value).map(r => (
                <span key={r.value} className="badge bg-primary/10 text-primary border border-primary/20 text-xs">
                  {r.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Application Received!</h3>
                <p className="text-gray-400 text-sm mb-4">We'll get back to you soon. Thank you for your interest!</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                  Apply for Another Role
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4">
                <h2 className="text-white text-lg font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Apply Now
                </h2>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="input-field" required />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-field" required />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">Role Interest *</label>
                  <select name="role" value={form.role} onChange={handleChange} className="input-field" required>
                    {ROLES.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">Why do you want to join? (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about yourself..." rows={4} className="input-field resize-none" />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
