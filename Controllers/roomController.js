//Balstechnology-AJ

angular.module("gbsApp").controller("roomController", function ($scope, $http, appSettings, SessionStore,
             sessionFactory, accountFactory, ViewType, MenuType, $rootScope, $location, $routeParams, mainFactory, propertyFacilitiesFactory, dropdownFactory, $timeout) {
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
    var count = 1;
  
        $scope.initializeController = function () {
           // alert('df')
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
            if (count == 1) {
                $scope.Initialize111aj();
            }
            count = count + 1;
        }
  

    $scope.Initialize111aj = function () {
        //alert('sww')
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'roomdetails/getroom',
            params: { hotelID: $scope.CurrentUser.HotelID, cultureCode: $scope.langCode }
        }).success(function (response, status, headers, config) {
            $scope.Room = response;


        }).error(function (response) {
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }


    $scope.EditRoomdetails = function (id) {
     // alert('S')
        sessionFactory.SetData(SessionStore.Hotelroomid, id);
        $location.path("addroom-" + sessionFactory.GetData(SessionStore.currentLanguage));
     
    };
    $scope.btnnewrecored = function () {
       // alert('S')
        //sessionStorage.removeItem(SessionStore.Hotelroomid);
        sessionFactory.RemoveByKey(SessionStore.Hotelroomid);
        $location.path("addroom-" + sessionFactory.GetData(SessionStore.currentLanguage));
    };
    //function EditRoomdetails(id)
    //{
    //    alert('edit')
    //}
    $scope.goToMenu = function (type) {
       // alert('S')
        mainFactory.SetViewType(type);
        $scope.selectedView = type;
    };
    $scope.setLanguage = function (value) {
       // alert('S')
        $scope.selectLanguage = value.name;
        accountFactory.SetCurrentLanguage(value.code);
        mainFactory.SetViewType(ViewType.Parameter);
    };
    $scope.SignOut = function () {
       // alert('S')
        accountFactory.LogOut(accountFactory.UserData());
    };


});