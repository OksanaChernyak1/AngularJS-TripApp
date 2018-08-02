var singleSiteController = function ($routeParams, $http, siteService, $route, $templateCache) {
    var pCtrl = this;
    var favBool;
    var isAddedToRoute;

        siteService.getSite($routeParams.siteID).then(function (response) {
            pCtrl.site = response.data;
            pCtrl.Init();
    })


    pCtrl.Init = function ()
    {
        favBool = siteService.isSiteExsitsInLocalStorage(pCtrl.site.SiteID);
        isAddedToRoute = siteService.isSiteExsitsInSessionStorage(pCtrl.site.SiteID);
        this.initMap();
    }

    this.ShowRouteButton = function()
    {
        return isAddedToRoute;
    }

    this.toggleRouteButton = function ()
    {
        if (isAddedToRoute) {
            siteService.deleteFromSessionStorage(pCtrl.site.SiteID);
        }
        else {
            siteService.addToSessionStorage(pCtrl.site.SiteID);
        }
        isAddedToRoute = siteService.isSiteExsitsInSessionStorage(pCtrl.site.SiteID);
    }

    this.showFav = function () {
        return favBool;
    }

    this.setStorage = function () {

        if (siteService.getStorageBySiteID(pCtrl.site.SiteID) == undefined) {
            var siteObjFavorite = {
                "SiteID": pCtrl.site.SiteID,
                "Name": pCtrl.site.Name,
                "SitePicture": pCtrl.site.SitePicture,
                "Address": pCtrl.site.Address,
                "PhoneNo": pCtrl.site.PhoneNo
            }
            siteService.setStorage(siteObjFavorite);
            favBool = siteService.isSiteExsitsInLocalStorage(pCtrl.site.SiteID);
        }
        else {
            siteService.removeStorageItem(pCtrl.site.SiteID);
            favBool = siteService.isSiteExsitsInLocalStorage(pCtrl.site.SiteID);
        }

    }

     
    this.initMap = function() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: pCtrl.site.Lat, lng: pCtrl.site.Lon },
            zoom: 18
        });

        var marker = new google.maps.Marker({
            position: { lat: pCtrl.site.Lat, lng: pCtrl.site.Lon },
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: "../shared/assets/icon.png"
                });
    }

};



