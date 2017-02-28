


angular.module("gbsApp").controller("systemSettingsController",
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

            GetSystemSettings();

        }

        function GetSystemSettings() {

            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'systemsettings/getsystemsettings',
                params: {
                    HotelID: $scope.CurrentUser.HotelID,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {
                $scope.Settings = response[0];
                if (response != "")
                {
                    $scope.valueappend();
                }
            }).error(function (response) {
                Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
            });

        }

        $scope.valueappend = function () {
            if($scope.Settings.SamedayLateBooking == true)
            {
                $('#chklatebook').prop('checked', true);
            }
            if ($scope.Settings.SamedayEarlyBooking == true) {
                $('#chkearlybook').prop('checked', true);
            }
            if ($scope.Settings.NextDayBooking == true) {
                $('#chknextbook').prop('checked', true);
            }

            document.getElementById("drplatebook").value = $scope.Settings.SamedayLateBookingCount;
            document.getElementById("drpearlybook").value = $scope.Settings.SamedayEarlyBookingCount;
            document.getElementById("drpnextbook").value = $scope.Settings.NextDayBookingCount;

            if ($scope.Settings.PriorityLateCheckOut == true) {
                $('#chklatecheckout').prop('checked', true);
            }
            if ($scope.Settings.PriorityEarlyCheckIn == true) {
                $('#chkearlycheckin').prop('checked', true);
            }
            if ($scope.Settings.AirportShuttle == true) {
                $('#chkairportshuttle').prop('checked', true);
            }
            if ($scope.Settings.WelcomeDrink == true) {
                $('#chkdrink').prop('checked', true);
            }
            if ($scope.Settings.FreeBikeRental == true) {
                $('#chkbike').prop('checked', true);
            }
            if ($scope.Settings.FreeBreakfast == true) {
                $('#chkbreakfast').prop('checked', true);
            }
            if ($scope.Settings.FreeParking == true) {
                $('#chkparking').prop('checked', true);
            }
            if ($scope.Settings.FreeWiFi == true) {
                $('#chkwifi').prop('checked', true);
            }

            if ($scope.Settings.RateMissing == true) {
                $('#chkratemissing').prop('checked', true);
            }
            if ($scope.Settings.AddressFromGuests == true) {
                $('#chknoaddress').prop('checked', true);
            }
            if ($scope.Settings.GracePeriod == true) {
                $('#chkgraceperiod').prop('checked', true);
            }
            if ($scope.Settings.CCRChecking == true) {
                $('#rddamagecostyes').prop('checked', true);
            }
            if ($scope.Settings.WithoutPhoneNumber == true) {
                $('#rdphoneyes').prop('checked', true);
            }
            if ($scope.Settings.CCRChecking == false) {
                $('#rddamagecostno').prop('checked', true);
            }
            if ($scope.Settings.WithoutPhoneNumber == false) {
                $('#rdphoneno').prop('checked', true);
            }

            if ($scope.Settings.GracePeriodHour == 1) {
                $('#waive1hour').prop('checked', true);
            }
            if ($scope.Settings.GracePeriodHour == 4) {
                $('#waive4hour').prop('checked', true);
            }
            if ($scope.Settings.GracePeriodHour == 24) {
                $('#waive24hour').prop('checked', true);
            }
            document.getElementById("drpsmsnotify").value = $scope.Settings.SMSHour;

            if ($scope.Settings.Arrivals == true) {
                $('#chkarrivaltdy').prop('checked', true);
            }
            if ($scope.Settings.AuroReplenishment == true) {
                $('#chkautoreplenish').prop('checked', true);
            }
            if ($scope.Settings.SMS == true) {
                $('#chksmsnotify').prop('checked', true);
            }
            if ($scope.Settings.Gbshotels == true) {
                $('#chkbookingnotify').prop('checked', true);
            }
            if ($scope.Settings.GuestMessage == true) {
                $('#chkguestmsgnotify').prop('checked', true);
            }

            
        };
   

        $scope.SaveSettings = function () {

            $scope.SamedayLateBooking = $('#chklatebook').is(':checked');
            $scope.SamedayLateBookingCount = angular.element('#drplatebook').val();
            $scope.SamedayEarlyBooking = $('#chkearlybook').is(':checked');
            $scope.SamedayEarlyBookingCount = angular.element('#drpearlybook').val();
            $scope.NextDayBooking = $('#chknextbook').is(':checked');
            $scope.NextDayBookingCount = angular.element('#drpnextbook').val();

            $scope.PriorityLateCheckOut = $('#chklatecheckout').is(':checked');
            $scope.PriorityEarlyCheckIn = $('#chkearlycheckin').is(':checked');
            $scope.AirportShuttle = $('#chkairportshuttle').is(':checked');
            $scope.WelcomeDrink = $('#chkdrink').is(':checked');
            $scope.FreeBikeRental = $('#chkbike').is(':checked');
            $scope.FreeBreakfast = $('#chkbreakfast').is(':checked');
            $scope.FreeParking = $('#chkparking').is(':checked');
            $scope.FreeWiFi = $('#chkwifi').is(':checked');

            $scope.RateMissing = $('#chkratemissing').is(':checked');
            $scope.AddressFromGuests = $('#chknoaddress').is(':checked');

            $scope.CCRCheckingyes = $('#rddamagecostyes').is(':checked');
            $scope.CCRChecking = false;
            if ($scope.CCRCheckingyes == true)
            {
                $scope.CCRChecking = true;
            }

            $scope.rdphoneyes = $('#rdphoneyes').is(':checked');
            $scope.WithoutPhoneNumber = false;
            if ($scope.rdphoneyes == true) {
                $scope.WithoutPhoneNumber = true;
            }

            $scope.GracePeriod = $('#chkgraceperiod').is(':checked');

            $scope.waive1hour = $('#waive1hour').is(':checked');
            $scope.waive4hour = $('#waive4hour').is(':checked');
            $scope.waive24hour = $('#waive24hour').is(':checked');
            $scope.GracePeriodHour = 0;
            if ($scope.waive1hour == true) {
                $scope.GracePeriodHour = 1;
            }
            else if ($scope.waive4hour == true) {
                $scope.GracePeriodHour = 4;
            }
            else if ($scope.waive24hour == true) {
                $scope.GracePeriodHour = 24;
            }


            $scope.Arrivals = $('#chkarrivaltdy').is(':checked');
            $scope.AuroReplenishment = $('#chkautoreplenish').is(':checked');
            $scope.SMS = $('#chksmsnotify').is(':checked');
            $scope.SMSHour = angular.element('#drpsmsnotify').val();
            $scope.Gbshotels = $('#chkbookingnotify').is(':checked');
            $scope.GuestMessage = $('#chkguestmsgnotify').is(':checked');

            //alert($scope.GuestMessage)
            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'systemsettings/insertsystemsettings',
                params: {
                    hotelID: $scope.CurrentUser.HotelID,
                    SamedayLateBooking: $scope.SamedayLateBooking,
                    SamedayLateBookingCount: $scope.SamedayLateBookingCount,
                    SamedayEarlyBooking: $scope.SamedayEarlyBooking,
                    SamedayEarlyBookingCount: $scope.SamedayEarlyBookingCount,
                    NextDayBooking: $scope.NextDayBooking,
                    NextDayBookingCount: $scope.NextDayBookingCount,
                    PriorityLateCheckOut: $scope.PriorityLateCheckOut,
                    PriorityEarlyCheckIn: $scope.PriorityEarlyCheckIn,
                    AirportShuttle: $scope.AirportShuttle,
                    WelcomeDrink: $scope.WelcomeDrink,
                    FreeBikeRental: $scope.FreeBikeRental,
                    FreeBreakfast: $scope.FreeBreakfast,
                    FreeParking: $scope.FreeParking,
                    FreeWiFi: $scope.FreeWiFi,
                    RateMissing: $scope.RateMissing,
                    AddressFromGuests: $scope.AddressFromGuests,
                    CCRChecking: $scope.CCRChecking,
                    WithoutPhoneNumber: $scope.WithoutPhoneNumber,
                    GracePeriod: $scope.GracePeriod,
                    GracePeriodHour: $scope.GracePeriodHour,
                    Arrivals: $scope.Arrivals,
                    AuroReplenishment: $scope.AuroReplenishment,
                    SMS: $scope.SMS,
                    SMSHour: $scope.SMSHour,
                    Gbshotels: $scope.Gbshotels,
                    GuestMessage: $scope.GuestMessage,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {

                Materialize.toast("Sussessfully made system settings", 1000, "green");
                GetSystemSettings();
                //$scope.Clearalldata();
            }).error(function (response) {
                Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
            });

        };

       

        $scope.Clearalldata = function () {
            $('#chklatebook').prop('checked', false);
            $('#drplatebook').val(0);
            $('#chkearlybook').prop('checked', false);
            $('#drpearlybook').val(0);
            $('#chknextbook').prop('checked', false);
            $('#drpnextbook').val(0);

            $('#chklatecheckout').prop('checked', false);
            $('#chkearlycheckin').prop('checked', false);
            $('#chkairportshuttle').prop('checked', false);
            $('#chkdrink').prop('checked', false);
            $('#chkbike').prop('checked', false);
            $('#chkbreakfast').prop('checked', false);
            $('#chkparking').prop('checked', false);
            $('#chkwifi').prop('checked', false);

            $('#chkratemissing').prop('checked', false);
            $('#chknoaddress').prop('checked', false);
            $('#chkgraceperiod').prop('checked', false);
            $('#rddamagecostyes').prop('checked', false);
            $('#rdphoneyes').prop('checked', false);
            $('#rddamagecostno').prop('checked', false);
            $('#rdphoneno').prop('checked', false);

            $('#waive1hour').prop('checked', false);
            $('#waive4hour').prop('checked', false);
            $('#waive24hour').prop('checked', false);
            $('#chkarrivaltdy').prop('checked', false);
            $('#chkautoreplenish').prop('checked', false);
            $('#chksmsnotify').prop('checked', false);

            $('#drpsmsnotify').val(0);
            $('#chkbookingnotify').prop('checked', false);
            $('#chkguestmsgnotify').prop('checked', false);


            
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
