import { useState, useEffect } from 'react';
import api from '../api/axios';
import VideoCard from '../components/VideoCard';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/youtube/videos?maxResults=50');
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="pt-16 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark via-dark-card to-dark py-12 px-4 border-b border-dark-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="gradient-text">All</span> Videos
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            सभी वीडियो देखें — Raaz-e-Bharat YouTube Channel से
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-video bg-dark-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-dark-muted rounded" />
                  <div className="h-3 bg-dark-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No videos found</p>
            <a
              href="https://www.youtube.com/@raaz.ebharat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Visit our YouTube Channel →
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllVideos;
