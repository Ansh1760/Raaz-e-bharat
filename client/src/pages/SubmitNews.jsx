import { useState } from 'react';
import toast from 'react-hot-toast';

const SubmitNews = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xpzvgkqe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Submission sent successfully!');
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(220,38,38,0.1),_transparent_60%)]" />
        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="gradient-text">Submit</span> News
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            कोई खबर या जानकारी हमसे साझा करें — Submit news tips, stories, or reach out to us.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        {submitted ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-400 mb-6">Your submission has been received. We'll review it shortly.</p>
            <button onClick={() => setSubmitted(false)} className="btn-primary">
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="card p-6 md:p-8 space-y-5">
              <h2 className="text-white text-lg font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact / Submit News
              </h2>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="आपका नाम"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">News / Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="अपनी खबर या संदेश यहाँ लिखें..."
                  rows={6}
                  className="input-field resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default SubmitNews;
