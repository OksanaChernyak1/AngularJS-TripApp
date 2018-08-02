var planRouteController = function ($routeParams, $http, siteService, $route, $templateCache) {


    this.sitesList = siteService.getSitesListArr();
    this.planRouteListArr = siteService.getPlanRouteListArr();


    this.addToPlanRoute = function()
    {
        var selectedArr = [];
        $('.all-sites-select :selected').each(function (i, selected)
        {
            console.log("selected.value: " + selected.value);
            selectedArr.push(selected.value);
        });
        console.log("selectedArr.length: " + selectedArr.length);
        for (let i = 0; i < selectedArr.length ; i++)
        {
            //siteService.deleteAndAddToPlanRoute(selectedArr[i]);
            siteService.addToSessionStorage(selectedArr[i]);
        }
        console.log(selectedArr.length);
        this.planRouteListArr = siteService.getPlanRouteListArr();
        
    }

    this.removeFromPlanRoute = function()
    {
        
        var selectedArr = [];
        $('.navigate-plan-select :selected').each(function (i, selected) {
            selectedArr.push(selected.value);
        });
        for (let i = 0; i < selectedArr.length ; i++) {
            siteService.deleteFromSessionStorage(selectedArr[i]);

        }
        this.planRouteListArr = siteService.getPlanRouteListArr();
    }

    initMap();
    

    function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: 32.927, lng: 35.084 }
        });
        directionsDisplay.setMap(map);

        document.getElementById('submit').addEventListener('click', function () {
            console.log();
            if (siteService.getPlanRouteListArr().length != 0)
                calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
    }


  
    

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedSitesListArr = siteService.getAllPlanRouteSites();
        var waypts = [];
        var start = {
            location: new google.maps.LatLng(selectedSitesListArr[0].Lat, selectedSitesListArr[0].Lon),
            stopover: true
        };
        var end = {
            location: new google.maps.LatLng(selectedSitesListArr[selectedSitesListArr.length - 1].Lat, selectedSitesListArr[selectedSitesListArr.length - 1].Lon),
            stopover: true
        };

        for (let i = 0 ; i < selectedSitesListArr.length; i++)
        {
            if (i != 0 && i < selectedSitesListArr.length - 1)
            {
                waypts.push({
                    location: new google.maps.LatLng(selectedSitesListArr[i].Lat, selectedSitesListArr[i].Lon),
                    stopover: true
                });
            }
        }
     
 
        

        directionsService.route({
            origin: start.location,
            destination: end.location,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
               
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    
}