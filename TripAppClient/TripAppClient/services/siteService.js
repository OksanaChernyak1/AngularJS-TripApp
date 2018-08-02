var siteService = function ($http) {

    var sitesListArr = [];
    var planRouteListArr = [];


    initSiteListArr();

    function initSiteListArr() {
        var sites = [];
       
        var url = 'http://localhost:62266/api/sites/getAllSites';
        $http.get(url).then(function (response) {
            sites = response.data;

            for(let x of sites)
            {
                var obj = {
                    "SiteID": x.SiteID,
                    "Name": x.Name,
                    "Lat": x.Lat,
                    "Lon": x.Lon,
                };

                sitesListArr.push(obj);
            }
   });
       
    }

    return {
        getAllSites: function () {
            var url = 'http://localhost:62266/api/sites/getAllSites';
            return $http.get(url);
        },
        getSitesListArr: function () {
            return sitesListArr;
        },
        getPlanRouteListArr: function () {
            return planRouteListArr;
        },
        getSite: function (siteIDParam) {

            var url = 'http://localhost:62266/api/sites/getSite?id=' + siteIDParam;
            return $http.get(url);
        },
        getRecomendedRouteID: function (RouteID) {

            var url = 'http://localhost:62266/api/route/getRoute?id=' + RouteID;
            return $http.get(url);
        },
        getAllPlanRouteSites() {
            return planRouteListArr;
        },
        deleteAndAddToPlanRoute: function (siteID) {
            for (let i = 0; i < sitesListArr.length; i++) {
                if (sitesListArr[i].SiteID == siteID) {
                    sitesListArr.splice(i, 1);
                    planRouteListArr.push(this.getSite(siteID));
                }
            }
        },
        deleteAndAddToSitesList: function (siteID) {

            for (let i = 0; i < planRouteListArr.length; i++) {
                if (planRouteListArr[i].SiteID == siteID) {
                    planRouteListArr.splice(i, 1);
                    sitesListArr.push(this.getSite(siteID));
                }
            }

        },
        setStorage: function (siteObjFavorite) {
            localStorage.setItem(siteObjFavorite.SiteID, JSON.stringify(siteObjFavorite));
        },
        getStorageBySiteID: function (key) {
            return localStorage.getItem(key);
        },
        addToSessionStorage: function (siteID) {
            var url = 'http://localhost:62266/api/sites/getSite?id=' + siteID;
            for (let i = 0; i < sitesListArr.length; i++) {
                if (sitesListArr[i].SiteID == siteID) {
                    sessionStorage.setItem(siteID, JSON.stringify(sitesListArr[i]));
                    sitesListArr.splice(i, 1);
                }
            }
            this.getAllDataFromSessionStorage();
        },
        deleteFromSessionStorage: function (siteID) {
            sessionStorage.removeItem(siteID);

            for (let i = 0; i < planRouteListArr.length; i++) {
                if (planRouteListArr[i].SiteID == siteID) {
                    sitesListArr.push(planRouteListArr[i]);
                }
            }
            this.getAllDataFromSessionStorage();
        },
        removeStorageItem: function (key) {
            localStorage.removeItem(key);
        },
        getAllDataFromSessionStorage: function () {
            planRouteListArr = [];
            for (var i = 0, len = sessionStorage.length; i < len; ++i) {
                if (sessionStorage.getItem(sessionStorage.key(i)) != undefined) {

                    planRouteListArr.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
                }
            }
        },
        getAllDataFromLocalStorage: function () {
            var favoritesArray = [];

            for (var i = 0, len = localStorage.length; i < len; ++i) {
                if (localStorage.getItem(localStorage.key(i)) != undefined)
                { favoritesArray.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); }

            }
            return favoritesArray;
        },
        isSiteExsitsInLocalStorage: function (key) {

            if (localStorage.getItem(key) != undefined)
            { return true; }
            else
            { return false; }
        },
        isSiteExsitsInSessionStorage: function (key) {
            if (sessionStorage.getItem(key) != undefined)
            { return true; }
            else
            { return false; }
        },
        getAllRecomendedRoutes: function () {
            
            var url = 'http://localhost:62266/api/route/getAllRoutes';
            return $http.get(url);
        },
        getRecomendedRoute: function (RouteIdParam) {
            for (let route of recomendedRouteList) {
                if (route.RouteID == RouteIdParam) {
                    return route;
                }
            }
            return null;
        }
    }
};


