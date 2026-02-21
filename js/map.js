// ===========================
// MAP MANAGEMENT
// ===========================

let currentLocation = null;
let mapMarker = null;
let userMarker = null;

window.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeMap, 500); // Wait for dashboard to load
});

function initializeMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('Map element not found');
    return;
  }

  // Initialize Leaflet map
  window.dashboardMap = L.map('map', {
    zoomControl: false, // We have custom controls
    scrollWheelZoom: true
  }).setView([13.6929, -89.2182], 13); // San Salvador, El Salvador

  // Add custom tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    minZoom: 3,
    className: 'map-tiles'
  }).addTo(window.dashboardMap);

  // Add custom map styles
  applyMapStyles();

  // Try to get user location
  getCurrentLocation();

  // Add event listeners
  window.dashboardMap.on('moveend', updateLocationDisplay);
}

function getCurrentLocation() {
  if (!navigator.geolocation) {
    console.log('Geolocation not supported');
    // Use default location
    setDefaultMarker();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      currentLocation = {
        latitude: lat,
        longitude: lng,
        accuracy: accuracy
      };

      // Center map on user location
      if (window.dashboardMap) {
        window.dashboardMap.setView([lat, lng], 13);
      }

      // Add user marker
      addUserMarker(lat, lng);

      // Update location display
      updateLocationData(lat, lng, accuracy);
    },
    function(error) {
      console.log('Geolocation error:', error.message);
      // Use default location
      setDefaultMarker();
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function setDefaultMarker() {
  const defaultLat = 13.6929;
  const defaultLng = -89.2182;
  
  currentLocation = {
    latitude: defaultLat,
    longitude: defaultLng,
    accuracy: 5
  };

  addUserMarker(defaultLat, defaultLng);
  updateLocationData(defaultLat, defaultLng, 5);
}

function addUserMarker(lat, lng) {
  // Remove old marker
  if (userMarker) {
    userMarker.remove();
  }

  // Create custom marker with icon
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container">
        <div class="marker-inner">
          <i class="fas fa-location-dot"></i>
        </div>
        <div class="marker-pulse"></div>
      </div>
    `,
    iconSize: [40, 40],
    popupAnchor: [0, -20]
  });

  userMarker = L.marker([lat, lng], { icon: customIcon })
    .addTo(window.dashboardMap)
    .bindPopup(`
      <div class="marker-popup">
        <strong>Current Location</strong><br>
        Latitude: ${lat.toFixed(4)}°<br>
        Longitude: ${lng.toFixed(4)}°
      </div>
    `);

  // Add accuracy circle
  L.circle([lat, lng], {
    radius: 50, // 50 meters accuracy circle
    color: '#6366f1',
    fill: true,
    fillColor: '#6366f1',
    fillOpacity: 0.1,
    weight: 2,
    dashArray: '5, 5'
  }).addTo(window.dashboardMap);
}

function updateLocationData(lat, lng, accuracy) {
  const latElement = document.getElementById('latitude');
  const lonElement = document.getElementById('longitude');
  const accuracyElement = document.getElementById('accuracy');

  if (latElement) latElement.textContent = lat.toFixed(4) + '°';
  if (lonElement) lonElement.textContent = lng.toFixed(4) + '°';
  if (accuracyElement) accuracyElement.textContent = '±' + Math.round(accuracy) + 'm';
}

function updateLocationDisplay() {
  if (!window.dashboardMap) return;

  const center = window.dashboardMap.getCenter();
  updateLocationData(center.lat, center.lng, 5);
}

function applyMapStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .map-tiles {
      filter: brightness(0.95);
    }

    body.dark-mode .map-tiles {
      filter: brightness(0.6) invert(0.9) grayscale(0.4);
    }

    .custom-marker {
      background: none !important;
      border: none !important;
    }

    .marker-container {
      position: relative;
      width: 40px;
      height: 40px;
    }

    .marker-inner {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      border: 3px solid white;
      z-index: 10;
      position: relative;
    }

    .marker-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      animation: pulse-animation 2s infinite;
    }

    @keyframes pulse-animation {
      0% {
        width: 40px;
        height: 40px;
        opacity: 1;
      }
      100% {
        width: 80px;
        height: 80px;
        opacity: 0;
      }
    }

    .marker-popup {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      font-size: 12px;
      color: #1e293b;
    }

    .marker-popup strong {
      font-size: 14px;
      color: #6366f1;
    }

    .leaflet-popup-content-wrapper {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .leaflet-popup-tip {
      background-color: white;
    }

    body.dark-mode .leaflet-popup-content-wrapper {
      background-color: #1e293b;
      color: #f1f5f9;
    }

    body.dark-mode .marker-popup {
      color: #f1f5f9;
    }

    body.dark-mode .leaflet-popup-tip {
      background-color: #1e293b;
    }
  `;
  document.head.appendChild(style);
}

// Update location periodically (every 10 seconds)
setInterval(function() {
  if (navigator.geolocation && window.dashboardMap) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        // Only update marker if location changed significantly
        if (currentLocation &&
            Math.abs(lat - currentLocation.latitude) > 0.0001 ||
            Math.abs(lng - currentLocation.longitude) > 0.0001) {
          
          addUserMarker(lat, lng);
          updateLocationData(lat, lng, accuracy);
          
          currentLocation = {
            latitude: lat,
            longitude: lng,
            accuracy: accuracy
          };
        }
      },
      function(error) {
        console.log('Location update error:', error.message);
      }
    );
  }
}, 10000);
