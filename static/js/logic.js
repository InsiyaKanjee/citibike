// Create the createMap function.
function createMap(bikeStationsLayer) {

  // Create the tile layer that will be the background of our map.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    Street: street,
    Topography: topo
  };

  //Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    BikeStations: bikeStationsLayer
  };

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [street, bikeStationsLayer]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}


// Create the createMarkers function.

function createMarkers() {
  var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

  // Get the data with d3.
  d3.json(url).then(function (response) {
    console.log('this gives info of first station', response.data.stations[0])
    console.log('this gives lat of first station', response.data.stations[0].lat)
    console.log('this gives lng of first station', response.data.stations[0].lon)

    var stationData = response.data.stations
    var stationMarkers = [];

    for (var i = 0; i < stationData.length; i++) {
      // loop through the cities array, create a new marker, and push it to the cityMarkers array
      stationMarkers.push(
        L.marker([stationData[i].lat, stationData[i].lon]).bindPopup("<h1>" + stationData[i].name + "</h1>")
      );

      var bikeStationsLayer = L.layerGroup(stationMarkers);

    };
    console.log("station", bikeStationsLayer)
    createMap(bikeStationsLayer);

  });
}

createMarkers();
