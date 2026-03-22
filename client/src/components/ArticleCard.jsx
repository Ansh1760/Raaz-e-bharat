import { Link } from 'react-router-dom';
import { getImageUrl, timeAgo } from '../utils/helpers';

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



const ArticleCard = ({ article }) => {
  const categoryClass = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.General;

  return (
    <Link to={`/article/${article._id}`} className="group block">
      <div className="card h-full hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-dark-muted flex-shrink-0">
          {article.image ? (
            <img
              src={getImageUrl(article.image)}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-muted to-dark-border">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`badge border text-xs font-semibold ${categoryClass}`}>
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2 flex-1">
            {article.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">
            {article.description}
          </p>
          <div className="flex items-center justify-between text-gray-600 text-xs">
            <span className="text-gray-400 font-medium truncate max-w-24">{article.author}</span>
            <span>{timeAgo(article.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
