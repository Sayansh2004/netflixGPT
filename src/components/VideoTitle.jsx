export default function VideoTitle({ title, overview }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full 
                    bg-gradient-to-r from-black via-black/70 to-transparent
                    flex flex-col justify-center px-20 text-white">

      <h1 className="text-6xl font-bold mb-4">{title}</h1>

      <p className="w-1/3 text-lg mb-6">
        {overview}
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80">
          ▶ Play
        </button>

        <button className="bg-gray-500 bg-opacity-70 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
}
