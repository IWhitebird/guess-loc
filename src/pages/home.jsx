import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import env from "react-dotenv";

const Home = ({ lat, lng }) => {
  const mapContainerRef = useRef(null);
  const streetViewContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadGoogleMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&callback=initMap`;
      console.log(script.src)
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {

      const mapOptions = {
        center: { lat, lng },
        zoom: 15,
        disableDefaultUI: true, // Hide the default user interface controls
        mapTypeControl: false, // Remove the map type controls
        mapTypeId: window.google.maps.MapTypeId.ROADMAP, // Use the default map type without additional information
        styles: [
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
              { visibility: 'off' },
            ],
          },
          {
            featureType: 'landscape',
            elementType: 'labels',
            stylers: [
              { visibility: 'on' },
            ],
          },
          {
            featureType: 'administrative.country',
            elementType: 'labels',
            stylers: [
              { visibility: 'on' },
            ],
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [
              { visibility: 'on' },
            ],
          },
        ],
      };
      

    const panoramaOptions = {
      position: { lat, lng },
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      panoProviderOptions: {
        panoId: 'gs_id:remove_labels',
      },
    };

      const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
      mapRef.current = map;


      const panorama = new window.google.maps.StreetViewPanorama(
        streetViewContainerRef.current,
        panoramaOptions
      );

      // Set the Street View panorama to the map
      map.setStreetView(panorama);

      // Add click event listener to the map
      map.addListener('click', (event) => {
        removeMarkers(); // Clear existing markers
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
  const placeMarker = (location) => {
    const marker = new window.google.maps.Marker({
      position: location,
      map: mapRef.current,
    });

    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    // Center the map on the marker's location
    mapRef.current.setCenter(location);
  };

  // Function to remove all existing markers from the map
  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  return (
    <div className='myDiv'>
      <div id="streetViewContainer" ref={streetViewContainerRef}></div>
      <div id="mapContainer" ref={mapContainerRef}></div>
    </div>
  );
};

export default Home;