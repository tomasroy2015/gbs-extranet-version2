/**
 * Created by Tomas on 23-Dec-16.
 */
angular.module("gbsApp").controller("propertyPhotosController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$modal,dropdownFactory,$http) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeController = function () {

            $scope.IsHotelAdmin =  $scope.CurrentUser.IsHotelAdmin;

            $scope.ViewType = ViewType;
            $scope.MenuType = MenuType;

            var language = sessionFactory.GetData(SessionStore.currentLanguage);
            $scope.langCode = language;
            if(language !== null && !angular.isUndefined(language)){
                $scope.selectLanguage = accountFactory.getlanguageName();
            }
            $scope.selectedView = mainFactory.GetCurrentView();
            $scope.selectedMenu = mainFactory.GetCurrentMenu();
            Initialize();
            getPhotos();
        };
        function Initialize(){
            $http({method: 'GET',
                url: appSettings.API_BASE_URL + 'propertyPhotos/propertyPhotosProperties',
                params: {hotelID: $scope.CurrentUser.HotelID,culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.photoProperty = response;
                $scope.photoPath = appSettings.API_BASE_URL+response.Path;

            }).error(function (response){});
        }
        function getPhotos(){
            $http({method: 'GET',
                url: appSettings.API_BASE_URL + 'propertyPhotos/getListPhotos',
                params: {partID:1,hotelID: $scope.CurrentUser.HotelID}
            }).success(function (response, status, headers, config) {
                $scope.propertyPhotos = response;
            }).error(function (response){});
        }
        $scope.GetHotelPhotos = function(hotelID,partID){
            $http({method: 'GET',
                url: appSettings.API_BASE_URL + 'propertyPhotos/getListPhotos',
                params: {partID:partID,hotelID: hotelID}
            }).success(function (response, status, headers, config) {
                $scope.propertyPhotos = response;
            }).error(function (response){});
        };
        $scope.DeletePhoto = function(photoID,partID,roomID){
            $http({method: 'POST',
                url: appSettings.API_BASE_URL + 'propertyPhotos/delete',
                params: {photoID:photoID.toString(),userID: $scope.CurrentUser.ID}
            }).success(function (response, status, headers, config) {
               Materialize.toast("Selected photo deleted successfully.",2000,"green");
                $scope.GetHotelPhotos(roomID,partID);
            }).error(function (response){});
        };
        $scope.SetMainPhoto = function(photoID,recordID,partID,roomID){
            $http({method: 'POST',
                url: appSettings.API_BASE_URL + 'propertyPhotos/setMainPhoto',
                params: {photoID:photoID.toString(),recordID:recordID.toString(),partID:partID.toString(),userID: $scope.CurrentUser.ID}
            }).success(function (response, status, headers, config) {

                $scope.GetHotelPhotos(roomID,partID);
            }).error(function (response){});
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.PropertyPolicies);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });