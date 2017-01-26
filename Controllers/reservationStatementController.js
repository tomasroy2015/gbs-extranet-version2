


angular.module("gbsApp").controller("reservationStatementController",
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

        $scope.rowCollection = [];
        $scope.reserstatementinfo = [];

        $scope.currentPage = ($routeParams.page) ? parseInt($routeParams.page) : 1;
        $scope.currentPage = ($scope.currentPage < 1) ? 1 : $scope.currentPage;
        $scope.rowsPerPage = 20;

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

            GetReservationStatement();

        }

        function GetReservationStatement() {
            //alert("hi")
            var id = sessionFactory.GetData(SessionStore.InvoiceDetailID);
            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'reservation/getReservationStatement',
                params: {
                    culture: $scope.langCode, offset: ($scope.currentPage - 1) * $scope.rowsPerPage
                }
            }).success(function (response, status, headers, config) {
                $scope.rowCollection = response.rows;
                $scope.reserstatementinfo = [].concat($scope.rowCollection);
                //alert($scope.reserstatementinfo)
                $scope.paging = $scope.pagination(response.totalRows, $scope.currentPage, $scope.rowsPerPage);
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
