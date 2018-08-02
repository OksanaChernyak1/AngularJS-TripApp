var recomendedRoutesController = function ($http, siteService) {
    pCtrl = this;
    siteService.getAllRecomendedRoutes().then(function (response) {
        pCtrl.recomendedRoutesList = response.data;
    });


};