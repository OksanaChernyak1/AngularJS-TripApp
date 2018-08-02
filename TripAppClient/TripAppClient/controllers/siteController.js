var siteController = function ($http, siteService) {
    pCtrl = this;
    pCtrl.sitesList = [];
    

    siteService.getAllSites()
   .then(function (response) {
       pCtrl.sitesList = response.data;
   });
   



}
