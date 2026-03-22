import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { getImageUrl, formatDate } from '../utils/helpers';

const CATEGORY_COLORS = {
  Politics: 'bg-red-500/20 text-red-400 border-red-500/30',
  Technology: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Sports: 'bg-green-500/20 text-green-400 border-green-500/30',
  Entertainment: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Business: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Health: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  World: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  General: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data.article);
      } catch (err) {
        setError(err.response?.data?.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
          <div className="h-8 bg-dark-card rounded mb-4 w-2/3" />
          <div className="h-4 bg-dark-card rounded mb-2" />
          <div className="h-64 bg-dark-card rounded-xl mb-6" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-dark-card rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-white text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6">{error || 'This article does not exist.'}</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const categoryClass = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.General;

  return (
    <div className="pt-16 min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`badge border font-semibold ${categoryClass}`}>{article.category}</span>
          <span className="text-gray-500 text-sm">{formatDate(article.createdAt)}</span>
          <span className="text-gray-500 text-sm">By {article.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl md:text-4xl font-black leading-tight mb-5">
          {article.title}
        </h1>

        {/* Hero Image */}
        {article.image && (
          <div className="rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-black/50">
            <img
              src={getImageUrl(article.image)}
              alt={article.title}
              className="w-full max-h-96 object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Description */}
        <div className="bg-dark-card border border-primary/20 rounded-xl px-6 py-4 mb-6">
          <p className="text-gray-300 text-lg leading-relaxed font-medium">
            {article.description}
          </p>
        </div>

        {/* Full Content */}
        {article.content && (
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-8 text-base whitespace-pre-line">
              {article.content}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-10 pt-6 border-t border-dark-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">R</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{article.author}</div>
              <div className="text-gray-500 text-xs">Raaz-e-Bharat</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white border border-dark-border hover:border-dark-muted px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
