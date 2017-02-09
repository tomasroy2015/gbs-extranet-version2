
angular.module("gbsApp").controller("firmInformationController",
    function ($scope, $rootScope, $location, $routeParams, appSettings, SessionStore,
             sessionFactory, accountFactory, mainFactory, Notify, ViewType, MenuType, dropdownFactory, $http) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode = "";
        $scope.selectLanguages = [];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);

        if (!$scope.CurrentUser)
            $location.path("/login-en");
        initializeController()
        function initializeController() {
            //alert('df')
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

            Getfirminformation();

        }
        function Getfirminformation() {

            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'firm/getfirminformation',
                params: {
                    FirmID: $scope.CurrentUser.FirmID,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {
                $scope.firmInfo = response[0];
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
