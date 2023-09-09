import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "./earth";

const Landing = () => {
  return (
    <>
      <div className="relative w-[100vw] h-[100vh] bg-black">
        <Canvas>
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute w-[100vw] h-[100vh] top-0">
        <div className="flex w-[100vw] h-[100vh] overflow-hidden main ">
          <h4 className="heading" style={{ pointerEvents: "none" }}>
            GeoLocQuiz
          </h4>

          <div className="button-container">
            <Link to="/login" className="op_button">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Play Now
            </Link>
          </div>
          <div className="w-[45%] h-[95%] rounded-md mt-8 ml-auto mb-2">
            <div className="text-white w-[80%] mx-auto mt-[10%] ">
              <h1 className="text-6xl font-Raleway text-white mb-4">
                How to play...
              </h1>
              <ul
                className="p-4 text-xl font-Raleway"
                style={{ listStyleType: "disc" }}
              >
                <li className="p-3">
                  You will be given a random street view and you need to guess
                  it within a limited time.
                </li>
                <li className="p-3">
                  The closer your guess is, the more points you will earn.
                </li>
                <li className="p-3">
                  You will have 5 rounds; after 5 rounds, your max score will be
                  determined.
                </li>
                <li className="p-3">
                  If you run out of time while guessing, you will get 0 points
                  for that round.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
