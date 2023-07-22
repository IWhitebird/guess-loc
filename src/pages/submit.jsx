import React, { useEffect, useRef } from 'react';

const Submit = ({ myref, lat1, lng1, lat2, lng2, generateRandomPoint }) => {
  const submitMapContainerRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDe3s-A5dg6QWWI16Sd11C3_JtuoYavrys&callback=initSubmitMap`;
      script.async = true;
      script.defer = true;
      window.initSubmitMap = initSubmitMap; // Expose the function to the global scope
      document.head.appendChild(script);
    };

    const initSubmitMap = () => {
      const mapOptions = {
        center: { lat: lat1, lng: lng1 },
        zoom: 10,
      };

      // Create a Google Map for the Submit component
      const submitMap = new window.google.maps.Map(submitMapContainerRef.current, mapOptions);

      // Place a marker for the guessed location
      new window.google.maps.Marker({
        position: { lat: lat2, lng: lng2 },
        map: submitMap,
      });
    };

    if (!window.google) {
      loadGoogleMapScript();
    } else {
      initSubmitMap();
    }
  }, [lat1, lng1, lat2, lng2]);

  return (
    <div className="absolute w-[100%] h-[100%] bg-[#000000a8] z-10">
      <div id="submitMapContainer" ref={submitMapContainerRef}></div>
      <button id="generateButton" onClick={generateRandomPoint}>
        Generate Random Point
      </button>
    </div>
  );
};

export default Submit;
