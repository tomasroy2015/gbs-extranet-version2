/**
 * Created by Tomas on 31-Oct-16.
 */
angular.module("gbsApp").controller("hotelRateAvailabilityController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$http) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.allowRatesEdit = false;
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.months = [{ID:0,Name:'Jan'},
                        {ID:1,Name:'Feb'},
                        {ID:2,Name:'Mar'},
                        {ID:3,Name:'Apr'},
                        {ID:4,Name:'May'},
                        {ID:5,Name:'Jun'},
                        {ID:6,Name: 'Jul'},
                        {ID:7,Name: 'Aug'},
                        {ID:8,Name: 'Sep'},
                        {ID:9,Name:'Oct'},
                        {ID:10,Name:'Nov'},
                        {ID:11,Name:'Dec'}];
        $scope.selectedMonth = null;
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeController = function () {

            $scope.IsHotelAdmin =  $scope.CurrentUser.IsHotelAdmin;

            $scope.ViewType = ViewType;
            $scope.MenuType = MenuType;
            var today = new Date();
            $scope.year = today.getFullYear();
            $scope.selectedMonth = today.getMonth();
            var language = sessionFactory.GetData(SessionStore.currentLanguage);
            $scope.langCode = language;
            if(language !== null && !angular.isUndefined(language)){
                $scope.selectLanguage = accountFactory.getlanguageName();
            }
            $scope.selectedView = mainFactory.GetCurrentView();
            $scope.selectedMenu = mainFactory.GetCurrentMenu();
            InitializeOverView();
        };

        function InitializeOverView(){
            var date = new Date();
            var sDate = $scope.year+"/"+($scope.selectedMonth+1)+"/"+"1";//new Date(date.getFullYear(), date.getMonth(), 1);
            var eDate = new Date($scope.year,($scope.selectedMonth+1),0);// new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var startDate = formatDate(sDate);
            var endDate = formatDate(eDate);

            $http({
                method: 'GET',
                url: appSettings.API_BASE_URL + 'hotelRateAvailability/getHotelRateOverview',
                params: {culture:$scope.langCode ,hotelID:$scope.CurrentUser.HotelID,startDate:startDate,endDate:endDate}
            }).success(function (response, status, headers, config) {
                $scope.rateOverView = response;
                _.forEach($scope.rateOverView.Room,function(n){
                    n.RoomDays = _.filter($scope.rateOverView.RoomDay,function(i){return i.HotelRoomID == n.ID});
                    n.RefundablePrices = [];
                    n.NonRefundablePrices = [];
                    if(n.RoomDays && n.RoomDays.length > 0) {
                        _.forEach(n.RoomDays, function (d) {

                            var rPrice = _.find($scope.rateOverView.RefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (rPrice == null || angular.isUndefined(rPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(nobj);
                            } else {
                                rPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(rPrice);
                            }

                            var nPrice = _.find($scope.rateOverView.NonRefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (nPrice == null || angular.isUndefined(nPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nobj);
                            } else {
                                nPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nPrice);
                            }
                        });
                        // n.RefundablePrices = _.filter($scope.rateOverView.RefundablePrices,function(i){return i.HotelRoomID == n.ID});
                        // n.NonRefundablePrices = _.filter($scope.rateOverView.NonRefundablePrices,function(i){return i.HotelRoomID == n.ID});
                    }else{
                        _.forEach($scope.rateOverView.Day,function(d){
                            var nobj = {};
                            nobj.DateID = d.DateID;
                            nobj.HotelRoomID = n.HotelRoomID;
                            nobj.RoomPrice = "";
                            nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                            n.RefundablePrices.push(nobj);
                            n.NonRefundablePrices.push(nobj);
                        });
                    }                });
            }).error(function (response) {
                Materialize.toast("Server error occured ",5000,'red');
            });
        }

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('/');
        }

        $scope.goForward = function(){
            $scope.year = $scope.year + 1;
            var startDate = $scope.year+"/"+($scope.selectedMonth+1)+"/"+"1";
            var eDate = new Date($scope.year,($scope.selectedMonth+1),0);
            var endDate = formatDate(eDate);
            $http({
                method: 'GET',
                url: appSettings.API_BASE_URL + 'hotelRateAvailability/getHotelRateOverview',
                params: {culture:$scope.langCode ,hotelID:$scope.CurrentUser.HotelID,startDate:startDate,endDate:endDate}
            }).success(function (response, status, headers, config) {
                $scope.rateOverView = response;
                _.forEach($scope.rateOverView.Room,function(n){
                    n.RoomDays = _.filter($scope.rateOverView.RoomDay,function(i){return i.HotelRoomID == n.ID});
                    n.RefundablePrices = [];
                    n.NonRefundablePrices = [];
                    if(n.RoomDays && n.RoomDays.length > 0) {
                        _.forEach(n.RoomDays, function (d) {

                            var rPrice = _.find($scope.rateOverView.RefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (rPrice == null || angular.isUndefined(rPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(nobj);
                            } else {
                                rPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(rPrice);
                            }

                            var nPrice = _.find($scope.rateOverView.NonRefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (nPrice == null || angular.isUndefined(nPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nobj);
                            } else {
                                nPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nPrice);
                            }
                        });
                        // n.RefundablePrices = _.filter($scope.rateOverView.RefundablePrices,function(i){return i.HotelRoomID == n.ID});
                        // n.NonRefundablePrices = _.filter($scope.rateOverView.NonRefundablePrices,function(i){return i.HotelRoomID == n.ID});
                    }else{
                        _.forEach($scope.rateOverView.Day,function(d){
                            var nobj = {};
                            nobj.DateID = d.DateID;
                            nobj.HotelRoomID = n.HotelRoomID;
                            nobj.RoomPrice = "";
                            nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                            n.RefundablePrices.push(nobj);
                            n.NonRefundablePrices.push(nobj);
                        });
                    }
                });
            }).error(function (response) {
                Materialize.toast("Server error occured ",5000,'red');
            });
        };
        $scope.backForward = function(){
            $scope.year = $scope.year - 1;

            var startDate = $scope.year+"/"+($scope.selectedMonth+1)+"/"+"1";
            var eDate = new Date($scope.year,($scope.selectedMonth+1),0);
            var endDate = formatDate(eDate);
            $http({
                method: 'GET',
                url: appSettings.API_BASE_URL + 'hotelRateAvailability/getHotelRateOverview',
                params: {culture:$scope.langCode ,hotelID:$scope.CurrentUser.HotelID,startDate:startDate,endDate:endDate}
            }).success(function (response, status, headers, config) {
                $scope.rateOverView = response;
                _.forEach($scope.rateOverView.Room,function(n){
                    n.RoomDays = _.filter($scope.rateOverView.RoomDay,function(i){return i.HotelRoomID == n.ID});
                    n.RefundablePrices = [];
                    n.NonRefundablePrices = [];
                    if(n.RoomDays && n.RoomDays.length > 0) {
                        _.forEach(n.RoomDays, function (d) {

                            var rPrice = _.find($scope.rateOverView.RefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (rPrice == null || angular.isUndefined(rPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(nobj);
                            } else {
                                rPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(rPrice);
                            }

                            var nPrice = _.find($scope.rateOverView.NonRefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (nPrice == null || angular.isUndefined(nPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nobj);
                            } else {
                                nPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nPrice);
                            }
                        });
                        // n.RefundablePrices = _.filter($scope.rateOverView.RefundablePrices,function(i){return i.HotelRoomID == n.ID});
                        // n.NonRefundablePrices = _.filter($scope.rateOverView.NonRefundablePrices,function(i){return i.HotelRoomID == n.ID});
                    }else{
                        _.forEach($scope.rateOverView.Day,function(d){
                            var nobj = {};
                            nobj.DateID = d.DateID;
                            nobj.HotelRoomID = n.HotelRoomID;
                            nobj.RoomPrice = "";
                            nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                            n.RefundablePrices.push(nobj);
                            n.NonRefundablePrices.push(nobj);
                        });
                    }                });
            }).error(function (response) {
                Materialize.toast("Server error occured ",5000,'red');
            });
        };
        $scope.click_Month = function(value){
            $scope.selectedMonth = value.ID;
            var startDate = $scope.year+"/"+($scope.selectedMonth+1)+"/"+"1";
            var eDate = new Date($scope.year,($scope.selectedMonth+1),0);
            var endDate = formatDate(eDate);
            $http({
                method: 'GET',
                url: appSettings.API_BASE_URL + 'hotelRateAvailability/getHotelRateOverview',
                params: {culture:$scope.langCode ,hotelID:$scope.CurrentUser.HotelID,startDate:startDate,endDate:endDate}
            }).success(function (response, status, headers, config) {
                $scope.rateOverView = response;
                _.forEach($scope.rateOverView.Room,function(n){
                    n.RoomDays = _.filter($scope.rateOverView.RoomDay,function(i){return i.HotelRoomID == n.ID});
                    n.RefundablePrices = [];
                    n.NonRefundablePrices = [];
                    if(n.RoomDays && n.RoomDays.length > 0) {
                        _.forEach(n.RoomDays, function (d) {

                            var rPrice = _.find($scope.rateOverView.RefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (rPrice == null || angular.isUndefined(rPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(nobj);
                            } else {
                                rPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.RefundablePrices.push(rPrice);
                            }

                            var nPrice = _.find($scope.rateOverView.NonRefundablePrices, function (f) {
                                return f.HotelRoomID == n.ID && f.DateID == d.DateID
                            });
                            if (nPrice == null || angular.isUndefined(nPrice)) {
                                var nobj = {};
                                nobj.DateID = d.DateID;
                                nobj.HotelRoomID = n.HotelRoomID;
                                nobj.RoomPrice = "";
                                nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nobj);
                            } else {
                                nPrice.HotelAvailableStatus = d.HotelAvailableStatus;
                                n.NonRefundablePrices.push(nPrice);
                            }
                        });
                        // n.RefundablePrices = _.filter($scope.rateOverView.RefundablePrices,function(i){return i.HotelRoomID == n.ID});
                        // n.NonRefundablePrices = _.filter($scope.rateOverView.NonRefundablePrices,function(i){return i.HotelRoomID == n.ID});
                    }else{
                        _.forEach($scope.rateOverView.Day,function(d){
                            var nobj = {};
                            nobj.DateID = d.DateID;
                            nobj.HotelRoomID = n.HotelRoomID;
                            nobj.RoomPrice = "";
                            nobj.HotelAvailableStatus = d.HotelAvailableStatus;
                            n.RefundablePrices.push(nobj);
                            n.NonRefundablePrices.push(nobj);
                        });
                    }                });
            }).error(function (response) {
                Materialize.toast("Server error occured ",5000,'red');
            });
        };

        $scope.CloseOpenAvailabilityCheck = function(room,close){
           var closed = angular.element("#hidHotelAvailabilityStatus_"+room.ID+"_"+close.DateID).val().toString();
           var roomID = angular.element("#hidHotelRoomId_"+room.ID+"_"+close.DateID).val().toString();
            $http({
                method: 'POST',
                url: appSettings.API_BASE_URL + 'hotelRateAvailability/closeOpenAvailability',
                params:{dateValue:angular.element("#hidValueDate_"+close.DateID).val().toString('dd/mm/yyyy'),
                    hotelID:$scope.CurrentUser.HotelID,sessionID:$scope.CurrentUser.SessionID,isClosed:closed,roomID:roomID}
            }).success(function (response, status, headers, config) {
                InitializeOverView();
            }).error(function (response) {
                Materialize.toast("Server error occured ",5000,'red');
            });
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.HotelRateOverView);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });

