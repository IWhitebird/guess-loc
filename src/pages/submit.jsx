import React, { useEffect, useRef, useState } from 'react';
import './submit.css';
import FinalResult from './FinalResult';

const Submit = ({
  lat1,
  lng1,
  guessLat,
  guessLng,
  generateRandomPoint,
  score,
  setScore,
  distance,
  rounds,
  setRounds,
  loading,
  setLoading,
  points,
}) => {


  const submitMapContainerRef = useRef(null);

  const [midLat, setMidLat] = useState(0);
  const [midLng, setMidLng] = useState(0);

  const midFunc = (lat1, lng1, guessLat, guessLng) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const lat1Rad = toRadians(lat1);
    const lng1Rad = toRadians(lng1);
    const lat2Rad = toRadians(guessLat);
    const lng2Rad = toRadians(guessLng);

    const midLat = (lat1Rad + lat2Rad) / 2;
    const midLng = (lng1Rad + lng2Rad) / 2;

    const midLatDegrees = (midLat * 180) / Math.PI;
    const midLngDegrees = (midLng * 180) / Math.PI;

    setMidLat(midLatDegrees);
    setMidLng(midLngDegrees);

    return;
  };

  useEffect(() => {
    midFunc(lat1, lng1, guessLat, guessLng);
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: midLat, lng: midLng },
        zoom: 3,
        disableDefaultUI: true,
      };

      let map = new window.google.maps.Map(submitMapContainerRef.current, mapOptions);

      let marker1 = new window.google.maps.Marker({
        position: { lat: lat1, lng: lng1 },
        map,
        title: 'Marker 1',
      });

      let marker2 = new window.google.maps.Marker({
        position: { lat: guessLat, lng: guessLng },
        map,
        title: 'Guessed Marker',
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      const lineCoordinates = [
        { lat: lat1, lng: lng1 },
        { lat: guessLat, lng: guessLng },
      ];

      let polyline = new window.google.maps.Polyline({
        path: lineCoordinates,
        geodesic: false,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 0,
        icons: [
          {
            icon: {
              path: 'M 0,-1 0,1',
              strokeOpacity: 1.0,
              scale: 4,
            },
            offset: '0',
            repeat: '20px',
          },
        ],
      });

      polyline.setMap(map);
    };

    initializeMap();

    return () => {
      // Any cleanup code for the map or markers (if required)
    };
  }, [lat1, lng1, guessLat, guessLng, midLat, midLng]);


  function onReset() {
    setScore(0);
    setRounds(5);
    generateRandomPoint();
  }

  return (
    <div className="w-[100%] h-[100%] bg-black z-50">
      <div id="submitMapContainer" ref={submitMapContainerRef}></div>
      <div className='flex justify-center items-center text-white text-4xl p-5'>
        <h3>Result</h3>
      </div>
      <div className='z-10 absolute flex justify-center items-center text-white text-3xl w-full h-[75vh]'>
        <div>
          <div className='mb-2'>
            Points earned : {points}
          </div>
          Distance : {Math.round(distance)} Km
        </div>
      </div>
      {
        rounds === 0 ? (<FinalResult score={score} onReset={onReset} loading={loading} setLoading={setLoading} rounds={rounds} />) :
          (<div>
            <button id="generateButton" onClick={generateRandomPoint}>Next</button>
            <button id="btn_reset" onClick={onReset}>Reset</button>
          </div>)

      }
    </div>
  );
};

export default Submit;
