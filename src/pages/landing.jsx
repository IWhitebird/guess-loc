import React from 'react'
import image from '../assets/earth.png'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='flex bg-sky-300 w-[100vw] h-[100vh] overflow-hidden'>
        
        <div className =  'bg-slate-50 w-[50%] h-[100%] relative'>
            <div className='absolute left-4 text-5xl text-pink-400 top-4'>GeoQuiz</div>
            <img src={image} className = 'bg-fit w-full h-full '/>
                <div className='absolute bottom-[40px] right-[40px]'>

                <Link to="/login" className="button button--piyo">
                    <div className="button__wrapper">
                        <span className="button__text">ENTRY</span>
                    </div>
                    <div className="characterBox">
                        <div className="character wakeup">
                            <div className="character__face"></div>
                        </div>
                        <div className="character wakeup">
                            <div className="character__face"></div>
                        </div>
                        <div className="character">
                            <div className="character__face"></div>
                        </div>
                    </div>
                </Link>

                </div>
        </div>

        <div className = 'bg-sky-950 w-[45%] h-[95%] rounded-md mt-8 ml-12 mb-2 '>
            <div className='text-white w-[80%] mx-auto mt-[10%] '>
                <h1 className='text-6xl font-semibold text-lime-400'>How to play...</h1>
                <ul className='p-4 text-xl' style={{ listStyleType: 'disc' }}>
                    <li className='p-3'>You will be given a random street view and you need to guess it within limited time.</li>
                    <li className='p-3'>The more close your guess is more the points you will earn.</li>
                    <li className='p-3'>You will have 5 rounds after 5 rounds your max score will be determined.</li>
                    <li className='p-3'>If you run out of time while gussing you will get 0 points for that round.</li>
                </ul>
            </div>

            <div className='felx flex-row w-[80%] mx-auto mt-[10%] text-center text-white'>
                <p className='text-6xl font-bold'>100</p>
                <p className='pt-4 text-4xl font-semibold text-amber-300'>Can you Beat this score?</p>
                <p className='pt-10 text-5xl font-semibold text-pink-500'>GOOD LUCK !!!</p>
            </div>
        </div>

    </div>
  )
}

export default Landing;