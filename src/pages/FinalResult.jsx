import React from 'react'
import './finalresult.css'

const FinalResult = ({score , onReset}) => {
  return (
    <div className='w-full relative'>
        <div id="final_score">Your Score is <span className='text-cyan-400'>{score}</span> </div>
        <button id="btn_new" onClick={onReset}>New Game</button>
    </div>
  )
}


export default FinalResult