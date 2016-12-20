/**
 * Created by Tomas on 21-Nov-16.
 */
angular.module("gbsApp").controller("promotionController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$http,$timeout) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.invalidInput = false;
        var today = new Date();
        var initDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        $scope.promotion = {PromotionID:0,DiscountPercentage:5,HasDiscount:false,
                            AccommodationStartDate:null,AccommodationEndDate:null,
                            DayCount:null,EarlyBookerMargin:null,
                            LastMinuteMargin:null,BookingDate:"",ValidForAllRoomTypes:true,
                            SecretDeal:true};
        var currentTime = new Date();
        $scope.currentTime = currentTime;
        $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        $scope.today = 'Today';
        $scope.clear = 'Clear';
        $scope.close = 'Close';
        $scope.WeekDay = "";
        $scope.PricePolicy = "";
        $scope.RoomCount = "";
        var days = new Date().getDay()-4;
        $scope.minDate = (new Date( $scope.currentTime.getTime())).toISOString();

        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
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
            RefreshPromotion();
        };

        function RefreshPromotion(){
            $http({method: 'GET',url: appSettings.API_BASE_URL + 'promotion/getPromotions',params: {culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.promotions = response;
                $scope.selectedPromotion = $scope.promotions[0];
                $scope.setColor={'background-color':$scope.selectedPromotion.Color};
                $scope.setArrowColor = {'color':$scope.selectedPromotion.Color};
                $scope.barColorStyle = ".slider.slider-horizontal .slider-selection { background: " + $scope.selectedPromotion.Color + "; }";
                LoadViewData();
            }).error(function (response){
                Materialize.toast("Server error occured",1000,"red");
            });
        }

        function LoadViewData(){
            $timeout(function(){
                $http({method: 'GET',url: appSettings.API_BASE_URL + 'promotion/loadPromotionView',params: {hotelID:$scope.CurrentUser.HotelID, culture:$scope.langCode}
                }).success(function (response, status, headers, config) {
                    $scope.promotionItems = response;
                    LoadDayData();
                    LoadGridData();
                }).error(function (response){

                });
            },1000);

        }
        function LoadDayData(){

                $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/fillUnitList',params: {startIndex:2, endIndex:$scope.promotionItems.MaximumDayCountForMinimumStayPromotion}
                }).success(function (response, status, headers, config) {
                    $scope.dayCount = response;

                }).error(function (response){

                });

                $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/fillUnitList',params: {startIndex:1, endIndex:$scope.promotionItems.MaximumHourCountForMinimumStayPromotion}
                }).success(function (response, status, headers, config) {
                    $scope.hourCount = response;

                }).error(function (response){

                });

        }
        function LoadGridData(){
            $http({method: 'GET',url: appSettings.API_BASE_URL + 'promotion/getAllPromotions',
                params: {hotelID:$scope.CurrentUser.HotelID,culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.allPromotion = response;
                var data = _.filter(response,function(r){
                     return r.PromotionType == $scope.selectedPromotion.PromotionType;
                });
                $scope.gridData = data;

            }).error(function (response){

            });
        }
        $scope.tabSelection = function(value){
            $scope.selectedPromotion = value;
            $scope.setColor={'background-color':$scope.selectedPromotion.Color};
            $scope.setArrowColor = {'color':$scope.selectedPromotion.Color};
            $scope.barColorStyle = ".slider.slider-horizontal .slider-selection { background: " + $scope.selectedPromotion.Color + "; }";
            var data = _.filter($scope.allPromotion,function(r){
                return r.PromotionType == $scope.selectedPromotion.PromotionType;
            });
            $scope.gridData = data;
        };
        $scope.activeDeal = function(){
            $scope.invalidInput = false;
            if($scope.promotion.AccommodationStartDate == null || $scope.promotion.AccommodationStartDate == ""){
                $scope.invalidInput = true;
                return;
            }
            if($scope.promotion.AccommodationEndDate == null || $scope.promotion.AccommodationEndDate == ""){
                $scope.invalidInput = true;
                return;
            }
            if($scope.selectedPromotion.PromotionType == "EarlyBooker"){
                if($scope.promotion.EarlyBookerMargin == null){
                    return;
                }
            }
            if($scope.selectedPromotion.PromotionType == "MinimumStay"){
                if($scope.promotion.DayCount == null){
                    return;
                }
            }
            if($scope.selectedPromotion.PromotionType == "LastMinute"){
                if($scope.promotion.LastMinuteMargin == null){
                    return;
                }
            }
            if($scope.selectedPromotion.PromotionType == "TwentyFourHourPromotion"){
                if($scope.promotion.BookingDate == null || $scope.promotion.BookingDate == ""){
                    $scope.invalidInput = true;
                    return;
                }else{
                    $scope.promotion.BookingDate = angular.element('#inputBooking').val().toString("dd/MM/yyyy");
                }
            }

//            if($scope.promotion.AccommodationStartDate > $scope.promotion.AccommodationEndDate){
//                Materialize.toast("Invalid Date selection,Start Date can't be smaller than End Date",5000,'red');
//                return;
//            }
            var policy="";var count="";var days="";
            var chkDay = document.getElementsByName('chkDay');
            for (var i = 0; i < chkDay.length; i++)
            {
                if(chkDay[i].checked==true)
                {
                    days = days + chkDay[i].value+",";
                }
                $scope.WeekDay = days;
            }

            var chkPricePolicies = document.getElementsByName('chkRate');
            for (var i = 0; i < chkPricePolicies.length; i++) {
                if (chkPricePolicies[i].checked == true) {
                    policy = policy + chkPricePolicies[i].value+",";
                    //$scope.PricePolicy.push(chkPricePolicies[i].value)
                }
                $scope.PricePolicy = policy;
            }
            var chkRoomType = document.getElementsByName('chkRoomType');
            for (var i = 0; i < chkRoomType.length; i++) {
                if (chkRoomType[i].checked == true) {
                    count = count + chkRoomType[i].value+",";
                    //$scope.RoomCount.push(chkRoomType[i].value)
                }
                else {
                    $scope.validForAllRoomTypes="false"
                }
                $scope.RoomCount = count;
            }
            $scope.RoomType = $scope.selectedPromotion.PromotionType;

            var value = $('.tooltip-inner').text();
            //document.querySelector('.slider-input').value;
            $scope.promotion.DiscountPercentage = value;
            $scope.promotion.HasDiscount = value ? true : false;
            $scope.promotion.PromotionID = $scope.selectedPromotion.ID;
            $scope.promotion.ValidForAllRoomTypes = $scope.validForAllRoomTypes;
            $scope.promotion.AccommodationStartDate = angular.element('#inputStart').val().toString("dd/MM/yyyy");
            $scope.promotion.AccommodationEndDate = angular.element('#inputEnd').val().toString("dd/MM/yyyy");
            $http({method: 'POST',url: appSettings.API_BASE_URL + 'promotion/promotionInsert',
                      data:$scope.promotion,
                      params: {
                          WeekDay:$scope.WeekDay,PricePolicy:$scope.PricePolicy,RoomCount:$scope.RoomCount,RoomType:$scope.RoomType,
                          HotelID:$scope.CurrentUser.HotelID, userID:$scope.CurrentUser.ID,culture:$scope.langCode
                      }
            }).success(function (response, status, headers, config) {
                if(response == "Conflict"){
                    Materialize.toast("Same type promotion exists for the submitted period.",5000,'red');
                }else {
                    Materialize.toast("Deal activated successfully.", 5000, 'green');
                    LoadGridData();
                }
            }).error(function (response){
                 Materialize.toast("Error occured in database",5000,'red');
            });
        };
        $scope.delete = function(data){
            $http({method: 'POST',url: appSettings.API_BASE_URL + 'promotion/delete',
                params: {
                   ID:data.ID
                }
            }).success(function (response, status, headers, config) {
                Materialize.toast("Selected promotion deleted successfully.",5000,'green');
                LoadGridData();
            }).error(function (response){
                Materialize.toast("Error occured in database",5000,'red');
            });
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.Parameter);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };
    });