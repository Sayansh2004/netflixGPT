

export default function VideoTitle({title,overview}) {
  return (
    <div className='pt-36 px-12'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='p-6 text-lg w-1/4'>{overview}</p>
        <div>
            <button className='bg-gray-500 text-white p-4 px-12 text-lg bg-opacity-50 rounded-lg'>▶️Play</button>
            <button className='bg-gray-500 text-white mx-2 p-4 px-12 text-lg bg-opacity-50 rounded-lg'>More Info</button>
        </div>
    </div>
  )
}
