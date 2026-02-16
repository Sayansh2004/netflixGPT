import Moviecard from "./Moviecard"

export default function MovieList({title,movies}) {
    console.log(movies)
  return (
    <div>
        <div>
            <h1>{title}</h1>
            <div>
                  <Moviecard></Moviecard>
            </div>
        </div>
      
    </div>
  )
}
