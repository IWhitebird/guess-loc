import React, { useEffect, useRef, useState } from 'react';
import './submit.css';
import Score from './Score';
import FinalResult from './FinalResult';

const Submit = ({ lat1, lng1 ,guessLat, guessLng, generateRandomPoint, score , setScore, distance  , rounds , setRounds }) => {
  const submitMapContainerRef = useRef(null);

  const [midLat, setMidLat] = useState(0);
  const [midLng, setMidLng] = useState(0);

  const midFunc = (lat1, lng1, guessLat, guessLng) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    // Convert latitude and longitude to radians
    const lat1Rad = toRadians(lat1);
    const lng1Rad = toRadians(lng1);
    const lat2Rad = toRadians(guessLat);
    const lng2Rad = toRadians(guessLng);

    // Calculate the midpoint
    const midLat = (lat1Rad + lat2Rad) / 2;
    const midLng = (lng1Rad + lng2Rad) / 2;

    // Convert the midpoint back to degrees
    const midLatDegrees = (midLat * 180) / Math.PI;
    const midLngDegrees = (midLng * 180) / Math.PI;

    setMidLat(midLatDegrees);
    setMidLng(midLngDegrees);

    return;
  };

// ... (Previous code)

useEffect(() => {
  midFunc(lat1, lng1, guessLat, guessLng);
  const initializeMap = () => {
    const mapOptions = {
      center: { lat: midLat, lng: midLng },
      zoom: 3,
      disableDefaultUI: true,
    };

    let map = new window.google.maps.Map(submitMapContainerRef.current, mapOptions);

    // Place the first marker at lat1 and lng1
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
      geodesic: false, // Set to false for straight line
      strokeColor: '#000000', // Black color for the line
      strokeOpacity: 1.0,
      strokeWeight: 0,
      icons: [
        {
          icon: {
            path: 'M 0,-1 0,1', // Custom symbol for the dashed line (horizontal line segment)
            strokeOpacity: 1.0,
            scale: 4, // Adjust the scale to control the spacing between dashes
          },
          offset: '0', // Adjust the offset to control the position of the first dash
          repeat: '20px', // Adjust the repeat value to control the length of the dashes
        },
      ],
    });
  
    
    polyline.setMap(map);
  };

  initializeMap();

  // Clean up function for when the component unmounts (optional)
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
    <div className="absolute w-[100%] h-[100%] bg-[#000000a8] z-10">
      <div id="submitMapContainer" ref={submitMapContainerRef}></div>
      <div id="distance_div">{Math.round(distance)} Km</div>

      {
        rounds === 0 ? (<FinalResult score={score} onReset={onReset} />) : 
        (<div>
          <button id="generateButton" onClick={generateRandomPoint}>Next</button>
          <button id="btn_reset" onClick={onReset}>Reset</button>
        </div>)

      }
    
    </div>
  );
};

export default Submit;
