import Moviecard from "./Moviecard"

export default function MovieList({title,movies}) {
    console.log(movies)
  return (
    <div>
        <div className="px-6 bg-black">
            <h1 className="text-3xl font-bold py-4 text-white">{title}</h1>
            <div className="flex">
              {movies?.map((movie)=>(<Moviecard key={movie.id} posterPath={movie.poster_path}/>))}
                 
            </div>
        </div>
      
    </div>
  )
}
