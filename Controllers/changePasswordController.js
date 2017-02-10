


angular.module("gbsApp").controller("changePasswordController",
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

        }
        $scope.Savepassword = function () {
            $scope.CurrentPass = angular.element('#txtcurpass').val();
            $scope.NewPass = angular.element('#txtnewpass').val();
            $scope.VerifyPass = angular.element('#txtveripass').val();

            var password = angular.element('#txtnewpass').val();

            var passmatch = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if ($scope.CurrentPass != "") {
                $('#fieldreq1').hide();
            }
            else {
                $('#fieldreq1').show();
            }

            if ($scope.NewPass != "") {
                if (!passmatch.test(password))
                {
                    $('#lblpassvalid').show();
                }
                else
                {
                    $('#lblpassvalid').hide();
                }
                $('#fieldreq2').hide();
            }
            else {
                $('#fieldreq2').show();
            }

            if ($scope.VerifyPass != "") {
                $('#fieldreq3').hide();

                if ($scope.NewPass != $scope.VerifyPass && passmatch.test(password))
                {
                    $('#lblmatchchk').show();
                }
                else
                {
                    $('#lblmatchchk').hide();
                }
                   
            }
            else {
                $('#fieldreq3').show();
            }


            if ($scope.CurrentPass != "" && $scope.NewPass != "" && $scope.VerifyPass != "" && passmatch.test(password) == true && ($scope.NewPass == $scope.VerifyPass)) {
                $http({
                    method: 'GET', url: appSettings.API_BASE_URL + 'password/ChangePassword',
                    params: {
                        UserID: $scope.CurrentUser.ID,
                        CurrentPassword: $scope.CurrentPass,
                        NewPassword: $scope.NewPass,
                        cultureCode: $scope.langCode
                    }
                }).success(function (response, status, headers, config) {
                    if (response == 1) {
                        $('#lblsuccess').show();
                        $('#lblerror').hide();
                      
                        $('#txtcurpass').val("");
                        $('#txtnewpass').val("");
                        $('#txtveripass').val("");
                        Materialize.toast("Your Password reset successfully", 3000, "green");
                    }
                    else
                    {
                        $('#lblsuccess').hide();
                        $('#lblerror').show();
                    }
                }).error(function (response) {
                    Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
                });
            }


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
