/**
 * Created by Tomas on 27-Oct-16.
 */
angular.module("gbsApp").controller("propertyStatisticsController",
    function($scope,$rootScope,$location,$routeParams,$timeout,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$modal,dropdownFactory,propertyStatisticsFactory,$http) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.selectedYear = 4;
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeController = function () {
            $scope.IsHotelAdmin =  $scope.CurrentUser.IsHotelAdmin;
            $scope.ViewType = ViewType;
            $scope.MenuType = MenuType;
            $scope.Type = {
                Statistics:0,
                Reservation:1
            };

            var language = sessionFactory.GetData(SessionStore.currentLanguage);
            $scope.langCode = language;
            if(language !== null && !angular.isUndefined(language)){
                $scope.selectLanguage = accountFactory.getlanguageName();
            }
            $scope.selectedView = mainFactory.GetCurrentView();
            $scope.selectedMenu = mainFactory.GetCurrentMenu();
            var today = new Date();
            $scope.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            $scope.endDate = getLastWeekDate();
            $scope.statisticsYears = dropdownFactory.StatisticsYears();
            $scope.selMenu = $scope.Type.Statistics;

            var currentTime = new Date();
            $scope.currentTime = currentTime;
//            $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//            $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//            $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//            $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
//            $scope.disable = [false, 1, 7];
//            $scope.today = 'Today';
//            $scope.clear = 'Clear';
//            $scope.close = 'Close';
            var days = new Date().getDay();
//            $scope.minDate = (new Date($scope.startDate.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
//            $scope.maxDate = (new Date($scope.startDate.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
            Refresh();
        };
        $scope.showdp = false;
        $scope.showcalendar = function ($event) {
            $scope.showdp = !$scope.showdp;
        };
        $scope.clickType = function(type){
            $scope.selMenu = type;
        };
        function getLastWeekDate(){
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
            return lastWeek ;
        }
        function Refresh(){
            $timeout(function () {
                var startDate  = angular.element('#inputStart').val().toString('dd/mm/yyyy');
                var endDate = angular.element('#inputEnd').val().toString('dd/mm/yyyy');
                propertyStatisticsFactory.GetDailyStatistics({culture:$scope.langCode,startDate:startDate,endDate:endDate,hotelID:$scope.CurrentUser.HotelID});
            }, 1000);
        }
        $scope.$on(Notify.PROPERTY_STATISTICS_DAILY_DATA_SUCCESSFUL,function(event,response){
             $scope.dailyStatistics = propertyStatisticsFactory.DailyStatisticsData();
        });
        $scope.getDailyStatistics = function(){
            propertyStatisticsFactory.GetDailyStatistics({culture:$scope.langCode,startDate:$scope.startDate,endDate:$scope.endDate,hotelID:$scope.CurrentUser.HotelID});
        };
        $scope.btnShow_click = function(){
            var startDate  = angular.element('#inputStart').val().toString('dd/mm/yyyy');
            var endDate = angular.element('#inputEnd').val().toString('dd/mm/yyyy');
            if(startDate == ""){
                Materialize.toast("Start Date must be selected.",5000,'red');
                return;
            }
            if(endDate == ""){
                Materialize.toast("End Date must be selected.",5000,'red');
                return;
            }

            $http({
                    method: 'GET',
                    url: appSettings.API_BASE_URL + 'propertyStatistics/validateDate',
                    params: {StartDate:startDate,Enddate:endDate}
                }).success(function (response, status, headers, config) {
                    if(response > 30){
                        Materialize.toast("The day range cannot be selected more than a month.",5000,'red');
                    }else {
                        propertyStatisticsFactory.GetDailyStatistics({culture: $scope.langCode, startDate: startDate, endDate: endDate, hotelID: $scope.CurrentUser.HotelID});
                    }
                }).error(function (response) {

             });
        };
//        $scope.$on(Notify.STATISTICS_YEAR_DROPDOWN_DATA_SUCCESSFULL,function(event,response){
//           $scope.statisticsYears = dropdownFactory.StatisticsYears();
//          // $scope.selectedYear = $scope.statisticsYears[0];
//        });

        $scope.$on(Notify.PROPERTY_STATISTICS_MONTHLY_DATA_SUCCESSFUL,function(event,response){
            $scope.monthlyStatistcs = propertyStatisticsFactory.MonthlyStatisticsData();
        });
        $scope.$on(Notify.PROPERTY_STATISTICS_YEARLY_DATA_SUCCESSFUL,function(event,response){
            $scope.yearlyStatistcs = propertyStatisticsFactory.YearlyStatisticsData();
        });
        $scope.click_Month = function(){
            var sYear = _.find($scope.statisticsYears,function(i){
                return i.ID == $scope.selectedYear;
            });
            propertyStatisticsFactory.GetMonthlyStatistics({culture:$scope.langCode,year:sYear.Name,hotelID:$scope.CurrentUser.HotelID});
        };
        $scope.click_Year = function(){
            propertyStatisticsFactory.GetYearlyStatistics({culture:$scope.langCode,hotelID:$scope.CurrentUser.HotelID});
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.selectStatisticsYear = function(value){
            $scope.selectedYear = value;
            var sYear = _.find($scope.statisticsYears,function(i){
                return i.ID == value;
            });
            propertyStatisticsFactory.GetMonthlyStatistics({culture:$scope.langCode,year:sYear.Name,hotelID:$scope.CurrentUser.HotelID});
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.Statistics);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });

