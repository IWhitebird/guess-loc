import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import env from "react-dotenv";
import randomStreetView  from "../script"

const Home = ({ mylat, mylng }) => {

  const [lat, setLat] = useState(mylat);
  const [lng, setLng] = useState(mylng);

  const mapContainerRef = useRef(null);
  const streetViewContainerRef = useRef(null);
  const mapRef = useRef(null);
  
  var marker;
  var guessLat;
  var guessLng;



  useEffect(() => {
    const loadGoogleMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {


     
      const mapOptions = {
        center: { lat :0, lng:0 },
        zoom: 0.641,
        minZoom:0.641,
        disableDefaultUI: true, // Hide the default user interface controls
        mapTypeControl: false, // Remove the map type controls
        keyboardShortcuts: false,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP, // Use the default map type without additional information
        restriction: {
          latLngBounds: {
            north: 85, // Set the northern boundary (latitude)
            south: -85, // Set the southern boundary (latitude)
            west: -180, // Set the western boundary (longitude)
            east: 180, // Set the eastern boundary (longitude)
          },
          strictBounds: false,
        },
        styles: [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "landscape",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "administrative.country",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
      };
        
      
      const panoramaOptions = {
          position: { lat , lng  },
          pov: { heading: 0, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true, 
          showRoadLabels: false,
          linksControl: true, 
          panoProviderOptions: {
            hideLogo: true, // To hide the Google watermark/logo
            disableCompass: true, // To disable the compass
            panoId: 'gs_id:remove_labels', // You can remove this line if it doesn't serve any specific purpose
          },
      };

      // Create a Google Map
      const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
      mapRef.current = map;

      // Create a Street View
      const panorama = new window.google.maps.StreetViewPanorama(streetViewContainerRef.current, panoramaOptions);
      map.setStreetView(panorama);


      window.google.maps.event.addListener(map, 'mousemove', function(e) {
        map.setOptions({draggableCursor:'crosshair'});
      });
      // Add click event listener to the map
      map.addListener ('click', (event) => {
        placeMarker(event.latLng);
      });
    };



    if (!window.google) {
      loadGoogleMapScript();
    } else {
      initMap();
    }

  }, [lat, lng]);

  // Function to place a marker on the map
  function placeMarker(location) {
    if ( marker ) {
      marker.setPosition(location);
    } else {
      marker = new window.google.maps.Marker({
        position: location,
        map: mapRef.current,
      });
    }

    guessLat = marker.position.lat();
    guessLng = marker.position.lng();

    console.log("Marker Lat: " + guessLat);
    console.log("Marker Lng: " + guessLng);
  }


  async function generateRandomPoint() {
    const locations = await randomStreetView.getRandomLocations(1);
    setLat(locations[0][0]);
    setLng(locations[0][1]);
    console.log(locations);
  }



  return (
    <div className='myDiv'>
      <div id="streetViewContainer" ref={streetViewContainerRef}></div>
      <div id="mapContainer" ref={mapContainerRef}></div>
      <button id="guessButton" onClick={generateRandomPoint}>Generate Random Point</button>
    </div>
  );
};

export default Home;