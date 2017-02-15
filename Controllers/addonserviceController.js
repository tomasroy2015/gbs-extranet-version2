//Balstechnology-AJ

angular.module("gbsApp").controller("addonserviceController", function ($scope, $http, appSettings, SessionStore,
             sessionFactory, accountFactory, ViewType, MenuType, $rootScope, $location, $routeParams, mainFactory, propertyFacilitiesFactory, dropdownFactory) {
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
    drpchangetype();
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
        Displayaddons1();
    }
    function drpchangetype()
    {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addonservices/drpchangetype',
        }).success(function (response, status, headers, config) {
            // alert(response)
            $scope.drpchangetype = response;
        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }
    function Displayaddons1()
    {
       //  alert('1')
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addonservices/Displayaddons',
        }).success(function (response, status, headers, config) {
            // alert(response)
            $scope.Displayaddons = response;
        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }
    $scope.Deleteaddons = function (id) {
        sessionFactory.SetData(SessionStore.addonsId, id);

        $("#divpopupaddons").show();       
    }
    $scope.deletepopup = function () {
        $scope.Id = sessionFactory.GetData(SessionStore.addonsId);;
          //alert($scope.Id)
        $http({
            method: 'Post',
            url: appSettings.API_BASE_URL + 'addonservices/Deleteaddons',
            params: {
                Id: $scope.Id
            }
        }).success(function (response, status, headers, config) {
            Displayaddons1();
            $("#divpopupaddons").hide();
            Materialize.toast("Add-on Services Deleted successfully.", 5000, 'green');

        }).error(function (response) {
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }
    $scope.canceldeletepopup = function () {
        $("#divpopupaddons").hide();
    }
   
    $scope.Saveaddons = function () {
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        $scope.Title = angular.element('#txttitle').val();
        $scope.Price = angular.element('#txtprice').val();
        $scope.Changetype = angular.element('#drpchangetype').val();
        if ($scope.Title != "" && $scope.Price != "" && $scope.Changetype != "0") {
            $http({
                method: 'Post',
                url: appSettings.API_BASE_URL + 'addonservices/insertaddondetails',
                params: {
                    HotelID: $scope.CurrentUser.HotelID, Title: $scope.Title, Price: $scope.Price, Changetype: $scope.Changetype
                }
            }).success(function (response, status, headers, config) {
                Displayaddons1();
                angular.element('#txttitle').val("");
                angular.element('#txtprice').val("");
                angular.element('#drpchangetype').val("0");
                Materialize.toast("Add-on Services Inserted successfully.", 5000, 'green');


            }).error(function (response) {
                Materialize.toast("Server error occured ", 5000, 'red');
            });
        }
        else {
            Materialize.toast("Please Select All Fields ", 5000, 'red');
        }
    };

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