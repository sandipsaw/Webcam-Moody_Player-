import React from 'react'
import FacialExpression from './components/FacialExpression'
import Moodsongs from './components/Moodsongs'
import { useState } from 'react'
const App = () => {
  const [songs, setsongs] = useState([
      
    ])
  return (
    <div className='w-screen h-screen overflow-auto bg-gray-600 flex flex-col lg:flex lg:flex-row gap-10 p-5'>  
      <FacialExpression setsongs={setsongs} />
      <Moodsongs songs={songs}/>
    </div>
  )
}

export default App