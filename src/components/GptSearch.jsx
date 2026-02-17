import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

export default function GptSearch() {
  return (
    <div>
         <div className="absolute -z-10">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4371a395-0e42-46ae-be36-5755eebc638b/web/IN-en-20260209-TRIFECTA-perspective_3a6d8659-ddfe-4547-9584-dce64c02c230_medium.jpg" alt="bg-image" /></div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
  )
}
