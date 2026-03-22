import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    fetchVideos();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/youtube/videos?maxResults=20');
      const all = res.data.videos || [];
      const current = all.find((v) => v.id === id);
      const related = all.filter((v) => v.id !== id).slice(0, 8);
      setVideoInfo(current || null);
      setRelatedVideos(related);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatViews = (count) => {
    const n = parseInt(count || 0);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${Math.floor(n / 1000)}K`;
    return String(n);
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-dark-card rounded-xl animate-pulse" />
              <div className="mt-4 space-y-3">
                <div className="h-6 bg-dark-card rounded animate-pulse" />
                <div className="h-4 bg-dark-card rounded w-1/2 animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-32 h-20 bg-dark-card rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-dark-card rounded" />
                    <div className="h-3 bg-dark-card rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2">
            {/* YouTube Embed */}
            <div className="video-container rounded-xl overflow-hidden shadow-2xl shadow-black/50 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
                title={videoInfo?.title || 'Raaz-e-Bharat Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="mt-5">
              <h1 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3">
                {videoInfo?.title || 'Video'}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {videoInfo?.channelTitle || 'Raaz-e-Bharat'}
                    </div>
                    {videoInfo?.viewCount && parseInt(videoInfo.viewCount) > 0 && (
                      <div className="text-gray-500 text-xs">{formatViews(videoInfo.viewCount)} views</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {videoInfo?.publishedAt && (
                    <span className="text-gray-500 text-sm">{formatDate(videoInfo.publishedAt)}</span>
                  )}
                  <a
                    href="https://www.youtube.com/@raaz.ebharat?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Subscribe
                  </a>
                </div>
              </div>

              {/* Description */}
              {videoInfo?.description && (
                <div className="mt-4 bg-dark-card rounded-xl p-4 border border-dark-border">
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line line-clamp-4">
                    {videoInfo.description}
                  </p>
                </div>
              )}

              {/* External link */}
              <div className="mt-4">
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div>
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">More Videos</h2>
            <div className="space-y-3">
              {relatedVideos.map((video) => (
                <Link
                  key={video.id}
                  to={`/video/${video.id}`}
                  className="flex gap-3 group hover:bg-dark-card p-2 rounded-xl transition-colors"
                >
                  <div className="relative w-32 h-20 bg-dark-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {video.title}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">{video.channelTitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
