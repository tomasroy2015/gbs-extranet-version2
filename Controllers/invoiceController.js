
//BalsTechnology-SK   
angular.module("gbsApp").controller("invoiceController", function ($scope, $rootScope, $location, $routeParams, appSettings, SessionStore,
            sessionFactory, accountFactory, mainFactory, Notify, ViewType, MenuType, dropdownFactory, $http, $filter, $rootScope) {
    $scope.selectLanguage = "Language";

    $scope.IsDataLoaded = false;
    $scope.langCode = "";
    $scope.selectLanguages = [];
    $scope.selectLanguages = accountFactory.AllCultures();
    $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
    $scope.rowCollection = [];
    $scope.InvoiceDetail = [];
    $scope.InvoicePendingDetail = [];

    $scope.currentPage = ($routeParams.page) ? parseInt($routeParams.page) : 1;
    $scope.currentPage = ($scope.currentPage < 1) ? 1 : $scope.currentPage;
    $scope.rowsPerPage = 10;

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
        GetInvoice();
        GetpendindInvoice();
    }
    function GetInvoice() {
        //alert('Hi')
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'invoice/getinvoice',
            params: { hotelID: $scope.CurrentUser.HotelID, cultureCode: $scope.langCode, offset: ($scope.currentPage - 1) * $scope.rowsPerPage }
        }).success(function (response, status, headers, config) {
            $scope.rowCollection = response.rows;
            $scope.InvoiceDetail = [].concat($scope.rowCollection);
            $scope.paging = $scope.pagination(response.totalRows, $scope.currentPage, $scope.rowsPerPage);
        }).error(function (response) {
            alert('error')
        });
    }

    function GetpendindInvoice() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'invoice/getpendinginvoice',
            params: { cultureCode: $scope.langCode, offset: ($scope.currentPage - 1) * $scope.rowsPerPage }
        }).success(function (response, status, headers, config) {
            $scope.rowCollection = response.rows;
            $scope.InvoicePendingDetail = [].concat($scope.rowCollection);
            $scope.paging1 = $scope.pagination(response.totalRows, $scope.currentPage, $scope.rowsPerPage);
           // alert($scope.InvoicePendingDetail)
        }).error(function (response) {
            alert('error')
        });
    }

    $scope.InvoiceDetails = function (id) {
        sessionFactory.SetData(SessionStore.InvoiceDetailID, id);
        $location.path("invoiceDetails-" + sessionFactory.GetData(SessionStore.currentLanguage));
    };

    $scope.ShowHide1 = function () {
        //alert("hi")
        $scope.IsHidden1 = $scope.IsHidden1 ? false : true;
    }
    $scope.ShowHide2 = function () {
        //alert("hi")
        $scope.IsHidden2 = $scope.IsHidden2 ? false : true;
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
    $scope.setPage1 = function ($page) {
        $location.search('page', $page);

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
