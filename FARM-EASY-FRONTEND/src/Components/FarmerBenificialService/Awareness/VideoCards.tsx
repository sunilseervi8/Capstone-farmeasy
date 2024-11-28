import {useState,useEffect} from 'react';
import axios from 'axios';
import Spinner from '../../Features/Spinner/Spinner';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
} 

const YouTubeVideos: React.FC<{ query: string }> = ({ query }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = 'AIzaSyDbFlkpcjNmV9BujnJACvnz-87as8Q4a9Y'; 
  const maxResults = 50;
  useEffect(() => {
    // Fetch videos from the YouTube API
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${API_KEY}`
        );
        setVideos(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query]);

  return (
    <div className="container mx-3 py-6">
      {loading ? (
        <Spinner imageUrl = "Videos/Spinner4.gif" altText = "Loading content..."/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{video.snippet.title}</h3>
              <p className="text-gray-600">{video.snippet.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-txt-blue hover:text-txt-blue"
              >
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default YouTubeVideos;