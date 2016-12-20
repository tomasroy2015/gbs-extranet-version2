/**
 * Created by Tomas on 09-Dec-16.
 */
angular.module("gbsApp").controller("reservationController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,dropdownFactory,$http,$filter,$rootScope) {

        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        $scope.rowCollection=[];
        $scope.displayColl=[];
        $scope.currentPage  =   ($routeParams.page) ? parseInt($routeParams.page) : 1;
        $scope.currentPage  =   ($scope.currentPage < 1) ? 1 : $scope.currentPage;
        $scope.rowsPerPage = 10;
        $scope.filterItems = [{Type:1,Name:"Booked Date"},
                              {Type:2,Name:"Reservation Number"},{Type:3,Name:"Guest Name"},
                              {Type:4,Name:"Arrival"},{Type:5,Name:"Departure"}];
        $scope.reservationNo = null;
        $scope.guestName = null;

        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeController = function () {
            $scope.IsHotelAdmin =  $scope.CurrentUser.IsHotelAdmin;

            $scope.ViewType = ViewType;
            $scope.MenuType = MenuType;

            var language = sessionFactory.GetData(SessionStore.currentLanguage);
            $scope.langCode = language;
            if(language !== null && !angular.isUndefined(language)){
                $scope.selectLanguage = accountFactory.getlanguageName();
            }
            $scope.selectedView = mainFactory.GetCurrentView();
            $scope.selectedMenu = mainFactory.GetCurrentMenu();
            $scope.selectedFilter = $scope.filterItems[0];
            GetReservations();

        };
        function getLastWeekDate(){
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
            return lastWeek ;
        }
        function GetReservations(){
            $http({method: 'GET',url: appSettings.API_BASE_URL + 'reservation/getReservationByProperty',
                params: {hotelID:$scope.CurrentUser.HotelID,
                         cultureCode:$scope.langCode,
                         offset: ($scope.currentPage - 1)* $scope.rowsPerPage}
            }).success(function (response, status, headers, config) {
                $scope.rowCollection = response.rows;
                $scope.displayColl = [].concat($scope.rowCollection);
                $scope.paging  =   $scope.pagination(response.totalRows, $scope.currentPage, $scope.rowsPerPage);
            }).error(function (response){
            });
        }
        $scope.btn_Clear = function(){
            $scope.displayColl = null;
            $scope.displayColl = [].concat($scope.rowCollection);
        };
        $scope.changeText = function(){
            var value =  angular.element('#search').val();
            var data = $filter('filter')($scope.rowCollection,value);
            $scope.displayColl = null;
            $scope.displayColl = [].concat(data);
        };
        $scope.btn_Search = function(){
            if($scope.selectedFilter.Type == 1) {
                var startDate = angular.element('#inputStart').val();
                var endDate = angular.element('#inputEnd').val();
                if(startDate == ""){
                    Materialize.toast("Start date must be selected",2000,"red");
                    return;
                }
                if(endDate == ""){
                    Materialize.toast("End date must be selected",2000,"red");
                    return;
                }
                var s = new Date(startDate).getTime();
                var e = new Date(endDate).getTime();
                var data = _.filter($scope.rowCollection, function (f) {
                    var r = new Date(f.ReservationDate).getTime();

                    return r >= s && r <= e;
                });
                $scope.displayColl = null;
                $scope.displayColl = [].concat(data);
            }
            if($scope.selectedFilter.Type == 2){
                var id = angular.element('#numReservation').val();
                var data = _.filter($scope.rowCollection, function (f) {
                    return f.ReservationID == id;
                });
                $scope.displayColl = null;
                $scope.displayColl = [].concat(data);
            }
            if($scope.selectedFilter.Type == 3){
                var name = angular.element('#txtGuest').val();
                var data = _.filter($scope.rowCollection, function (f) {
                    return f.FullName.toLowerCase() == name.toLowerCase();
                });
                $scope.displayColl = null;
                $scope.displayColl = [].concat(data);
            }
            if($scope.selectedFilter.Type == 4){
                var startDate = angular.element('#inputStart').val();
                var endDate = angular.element('#inputEnd').val();
                if(startDate == ""){
                    Materialize.toast("Start date must be selected",2000,"red");
                    return;
                }
                if(endDate == ""){
                    Materialize.toast("End date must be selected",2000,"red");
                    return;
                }
                var s = new Date(startDate).getTime();
                var e = new Date(endDate).getTime();
                var data = _.filter($scope.rowCollection, function (f) {
                    var r = new Date(f.CheckInDate).getTime();

                    return r >= s && r <= e;
                });
                $scope.displayColl = null;
                $scope.displayColl = [].concat(data);
            }
            if($scope.selectedFilter.Type == 5){
                var startDate = angular.element('#inputStart').val();
                var endDate = angular.element('#inputEnd').val();

                if(startDate == ""){
                    Materialize.toast("Start date must be selected",2000,"red");
                    return;
                }
                if(endDate == ""){
                    Materialize.toast("End date must be selected",2000,"red");
                    return;
                }
                var s = new Date(startDate).getTime();
                var e = new Date(endDate).getTime();
                var data = _.filter($scope.rowCollection, function (f) {
                    var r = new Date(f.CheckOutDate).getTime();

                    return r >= s && r <= e;
                });
                $scope.displayColl = null;
                $scope.displayColl = [].concat(data);
            }
        };
        $scope.reservationDetails = function(id){
            sessionFactory.SetData(SessionStore.ReservationID,id);
            $location.path("reservationDetails-"+sessionFactory.GetData(SessionStore.currentLanguage));
        };
        $scope.reservationHistory = function(id,type){
            $rootScope.OperationType = type;
            sessionFactory.SetData(SessionStore.ReservationID,id);
            $location.path("reservationHistory-"+sessionFactory.GetData(SessionStore.currentLanguage));
        };
        $scope.backToHome = function(id){
            $location.path("reservation-"+sessionFactory.GetData(SessionStore.currentLanguage));
        };
        $scope.pagination =   function($totalRows, $curPage, $perPage){
            var $maxPagesLoops   = 10;  // Display 5 pages on the screen.
            var $totalPages  = Math.ceil($totalRows/$perPage); //Calculate the total pages
            var $start      = (Math.ceil($curPage/$maxPagesLoops) - 1) * $maxPagesLoops + 1;
            var $prev       = ($start > $maxPagesLoops) ? ($start - 1) : 0;
            var $end;
            if ($totalPages < $maxPagesLoops) {
                $end  = $totalPages;
            } else{
                $end  = (($start + $maxPagesLoops - 1) > $totalPages) ? $totalPages : ($start + $maxPagesLoops - 1);
            }
            var $next   = ($end < $totalPages) ? ($end + 1) : 0;
            var $paging = {};
            $paging.first = 1;
            $paging.prev  = $prev;
            $paging.pages = [];
            for (var i = $start; i < ($end + 1); i++) {
                $paging.pages.push(i);
            }
            $paging.next  = $next;
            $paging.current = $curPage;
            $paging.last  = $totalPages;
            return $paging; //The returned paging object.
        };
        /*
         setLimitLength function
         $length: the rows per page: 10 20 50.
         result: Reload this page.
         */
        $scope.setLimitLength   = function($length){
            $location.search('length', $length);
            $location.search('page', 1);
        };
        /*
         setPage function
         $page: the page number to go.
         result: Reload this page.
         */
        $scope.setPage  =   function($page){
            $location.search('page', $page);

        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.Reservations);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });