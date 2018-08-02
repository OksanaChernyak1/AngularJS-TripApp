var favoritesController = function (siteService, $route) {

    this.favoritesArray = siteService.getAllDataFromLocalStorage();
    

    this.removeFromFavorites = function (siteID)
    {
        siteService.removeStorageItem(siteID);
        $route.reload();
    }


}