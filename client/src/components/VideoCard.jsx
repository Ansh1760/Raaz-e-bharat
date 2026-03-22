import { Link } from 'react-router-dom';
import { formatDuration, formatViews, timeAgo } from '../utils/helpers';


const VideoCard = ({ video }) => {
  const duration = formatDuration(video.duration);
  const views = formatViews(video.viewCount);
  const ago = timeAgo(video.publishedAt);
  const hasViews = parseInt(video.viewCount || 0) > 0;

  return (
    <Link to={`/video/${video.id}`} className="group block">
      <div className="card hover:-translate-y-1 transition-transform duration-300">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-dark-muted">
          <img
            src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
            }}
          />
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-14 h-14 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-xl">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
              {duration}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {video.title}
          </h3>
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-medium text-gray-400">{video.channelTitle || 'Raaz-e-Bharat'}</span>
            <div className="flex items-center gap-2">
              {hasViews && <span>{views}</span>}
              <span>•</span>
              <span>{ago}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
