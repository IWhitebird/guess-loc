import React, { useEffect, useState } from 'react'
import './finalresult.css'
import Loading from './loader'
import env from "react-dotenv";

const FinalResult = ({ score, onReset, loading, setLoading, rounds }) => {

  const [newScore, setNewScore] = useState(false);

  const updateScore = async () => {
    try {
      const response = await fetch(env.BASE_URL + "/dashboard/storescore", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify({ score }),
      });
      const parseRes = await response.json();
      console.log("ress", parseRes)
      if (parseRes.change) {
        setNewScore(true);
      }
    }
    catch (error) {
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
      <div className='w-full absolute z-50 bottom-[30%]'>
        <div className='flex justify-center items-center '>
          {newScore ? (
            <div id="final_score">New personl best <span className='text-cyan-400'>{score} !!!</span></div>
          ) : (
            score === 0 ? (
              <div>
                <div id="final_score">Final score{" "}
                  <span className='text-cyan-400'>{score}
                  </span>
                  <br />
                  <span>Try harder next time!</span>
                </div>

              </div>
            ) : (
              <div id="final_score">Your Score is <span className='text-cyan-400'>{score}</span></div>
            )
          )}
          <div className='absolute bottom-20'>
            <button className='text-white text-xl bg-lime-500 px-7 py-2 rounded-full transition-all ease-in-out duration-300 hover:border-r-8 hover:border-r-cyan-600 hover:scale-105' onClick={onReset}>Go again?</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default FinalResult