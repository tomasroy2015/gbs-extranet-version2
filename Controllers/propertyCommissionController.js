


angular.module("gbsApp").controller("propertyCommissionController",
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
        //-datepicker
        var currentTime = new Date();
        $scope.currentTime = currentTime;
        $scope.minDate = (new Date($scope.currentTime.getTime())).toISOString();
        //pagenation
        $scope.rowCollection = [];
        $scope.reserstatementinfo = [];
        $scope.currentPage = ($routeParams.page) ? parseInt($routeParams.page) : 1;
        $scope.currentPage = ($scope.currentPage < 1) ? 1 : $scope.currentPage;
        $scope.rowsPerPage = 5;

        //if (!$scope.CurrentUser)
        //    $location.path("/login-en");
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

            CommissiondrpDisplay();
           // GetInvoiceDetails();

        }
       
        var DateValidationStart = "Valid";
        var DateValidationDiff = "Valid";

        $scope.CheckTodayDate = function () {
           // alert('s')
            $scope.StartDate = angular.element('#inputStart').val();
            //alert($scope.StartDate)
            if ($scope.StartDate != "") {
                $http({
                    method: 'GET',
                    url: appSettings.API_BASE_URL + 'propertycommission/Startdatecomp',
                    params: {
                        StartDate: $scope.StartDate
                    }
                }).success(function (response, status, headers, config) {
                    //alert(response)
                    if (response >= 1) {
                        Materialize.toast("It should be equal or later than the day date ", 5000, 'red');
                        DateValidationStart = "Invalid"
                    }
                    else {
                       
                        DateValidationStart = "Valid"
                    }
                }).error(function (response) {
                    Materialize.toast("Server error occured ", 5000, 'red');
                });
            }
        }
       
        $scope.CheckDate = function () {
            $scope.StartDate = angular.element('#inputStart').val();
            $scope.Enddate = angular.element('#inputEnd').val();
            if ($scope.StartDate != "" && $scope.Enddate != "") {
                $http({
                    method: 'GET',
                    url: appSettings.API_BASE_URL + 'propertycommission/Enddatecomp',
                    params: {
                        StartDate: $scope.StartDate, Enddate: $scope.Enddate
                    }
                }).success(function (response, status, headers, config) {
                    if (response >= 1) {
                        Materialize.toast("It should be equal or later than the day date ", 5000, 'red');
                        DateValidationDiff = "Invalid"
                    }
                    else {

                        DateValidationDiff = "Valid"
                    }
                }).error(function (response) {
                    Materialize.toast("Server error occured ", 5000, 'red');
                });
            }
        }

        function CommissiondrpDisplay() {
            $http({
                method: 'GET',
                url: appSettings.API_BASE_URL + 'propertycommission/CommissiondrpDisplay',              
            }).success(function (response, status, headers, config) {
                $scope.Commissiondrp = response;
                DisplayComission();
            }).error(function (response) {
                Materialize.toast("Server error occured ", 5000, 'red');
            });
        }

        function DisplayComission()
        {
            $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
            $http({
                method: 'GET',
                url: appSettings.API_BASE_URL + 'propertycommission/DisplayComission',
                params: {
                    HotelID: $scope.CurrentUser.HotelID, culture: $scope.langCode, offset: ($scope.currentPage - 1) * $scope.rowsPerPage
                }
            }).success(function (response, status, headers, config) {
                $scope.Commissiondisplay = response;
                $scope.rowCollection = response.rows;
                $scope.displayColl = [].concat($scope.rowCollection);
                $scope.paging = $scope.pagination(response.totalRows, $scope.currentPage, $scope.rowsPerPage);

            }).error(function (response) {
                Materialize.toast("Server error occured ", 5000, 'red');
            });
        }

        $scope.SaveComission = function () {
            $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
            $scope.StartDate = angular.element('#inputStart').val();
            $scope.Enddate = angular.element('#inputEnd').val();
            $scope.Comission = angular.element('#commiondrp').val();
            if ($scope.StartDate != "" && $scope.Enddate != "" && $scope.Comission != "0") {
                $http({
                    method: 'GET',
                    url: appSettings.API_BASE_URL + 'propertycommission/SaveComission',
                    params: {
                        StartDate: $scope.StartDate, Enddate: $scope.Enddate, Comission: $scope.Comission, HotelID: $scope.CurrentUser.HotelID
                    }
                }).success(function (response, status, headers, config) {
                    //alert(response)
                    angular.element('#inputStart').val("");
                    angular.element('#inputEnd').val("");
                    angular.element('#commiondrp').val("0");
                    if (response == "1")
                    {
                        Materialize.toast("Property Commission Inserted successfully.", 5000, 'green');
                    }
                    else {
                        Materialize.toast("Property Commission Updated successfully.", 5000, 'green');
                    }
                    DisplayComission();
                }).error(function (response) {
                    Materialize.toast("Server error occured ", 5000, 'red');
                });
            }
            else {
                Materialize.toast("Please Select All Fields  ", 5000, 'red');
            }
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
       $scope.pagination = function ($totalRows, $curPage, $perPage) {
        
            var $maxPagesLoops = 10;  // Display 5 pages on the screen.
            var $totalPages = Math.ceil($totalRows / $perPage); //Calculate the total pages
            var $start = (Math.ceil($curPage / $maxPagesLoops) - 1) * $maxPagesLoops + 1;
            var $prev = ($start > $maxPagesLoops) ? ($start - 1) : 0;
            var $end;
            if ($totalPages < $maxPagesLoops) {
                $end = $totalPages;
            } else {
                $end = (($start + $maxPagesLoops - 1) > $totalPages) ? $totalPages : ($start + $maxPagesLoops - 1);
            }
            var $next = ($end < $totalPages) ? ($end + 1) : 0;
            var $paging = {};
            $paging.first = 1;
            $paging.prev = $prev;
            $paging.pages = [];
            for (var i = $start; i < ($end + 1) ; i++) {
                $paging.pages.push(i);
            }
            $paging.next = $next;
            $paging.current = $curPage;
            $paging.last = $totalPages;
            return $paging; //The returned paging object.

        };

        $scope.setLimitLength = function ($length) {
            $location.search('length', $length);
            $location.search('page', 1);
        };

        $scope.setPage = function ($page) {
            $location.search('page', $page);

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
