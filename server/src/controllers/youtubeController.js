const axios = require('axios');

// ===== HARDCODED CHANNEL ID (saves API quota) =====
// This is the Raaz-e-Bharat YouTube channel: https://www.youtube.com/@raaz.ebharat
const RAAZ_E_BHARAT_CHANNEL_ID = 'UCEQSxkLaXCFS-Xzh1nZUMrw';

// Helper: parse ISO 8601 duration to seconds
const parseDuration = (duration) => {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
};

// Helper: Fetch full video details and filter out shorts (< 60 seconds)
const getFilteredVideos = async (videoIds, apiKey) => {
  if (!videoIds.length) return [];

  const resp = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'contentDetails,snippet,statistics',
      id: videoIds.join(','),
      key: apiKey,
    },
  });

  return resp.data.items
    .filter((v) => parseDuration(v.contentDetails.duration) > 60) // Filter shorts
    .map((v) => ({
      id: v.id,
      title: v.snippet.title,
      description: v.snippet.description?.slice(0, 300) || '',
      thumbnail:
        v.snippet.thumbnails?.maxres?.url ||
        v.snippet.thumbnails?.high?.url ||
        v.snippet.thumbnails?.medium?.url ||
        `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
      publishedAt: v.snippet.publishedAt,
      channelTitle: v.snippet.channelTitle,
      viewCount: v.statistics?.viewCount || '0',
      likeCount: v.statistics?.likeCount || '0',
      duration: v.contentDetails.duration,
    }));
};

// @desc   Get videos from Raaz-e-Bharat channel
// @route  GET /api/youtube/videos
// @access Public
const getVideos = async (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const maxResults = Math.min(parseInt(req.query.maxResults) || 12, 50);

  // Return mock data if API key not configured
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
    return res.json({
      success: true,
      videos: getMockVideos(),
    });
  }

  try {
    const channelId = RAAZ_E_BHARAT_CHANNEL_ID;

    // ===== Step 2: Fetch latest videos from channel =====
    const searchResp = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'id',
        channelId: channelId,
        type: 'video',
        order: 'date',
        maxResults: Math.min(maxResults + 15, 50), // Overfetch to compensate for shorts filtering
        key: apiKey,
      },
    });



    const videoIds = (searchResp.data.items || [])
      .map((item) => item.id?.videoId)
      .filter(Boolean);

    if (!videoIds.length) {
      return res.json({ success: true, videos: [] });
    }

    // Get full details + filter shorts
    const longVideos = await getFilteredVideos(videoIds, apiKey);
    const videos = longVideos.slice(0, maxResults);

    res.json({
      success: true,
      videos,
      isMock: false,
      totalFound: videoIds.length,
      shortsFiltered: videoIds.length - longVideos.length,
      channelId,
    });
  } catch (error) {
    const errData = error.response?.data?.error;
    const errMsg = errData?.message || error.message;
    const errCode = errData?.code;
    const errReason = errData?.errors?.[0]?.reason || '';

    console.error(`YouTube API error: ${errMsg}`);

    // Gracefully fallback to mock data on any error
    res.json({
      success: true,
      videos: getMockVideos(),
    });
  }
};

// Fallback videos using real Raaz-e-Bharat channel video IDs
const getMockVideos = () => [
  {
    id: '87frJSi8Mek',
    title: 'Raaz-e-Bharat | राज़-ए-भारत | Latest Episode',
    description: 'राज़-ए-भारत का नया एपिसोड, देखिए भारत के अनसुने राज़',
    thumbnail: 'https://img.youtube.com/vi/87frJSi8Mek/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    channelTitle: 'Raaz E Bharat',
    viewCount: '0',
    likeCount: '0',
    duration: 'PT10M30S',
  },
  {
    id: 'nKK-f9vckoc',
    title: 'Raaz-e-Bharat | भारत की अनकही कहानियाँ',
    description: 'भारत की अनकही कहानियाँ और अनसुने सच',
    thumbnail: 'https://img.youtube.com/vi/nKK-f9vckoc/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    channelTitle: 'Raaz E Bharat',
    viewCount: '0',
    likeCount: '0',
    duration: 'PT12M15S',
  },
  {
    id: 'Q-RQ8zJnfkQ',
    title: 'Raaz-e-Bharat | समाज और संस्कृति',
    description: 'भारतीय समाज और संस्कृति पर गहरी नज़र',
    thumbnail: 'https://img.youtube.com/vi/Q-RQ8zJnfkQ/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    channelTitle: 'Raaz E Bharat',
    viewCount: '0',
    likeCount: '0',
    duration: 'PT8M45S',
  },
  {
    id: '7s61lGrS2Rw',
    title: 'Raaz-e-Bharat | इतिहास के पन्नों से',
    description: 'इतिहास के वो पन्ने जिन्हें किताबों में जगह नहीं मिली',
    thumbnail: 'https://img.youtube.com/vi/7s61lGrS2Rw/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    channelTitle: 'Raaz E Bharat',
    viewCount: '0',
    likeCount: '0',
    duration: 'PT15M20S',
  },
  {
    id: 'YILEhs6Sp2Y',
    title: 'Raaz-e-Bharat | भारत के अनसुने राज़',
    description: 'देश की सुरक्षा और रक्षा पर महत्वपूर्ण रिपोर्ट',
    thumbnail: 'https://img.youtube.com/vi/YILEhs6Sp2Y/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    channelTitle: 'Raaz E Bharat',
    viewCount: '0',
    likeCount: '0',
    duration: 'PT11M10S',
  },
  {
    id: 'YFkJACqx24c',
    title: 'Raaz-e-Bharat | नई शुरुआत',
    description: 'राज़-ए-भारत की नई शुरुआत, जुड़िए हमारे साथ',
    thumbnail: 'https://img.youtube.com/vi/YFkJACqx24c/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    channelTitle: 'Raaz E Bharat',
    viewCount: '0',
    likeCount: '0',
    duration: 'PT9M55S',
  },
];

module.exports = { getVideos };
