import { IMG_CDN_URL } from "../utils/constants";

export default function MovieCard({ posterPath }) {
  
  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-48 flex-shrink-0 cursor-pointer">
      <img 
        src={`${IMG_CDN_URL}${posterPath}`} 
        alt="Movie card" 
        className="rounded-lg object-cover w-full h-full hover:scale-105 transition-transform duration-300 shadow-md"
      />
    </div>
  );
}