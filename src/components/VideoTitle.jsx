

export default function VideoTitle({title,overview}) {
  return (
    <div className='w-screen aspect-video pt-[20%] px-36 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='p-6 text-lg w-1/4'>{overview}</p>
        <div>
            <button className='bg-white text-black p-4 px-12 text-lg  rounded-lg hover:bg-opacity-50'>Play</button>
            <button className='bg-white text-black mx-2 p-4 px-12 text-lg  rounded-lg hover:bg-opacity-50'>More Info</button>
        </div>
    </div>
  )
}
