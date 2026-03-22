import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import VideoCard from '../components/VideoCard';
import ArticleCard from '../components/ArticleCard';

const CATEGORIES = ['All', 'Politics', 'Technology', 'Sports', 'Entertainment', 'Business', 'Health', 'World'];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ticker] = useState([
    'ब्रेकिंग न्यूज़: भारत की बड़ी खबरें',
    'राज़-ए-भारत पर देखें देश का सच',
    'राजनीति, अर्थव्यवस्था, रक्षा - सब कुछ यहाँ',
    'अभी सब्सक्राइब करें - Raaz-e-Bharat YouTube',
  ]);

  useEffect(() => {
    fetchVideos();
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchVideos = async () => {
    try {
      const res = await api.get('/youtube/videos?maxResults=12');
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setVideoLoading(false);
    }
  };

  const fetchArticles = async () => {
    setArticleLoading(true);
    try {
      const params = { limit: 8 };
      if (selectedCategory !== 'All') params.category = selectedCategory;
      const res = await api.get('/articles', { params });
      setArticles(res.data.articles || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setArticleLoading(false);
    }
  };

  // Featured (first) video and remaining 5 = total 6 on homepage
  const featuredVideo = videos.length > 0 ? videos[0] : null;
  const gridVideos = videos.slice(1, 6);

  return (
    <div className="pt-16">
      {/* News Ticker */}
      <div className="bg-primary/10 border-b border-primary/20 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-primary text-white text-xs font-bold px-4 py-2 z-10">
            LIVE
          </div>
          <div className="overflow-hidden flex-1 py-2">
            <div className="ticker-animation text-gray-300 text-sm px-4">
              {ticker.join('  •  ')}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dark via-dark-card to-dark py-16 md:py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(217,119,6,0.1),_transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary text-sm font-medium">भारत की सच्ची खबरें</span>
            </div>
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="Raaz-e-Bharat" className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl shadow-primary/20" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">Raaz</span>-e-<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Bharat</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-hindi mb-2">राज़-ए-भारत</p>
            <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm md:text-base">
              Unbiased news, deep analysis, and breaking stories from across India — all in one place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <a href="#videos" className="btn-primary flex items-center gap-2 text-sm md:text-base">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Videos
              </a>
              <a
                href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 text-sm md:text-base"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURED VIDEO ===== */}
      {!videoLoading && featuredVideo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <h2 className="section-title mb-6">Featured Video</h2>
          <Link to={`/video/${featuredVideo.id}`} className="group block">
            <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-dark-muted">
                  <img
                    src={featuredVideo.thumbnail || `https://img.youtube.com/vi/${featuredVideo.id}/hqdefault.jpg`}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-2xl">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="badge-red mb-3 w-fit text-xs">LATEST</span>
                  <h3 className="text-white text-xl md:text-2xl font-bold leading-snug group-hover:text-primary transition-colors mb-3">
                    {featuredVideo.title}
                  </h3>
                  {featuredVideo.description && (
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">{featuredVideo.description}</p>
                  )}
                  <div className="text-gray-500 text-sm">
                    {featuredVideo.channelTitle || 'Raaz E Bharat'}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ===== LATEST VIDEOS (max 5 cards) ===== */}
      <section id="videos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Latest Videos</h2>
          <Link
            to="/videos"
            className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors"
          >
            See All Videos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>



        {videoLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-video bg-dark-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-dark-muted rounded" />
                  <div className="h-3 bg-dark-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : gridVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {gridVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            {/* See More Button */}
            {videos.length > 6 && (
              <div className="text-center mt-8">
                <Link to="/videos" className="btn-outline inline-flex items-center gap-2">
                  See More Videos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            No videos found
          </div>
        )}
      </section>

      {/* ===== ARTICLES SECTION (unchanged logic) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Latest Articles</h2>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-2 -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-transparent border-dark-border text-gray-400 hover:border-primary/50 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {articleLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-dark-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-dark-muted rounded" />
                  <div className="h-3 bg-dark-muted rounded" />
                  <div className="h-3 bg-dark-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dark-border rounded-xl">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">No articles available</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
