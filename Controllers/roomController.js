//Balstechnology-AJ

angular.module("gbsApp").controller("roomController", function ($scope, $http, appSettings, SessionStore,
             sessionFactory, accountFactory, ViewType, MenuType,$rootScope,$location,$routeParams,mainFactory,propertyFacilitiesFactory,dropdownFactory) {
    var $baseApiUrl = appSettings.API_BASE_URL;
    $scope.selectLanguage = "Language";
    $scope.langCode = "";
    $scope.PropertyFacilities = null;
    $scope.selectLanguages = [];
    $scope.selectedCards = [];
    $scope.selectedUnit = {};
    $scope.selectLanguages = accountFactory.AllCultures();
    $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
    if (!$scope.CurrentUser)
        $location.path("/login-en");

    $scope.initializeController = function () {
        $scope.IsHotelAdmin = $scope.CurrentUser.IsHotelAdmin;

        $scope.ViewType = ViewType;
        $scope.MenuType = MenuType;
        var language = sessionFactory.GetData(SessionStore.currentLanguage);

        $scope.langCode = language;   
        if (language !== null && !angular.isUndefined(language)) {
            $scope.selectLanguage = accountFactory.getlanguageName();
        }
        $scope.selectedView = mainFactory.GetCurrentView();
        $scope.selectedMenu = mainFactory.GetCurrentMenu();
        //var param = {hotelID: $scope.CurrentUser.HotelID,culture: $scope.langCode};
        //dropdownFactory.GetUnits({cultureCode:$scope.langCode});
        //propertyFacilitiesFactory.GetPropertyFacilities(param);
        Initialize();
    }
    function Initialize() {
       // alert('s')
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'roomdetails/getroom',
            params: { hotelID: $scope.CurrentUser.HotelID, cultureCode: $scope.langCode}
        }).success(function (response, status, headers, config) {
          //  alert('success')
          //  alert(response)
            $scope.Room = response;                
        }).error(function (response) {
            alert('error')
        });
    }

    $scope.goToMenu = function (type) {
        mainFactory.SetViewType(type);
        $scope.selectedView = type;
    };
    $scope.setLanguage = function (value) {
        $scope.selectLanguage = value.name;
        accountFactory.SetCurrentLanguage(value.code);
        mainFactory.SetViewType(ViewType.Parameter);
    };
    $scope.SignOut = function () {
        accountFactory.LogOut(accountFactory.UserData());
    };


});