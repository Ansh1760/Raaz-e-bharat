import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import VideoCard from '../components/VideoCard';

const BATCH_SIZE = 12;

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchVideos = useCallback(async (pageToken = null) => {
    try {
      const params = new URLSearchParams({ maxResults: BATCH_SIZE });
      if (pageToken) params.append('pageToken', pageToken);

      const res = await api.get(`/youtube/videos?${params.toString()}`);
      const newVideos = res.data.videos || [];
      const token = res.data.nextPageToken || null;

      if (pageToken) {
        setVideos((prev) => [...prev, ...newVideos]);
      } else {
        setVideos(newVideos);
      }
      setNextPageToken(token);
      setHasMore(!!token);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
      setError('Failed to load videos. Please try again.');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchVideos();
      setLoading(false);
    };
    init();
  }, [fetchVideos]);

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    await fetchVideos(nextPageToken);
    setLoadingMore(false);
  };

  return (
    <div className="pt-16 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-dark via-dark-card to-dark py-12 px-4 border-b border-dark-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(220,38,38,0.12),_transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="gradient-text">All</span> Videos
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            सभी वीडियो देखें — Raaz-e-Bharat YouTube Channel से
          </p>
          {videos.length > 0 && (
            <span className="inline-block mt-3 text-xs text-gray-500 bg-dark-border px-3 py-1 rounded-full">
              {videos.length} long videos loaded
            </span>
          )}
        </div>
      </div>

      {/* Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(BATCH_SIZE)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-video bg-dark-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-dark-muted rounded" />
                  <div className="h-3 bg-dark-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => { setLoading(true); fetchVideos().then(() => setLoading(false)); }}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="btn-outline flex items-center gap-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading more...
                    </>
                  ) : (
                    <>
                      Load More Videos
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}

            {!hasMore && videos.length > 0 && (
              <p className="text-center text-gray-600 text-sm mt-8">
                All videos loaded ✓
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">No long videos found</p>
            <p className="text-sm mt-1 text-gray-600">Check back soon for new content</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllVideos;
