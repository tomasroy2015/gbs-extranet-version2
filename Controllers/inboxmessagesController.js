//alert('sourding123')
angular.module("gbsApp").controller("inboxmessagesController", function ($scope, $http, appSettings, SessionStore,
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

    $scope.ReceiverUserID = "100002";

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

        Getinboxmessages();
    }

    function Getinboxmessages() {

        $http({
            method: 'GET', url: appSettings.API_BASE_URL + 'inbox/getinboxmessage',
            params: {
                ReceiverID: $scope.ReceiverUserID,
                cultureCode: $scope.langCode
            }
        }).success(function (response, status, headers, config) {
            $scope.Inboxmessage = response;
            $scope.Inboxmessageinfo = response[0];
            //GetPromotions();
        }).error(function (response) {
            Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
        });

    }


    $scope.goToMenu = function (type) {
        mainFactory.SetViewType(type);
        $scope.selectedView = type;
    };
    $scope.setLanguage = function (value) {
        $scope.selectLanguage = value.name;
        accountFactory.SetCurrentLanguage(value.code);
        mainFactory.SetViewType(ViewType.Reservations);
    };
    $scope.SignOut = function () {
        accountFactory.LogOut(accountFactory.UserData());
    };
});