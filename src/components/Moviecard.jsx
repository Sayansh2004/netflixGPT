import { IMG_CDN_URL } from "../utils/constants"

export default function Moviecard({posterPath}) {
  return (
    <div>
      <img src={`${IMG_CDN_URL}${posterPath}`} alt="Movie card" className="rounded-lg hover:scale-110 transition-transform duration-300"/>
    </div>
  )
}
