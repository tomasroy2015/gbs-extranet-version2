


angular.module("gbsApp").controller("invoiceDetailsController",
    function ($scope, $rootScope, $location, $routeParams, appSettings, SessionStore,
             sessionFactory, accountFactory, mainFactory, Notify, ViewType, MenuType, dropdownFactory, $http) {
        //alert('indet')
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

            GetInvoiceDetails();

        }
        function GetInvoiceDetails() {
            var id = sessionFactory.GetData(SessionStore.InvoiceDetailID);
            //alert(appSettings.API_BASE_URL)
            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'invoice/getinvoicedetails',
                params: {
                    invoiceid: id,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {
                $scope.InvoiceDetail = response;
                $scope.InvoiceDetailinfo = response[0];
                //GetPromotions();
            }).error(function (response) {
                Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
            });

        }
      
        $scope.backToHome = function (id) {
           // alert("invoices-" + sessionFactory.GetData(SessionStore.currentLanguage))
            $location.path("invoices-" + sessionFactory.GetData(SessionStore.currentLanguage));
        };

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
