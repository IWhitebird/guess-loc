export const mapOptionss = {
  //  center: { lat, lng },
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
  

 export const panoramaOptionss = {
  //  position: { lat, lng },
    pov: { heading: 0, pitch: 0 },
    zoom: 1,
    panoProviderOptions: {
      panoId: 'gs_id:remove_labels',
    },
  };