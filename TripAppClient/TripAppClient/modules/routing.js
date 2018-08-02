

var app = angular.module("myApp", ['ngRoute', 'angularCSS']);

// include services //
app.factory('siteService', siteService);


app.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');


        $routeProvider
            .when("/home", {
                templateUrl: "views/home.html",
                controller: "mainController",
                css:"../shared/css/home.css"
               
            })

        .when("/sites", {
            templateUrl: "views/listOfSites.html",
            controller: "siteController",
            css: "../shared/css/listOfSites.css"

        })
         .when("/site/:siteID", {
             templateUrl: "views/siteDetails.html",
             controller: "singleSiteController",
             css: "../shared/css/siteDetails.css"
         })
            .when("/recomendedRoutes", {
                templateUrl: "views/recomendedRoutes.html",
                controller: "recomendedRoutesController",
                css: "../shared/css/recomendedRoutes.css"
            })
          .when("/favorites", {
                     templateUrl: "views/favorites.html",
                     controller: "favoritesController",
                     css: "../shared/css/favorites.css"
          })
           .when("/recomendedRouteDetails/:RouteID", {
                templateUrl: "views/recomendedRouteDetails.html",
                controller: "recomendedRouteDetailsController",
                css: "../shared/css/recomendedRouteDetails.css"
           })
            .when("/planRoute", {
               templateUrl: "views/planRoute.html",
               controller: "planRouteController",
               css: "../shared/css/planRoute.css"
            })
    .otherwise({
        templateUrl: "views/home.html",
        controller: "mainController",
        css:"../shared/css/home.css"
               
    })
});

app.controller("mainController", mainController);
app.controller("siteController", siteController);
app.controller("singleSiteController", singleSiteController);
app.controller("favoritesController", favoritesController);
app.controller("recomendedRoutesController", recomendedRoutesController);
app.controller("recomendedRouteDetailsController", recomendedRouteDetailsController);
app.controller("planRouteController", planRouteController);





