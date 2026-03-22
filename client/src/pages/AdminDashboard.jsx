import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const CATEGORIES = ['General', 'Politics', 'Technology', 'Sports', 'Entertainment', 'Business', 'Health', 'World'];

const emptyForm = { title: '', description: '', content: '', category: 'General', author: 'Raaz-e-Bharat', image: null };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'form'
  const [stats, setStats] = useState({ total: 0, categories: {} });
  const fileRef = useRef(null);
  const adminUser = JSON.parse(localStorage.getItem('raaz_admin_user') || '{}');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/articles/admin/all');
      const list = res.data.articles || [];
      setArticles(list);
      // Compute stats
      const cats = {};
      list.forEach((a) => { cats[a.category] = (cats[a.category] || 0) + 1; });
      setStats({ total: list.length, categories: cats });
    } catch (err) {
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setForm({ ...form, image: file });
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error('Title and description are required');
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('content', form.content);
      formData.append('category', form.category);
      formData.append('author', form.author);
      if (form.image instanceof File) {
        formData.append('image', form.image);
      }

      if (editId) {
        await api.put(`/articles/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Article updated successfully!');
      } else {
        await api.post('/articles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Article published!');
      }
      resetForm();
      setActiveTab('list');
      fetchArticles();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (article) => {
    setEditId(article._id);
    setForm({
      title: article.title,
      description: article.description,
      content: article.content || '',
      category: article.category,
      author: article.author,
      image: null,
    });
    setImagePreview(article.image || null);
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/articles/${id}`);
      toast.success('Article deleted');
      setDeleteConfirm(null);
      fetchArticles();
    } catch {
      toast.error('Failed to delete article');
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImagePreview(null);
    setEditId(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleLogout = () => {
    localStorage.removeItem('raaz_admin_token');
    localStorage.removeItem('raaz_admin_user');
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome back, <span className="text-primary font-medium">{adminUser.username || 'Admin'}</span></p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { resetForm(); setActiveTab('form'); }}
              id="new-article-btn"
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </button>
            <button
              onClick={handleLogout}
              className="border border-dark-border text-gray-400 hover:text-white hover:border-dark-muted px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-card border border-dark-border rounded-xl p-4">
            <div className="text-3xl font-black text-white">{stats.total}</div>
            <div className="text-gray-500 text-sm mt-1">Total Articles</div>
          </div>
          {Object.entries(stats.categories).slice(0, 3).map(([cat, count]) => (
            <div key={cat} className="bg-dark-card border border-dark-border rounded-xl p-4">
              <div className="text-3xl font-black text-primary">{count}</div>
              <div className="text-gray-500 text-sm mt-1">{cat}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-dark-border mb-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'list' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
            }`}
          >
            Articles List
          </button>
          <button
            onClick={() => { resetForm(); setActiveTab('form'); }}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'form' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
            }`}
          >
            {editId ? 'Edit Article' : 'New Article'}
          </button>
        </div>

        {/* Article Form */}
        {activeTab === 'form' && (
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 animate-fade-in">
            <h2 className="text-white text-lg font-semibold mb-6">
              {editId ? 'Edit Article' : 'Create New Article'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Title *</label>
                  <input
                    type="text"
                    id="article-title"
                    placeholder="Enter article title..."
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Category</label>
                  <select
                    id="article-category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Author</label>
                  <input
                    type="text"
                    id="article-author"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Description / Summary *</label>
                  <textarea
                    id="article-description"
                    placeholder="Short summary of the article..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="input-field resize-none"
                    required
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Full Content</label>
                  <textarea
                    id="article-content"
                    placeholder="Full article content..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={8}
                    className="input-field resize-y"
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">
                    Article Image <span className="text-gray-500">(max 5MB, JPEG/PNG/WebP)</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-dark-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setImagePreview(null); setForm({ ...form, image: null }); if (fileRef.current) fileRef.current.value = ''; }}
                          className="absolute top-2 right-2 bg-dark/80 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mx-auto text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-500 text-sm">Click to upload image</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    id="article-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  id="submit-article-btn"
                  disabled={submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </>
                  ) : editId ? 'Update Article' : 'Publish Article'}
                </button>
                <button
                  type="button"
                  onClick={() => { resetForm(); setActiveTab('list'); }}
                  className="border border-dark-border text-gray-400 hover:text-white px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        {activeTab === 'list' && (
          <div className="animate-fade-in">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-4 animate-pulse flex gap-4">
                    <div className="w-16 h-16 bg-dark-muted rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-dark-muted rounded w-2/3" />
                      <div className="h-3 bg-dark-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16 border border-dark-border rounded-xl">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 mb-4">No articles yet</p>
                <button onClick={() => setActiveTab('form')} className="btn-primary text-sm">
                  Create First Article
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {articles.map((article) => (
                  <div
                    key={article._id}
                    className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center gap-4 hover:border-dark-muted transition-colors"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 bg-dark-muted rounded-lg overflow-hidden flex-shrink-0">
                      {article.image ? (
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">{article.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 bg-dark-border px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {new Date(article.createdAt).toLocaleDateString('en-IN')}
                        </span>
                        {!article.isPublished && (
                          <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                            Draft
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-gray-400 hover:text-primary p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(article._id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up">
            <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold text-center mb-2">Delete Article?</h3>
            <p className="text-gray-400 text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-dark-border text-gray-300 hover:text-white py-2.5 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                id="confirm-delete-btn"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
