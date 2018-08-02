var recomendedRouteDetailsController = function ($http, siteService, $routeParams) {
    pCtrl = this;
   
    var sitesNameArray = [];
    this.sitesName = sitesNameArray;
    var waypts = [];
    var sitesArray = [];
    var sites =[];


    siteService.getRecomendedRouteID($routeParams.RouteID).then(function (response) {
        pCtrl.route = response.data;

        routeObj = pCtrl.route;
        siteService.getAllSites().then(function (response) {
            sites = response.data;

            pCtrl.initMap();
        })
        
    })
    

    pCtrl.initMap = function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: { lat: 41.85, lng: -87.65 }
        });
        directionsDisplay.setMap(map);

            calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    function calculateAndDisplayRoute (directionsService, directionsDisplay) {

       sitesArray = pCtrl.route;
        for (var i = 0; i < sitesArray.RouteNumberings.length; i++) {
        
            for (let j = 0; j < sites.length; j++)
            {
                
                if (sitesArray.RouteNumberings[i].SiteID == sites[j].SiteID)
                {

                    waypts.push({
                        location: new google.maps.LatLng(sites[j].Lat, sites[j].Lon),
                        stopover: true
                    });
                    sitesNameArray.push(sites[j].Name);
                    break;

                }
            }

            var waypoints = waypts.slice(1, waypts.length - 1);
            console.log(waypts[0].location);
            
        }
       
        directionsService.route({
            origin: waypts[0].location,
            destination: waypts[waypts.length - 1].location,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'WALKING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });


        
    }


}