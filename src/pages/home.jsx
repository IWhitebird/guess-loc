import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import env from "react-dotenv";
import randomStreetView from "../script";
import Submit from "./submit";
import Score from "./Score";
import Dashboard from "./dashboard";
import Loader from "./loader";

const Home = ({loading , setLoading , dailyCounter , setDailyCounter}) => {
  
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [points, setPoints] = useState(0);
  const [miniWindow, setMiniWindow] = useState(false);
  const [distance, setDistance] = useState(0);
  const [rounds , setRounds] = useState(5);
  const mapContainerRef = useRef(null);
  const streetViewContainerRef = useRef(null);
  const mapRef = useRef(null);

  let marker;
  const [guessLat, setGuessLat] = useState(0);
  const [guessLng, setGuessLng] = useState(0);


  useEffect(() => {
    setLoading(true);
    generateRandomPoint();
    setLoading(false);
  }, []);
  

  useEffect( () => { 

    const loadGoogleMapScript = () => {
      if(lat && lng){
        try{
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&callback=initMap`;
          script.async = true;
          script.defer = true;
          window.initMap = initMap;
          document.head.appendChild(script);
        }
        catch(error){
          console.error("Error while loading google maps script:", error);
        }
      }
    };

    const initMap = () => {   
        const mapOptions = {
          center: { lat: 0, lng: 0 },
          zoom: 0.641,
          minZoom: 0.641,
          disableDefaultUI: true,
          mapTypeControl: false,
          keyboardShortcuts: false,
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
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
          position: { lat, lng },
          pov: { heading: 0, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true,
          showRoadLabels: false,
          linksControl: true,
          panoProviderOptions: {
            hideLogo: true, // To hide the Google watermark/logo
            disableCompass: true, // To disable the compass
            panoId: "gs_id:remove_labels", // You can remove this line if it doesn't serve any specific purpose
          },
        };
  
        // Create a Google Map
        const map = new window.google.maps.Map(
          mapContainerRef.current,
          mapOptions
        );
        mapRef.current = map;
  
        // Create a Street View
        const panorama = new window.google.maps.StreetViewPanorama(
          streetViewContainerRef.current,
          panoramaOptions
        );
        map.setStreetView(panorama);
  
        window.google.maps.event.addListener(map, "mousemove", function (e) {
          map.setOptions({ draggableCursor: "crosshair" });
        });
        // Add click event listener to the map
        map.addListener("click", (event) => {
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
    if (marker) {
      marker.setPosition(location);
    } else {
      marker = new window.google.maps.Marker({
        position: location,
        map: mapRef.current,
      });
    }

    setGuessLat(marker.position.lat());
    setGuessLng(marker.position.lng());
  }

  const updateReqCounter = async () =>  {
    try{
      const res = await fetch(env.BASE_URL + "/dashboard/update-counter", {
        method : "GET",
        }
      )
      const data = await res.json();
      setDailyCounter(data.counterValue);
    }
    catch(error){
      console.error("Error while updating request counter:", error);
    }
  }
  console.log("my res" , dailyCounter)

  async function generateRandomPoint() {
    try {
      setLoading(true);
      updateReqCounter();
      const locations = await randomStreetView.getRandomLocations(1);
      setLat(locations[0][0]);
      setLng(locations[0][1]);
      setLoading(false);
      setMiniWindow(false);
    } catch (error) {
      console.error("Error while generating random point:", error);
    }
  }


  function CalcDistance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }
  // Example usage in the submitHandle function:
  function submitHandle() {
    try {
      setLoading(true);
      const distance = CalcDistance(lat, guessLat, lng, guessLng);
      console.log(distance);
      var newPoints = Math.round(20000 - distance);
  
      if (newPoints < 8000) {
        newPoints = Math.round(newPoints / 10);
      }
  
      if (newPoints >= 8000) {
        newPoints = Math.round((newPoints * 2) / 10);
      }
      setPoints(points + newPoints);
      setRounds(rounds - 1);
      setLoading(false);
      setMiniWindow(true);
      setDistance(distance);
      
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div>
      {
        loading && <Loader />
      }

    <div id="streetViewContainer" ref={streetViewContainerRef}></div>
    <div id="mapContainer" ref={mapContainerRef}></div>

    <button id="guessButton" onClick={submitHandle}>
      Guess
    </button>
    <Dashboard rounds={rounds}/>
    <div id="rounds_div">{rounds} / 5</div>
    {miniWindow && (
      <Submit
        lat1={lat}
        lng1={lng}
        generateRandomPoint={generateRandomPoint}
        distance={distance}
        guessLat={guessLat}
        guessLng={guessLng}
        score={points}
        setScore={setPoints}
        rounds={rounds}
        setRounds={setRounds}
        loading={loading}
        setLoading={setLoading}
        dailyCounter={dailyCounter}
        setDailyCounter={setDailyCounter}
      />
      )}
      <Score points={points} />

  </div>
  );
};

export default Home;
