import { useSelector } from "react-redux";


export default function GptMovieSuggestions() {
  const gpt=useSelector((store)=>store.gpt.gptMovies);
  if(!gpt) return null;
  console.log(gpt);

  return (
    <div className="p-4 m-4 bg-black text-white">
      
    </div>
  )
}
