import React, { useEffect , useState } from 'react'
import './finalresult.css'
import Loading from './loader'
import env from "react-dotenv";

const FinalResult = ({score , onReset , loading , setLoading , rounds}) => {
 
  const [newScore , setNewScore] = useState(false);
  
  const updateScore = async () => {
    try{
      const response = await fetch( env.BASE_URL + "/dashboard/storescore", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify({ score }),
      });
      const parseRes = await response.json();
      console.log("ress" , parseRes)
      if(parseRes.change){
        setNewScore(true);
      }
    }
    catch(error){
      console.error("Error while updating score:", error);
    }
  }

  useEffect(() => {
    if (rounds === 0) {
      setLoading(true);
      updateScore();
      setLoading(false);
    }
  }, [rounds]);


  return (

    <>
    {
      loading && <Loading />
    }

    <div className='w-full relative'>
        {
          newScore ? 
            <div id="final_score">Your New Best is <span className='text-cyan-400'>{score} !!!</span></div> 
          : 
            <div id="final_score">Your Score is <span className='text-cyan-400'>{score}</span> </div>
        }
        <button id="btn_new" onClick={onReset}>New Game</button>
    </div>
    </>

  )
}


export default FinalResult