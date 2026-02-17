import React from 'react'

export default function GptSearchBar() {
  return (
    <div className="pt-[5%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12">
            <input type="text" name="" id="" placeholder='What would you like to watch today?' className='p-4 m-4 col-span-9'/>
            <button className='px-4 py-2 bg-red-700 text-white rounded-lg col-span-3 m-4'>Search</button>
        </form>
    </div>
  )
}
