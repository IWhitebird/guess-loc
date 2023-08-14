import React, { useEffect , useState } from 'react'
import './finalresult.css'

const FinalResult = ({score , onReset}) => {
 
  const [newScore , setNewScore] = useState(0);

  useEffect(() => {


    const updateScore = async () => {
      try{
        const response = await fetch("/dashboard/storescore", {
          method: "PUT",
          headers: { jwt_token: localStorage.token },
          body: JSON.stringify({ score }),
        });
        const parseRes = await response.json();
        if(parseRes.newScore){
          setNewScore(1);
        }
        console.log(parseRes);
      }
      catch(error){
        console.error("Error while updating score:", error);
      }
    }
    updateScore();
  } , []);


  return (
    <div className='w-full relative'>
        {
          newScore ? 
            <div id="final_score">Your New Best is <span className='text-cyan-400'>{score} !!!</span></div> 
          : 
            <div id="final_score">Your Score is <span className='text-cyan-400'>{score}</span> </div>
        }
        <button id="btn_new" onClick={onReset}>New Game</button>
    </div>
  )
}


export default FinalResult