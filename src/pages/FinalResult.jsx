import React from 'react'
import PropTypes from 'prop-types'

const FinalResult = ({score , onReset}) => {
  return (
    <div>
        <div id="final_score">Your Score is {score} </div>
        <button id="btn_new" onClick={onReset}>New Game</button>
    </div>
  )
}


export default FinalResult