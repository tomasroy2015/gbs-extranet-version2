/**
 * Created by Tomas on 07-Nov-16.
 */
angular.module("gbsApp").controller("roomRateAvailabilityController",
    function($scope,$rootScope,$location,$routeParams,$timeout,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$modal,dropdownFactory,$http) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.selectedYear = 4;
        $scope.selectedRoom = null;
        $scope.selectedPrice = null;
        $scope.selectedPartner = null;
        $scope.singlePrice=null;
        $scope.doublePrice = null;
        $scope.roomPrice = null;
        $scope.availability = null;
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
            var today = new Date();
            $scope.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            $scope.endDate = getLastWeekDate();

            var currentTime = new Date();
            $scope.currentTime = currentTime;
            $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

            $scope.today = 'Today';
            $scope.clear = 'Clear';
            $scope.close = 'Close';
            $scope.weekDays = [];
            var days = new Date().getDay();
//            $scope.minDate = (new Date($scope.startDate.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
//            $scope.maxDate = (new Date($scope.startDate.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
            InitializeData();
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
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
            return lastWeek ;
        }
        function InitializeData(){
            $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/getRoomsByHotel',params: {hotelID:$scope.CurrentUser.HotelID,culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.rooms = response;
                $scope.selectedRoom =  $scope.rooms[0].ID;
            }).error(function (response){});

            $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/getPricePolicy',params: {culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.pricePolicies = response;
                $scope.selectedPrice = $scope.pricePolicies[0].ID;

            }).error(function (response){});

            $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/getAccomodationByID',params: {Id:$scope.CurrentUser.HotelAccommodationTypeID,culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.partners = response;
                $scope.selectedPartner = $scope.partners[0].ID;
            }).error(function (response){});
        }
        function Refresh(){
            $timeout(function () {
                $http({method: 'GET',url: appSettings.API_BASE_URL + 'roomRateAvailability/getDays',params: {culture:$scope.langCode}
                }).success(function (response, status, headers, config) {
                    $scope.days = response;

                    $scope.btnShow_click();
                }).error(function (response){});

               // var startDate  = angular.element('#inputStart').val().toString('dd/mm/yyyy');
               // var endDate = angular.element('#inputEnd').val().toString('dd/mm/yyyy');
            }, 1000);
        }
        $scope.exportTable = function (type) {
            var url = appSettings.API_BASE_URL + "Download.aspx";
            $scope.weekDays = "";
            var startDate  = angular.element('#inputStart').val().toString('dd/mm/yyyy');
            var endDate = angular.element('#inputEnd').val().toString('dd/mm/yyyy');
            var values = "";
            var chkDay = document.getElementsByName('chkDay');
            for (var i = 0; i < chkDay.length; i++) {
                if (chkDay[i].checked == true) {
                    values  = values + chkDay[i].value + ",";
                }
            }
            if(values.length > 0){
                $scope.weekDays = values;
            }else{
                $scope.weekDays = "1,2,3,4,5,6,7";
            }

            var param = "hotelID="+$scope.CurrentUser.HotelID;
               param += "&culture="+$scope.langCode;
               param +="&StartDate="+startDate;
               param += "&Enddate="+endDate;
               param += "&RoomType="+$scope.selectedRoom;
               param += "&PricePolicy="+$scope.selectedPrice;
               param += "&AccommodationType="+$scope.selectedPartner;
               param += "&WeekDay="+$scope.weekDays;
               param += "&filetype="+type;
            url += (url.split('?')[1] ? '&' : '?') + param;
            window.location.href = url;
//            $http({
//                url: appSettings.API_BASE_URL + 'roomRateAvailability/exportData',
//                method: 'POST',
//                params: {fileType:type},
//                data: $scope.roomRateAvailability,
//                responseType: 'arraybuffer'
//            }).success(function (data, status, headers) {
//                headers = headers();
//
//                //var filename = headers['x-filename'];
//                //var contentType = headers['content-type'];
//
//                var linkElement = document.createElement('a');
//                try {
//                    var blob = new Blob([data], { type: 'application/octet-stream' });
//                    var url = window.URL.createObjectURL(blob);
//
//                    linkElement.setAttribute('href', url);
//                    linkElement.setAttribute("download", "RoomData.xls");
//
//                    var clickEvent = new MouseEvent("click", {
//                        "view": window,
//                        "bubbles": true,
//                        "cancelable": false
//                    });
//                    linkElement.dispatchEvent(clickEvent);
//                } catch (ex) {
//                    console.log(ex);
//                }
//            }).error(function (data) {
//                console.log(data);
//            });
        };
//        $scope.exportTable = function(type){
//            var url = appSettings.API_BASE_URL + 'roomRateAvailability/exportData'+"/"+type;
//            //download(url,"RoomData.xls");
//            $http({
//                url: appSettings.API_BASE_URL + 'roomRateAvailability/exportData',
//                method: 'POST',
//                responseType: 'arraybuffer',
//                params: {fileType:type},
//                data: $scope.roomRateAvailability //this is your json data string
////                headers: {
////                    'Content-type': 'application/json',
////                    'Accept': 'application/xls'
////                }
//            }).success(function(data){
//                var blob = new Blob([data], {
//                    type: 'application/xls'
//                });
//
//                FileSaver.saveAs(blob, 'RoomData' + '.xls');
//            }).error(function(){
//                //Some error log
//            });
//
//        };

        function download(url, defaultFileName) {
//            var self = this;
//            var deferred = $q.defer();
//            var data = $scope.roomRateAvailability;
//            $http.post(url,data, { responseType: "arraybuffer" }).success(
//                function (data, status, headers) {
////                    var type = headers('Content-Type');
////                    var disposition = headers('Content-Disposition');
////                    if (disposition) {
////                        var match = disposition.match(/.*filename=\"?([^;\"]+)\"?.*/);
////                        if (match[1])
////                            defaultFileName = match[1];
////                    }
////                    defaultFileName = defaultFileName.replace(/[<>:"\/\\|?*]+/g, '_');
//                    var blob = new Blob([data], { type: 'application/xls' });
//                    FileSaver.saveAs(blob, defaultFileName);
//                    deferred.resolve(defaultFileName);
//                }, function (data, status) {
//                    var e = /* error */
//                        deferred.reject(e);
//                });
//            return deferred.promise;
        }
        $scope.downloadFile = function(httpPath) {
            // Use an arraybuffer
            var data = $scope.roomRateAvailability;
            $http.post(httpPath,data, { responseType: 'arraybuffer' })
            .success( function(data, status, headers) {

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || 'download.bin';

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try
                {
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], { type: contentType });
                    if(navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if(saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch(ex)
                {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if(!success)
                {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if(urlCreator)
                    {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if('download' in link)
                        {
                            // Try to simulate a click
                            try
                            {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], { type: contentType });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch(ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if(!success)
                        {
                            // Fallback to window.location method
                            try
                            {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], { type: octetStreamMime });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch(ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if(!success)
                {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }
            })
            .error(function(data, status) {
                console.log("Request failed with status: " + status);

                // Optionally write the error out to scope
                $scope.errorDetails = "Request failed with status: " + status;
            });
        };
        $scope.btnShow_click = function(){
            $scope.weekDays = "";
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
            var values = "";
            var chkDay = document.getElementsByName('chkDay');
            for (var i = 0; i < chkDay.length; i++) {
                if (chkDay[i].checked == true) {
                    values  = values + chkDay[i].value + ",";
                }
            }
            if(values.length > 0){
                $scope.weekDays = values;
            }else{
                $scope.weekDays = "1,2,3,4,5,6,7";
            }

//            $http({
//                method: 'GET',
//                url: appSettings.API_BASE_URL + 'propertyStatistics/validateDate',
//                params: {StartDate:startDate,Enddate:endDate}
//            }).success(function (response, status, headers, config) {
//                if(response > 30){
//                    Materialize.toast("The day range cannot be selected more than a month.",5000,'red');
//                }else {
                    $http({method: 'GET',url: appSettings.API_BASE_URL + 'roomRateAvailability/getRoomAvailabilityAndRate',
                        params: {hotelID:$scope.CurrentUser.HotelID,culture:$scope.langCode,StartDate:startDate,Enddate:endDate,
                                RoomType:$scope.selectedRoom,PricePolicy:$scope.selectedPrice,
                                AccommodationType:$scope.selectedPartner,WeekDay:$scope.weekDays}
                    }).success(function (response, status, headers, config) {
                            $scope.roomRateAvailability = response;
                    }).error(function (response){});
//                }
//            }).error(function (response) {
//
//            });
        };

        $scope.clickSingle = function(){
            if($scope.singlePrice != null) {
                _.forEach($scope.roomRateAvailability, function (f) {
                    f.SinglePrice = $scope.singlePrice;
                });
            }
        };
        $scope.clickDouble = function(){
            var doublePriceAppend = document.getElementById('txtDoublePriceAppend').value;
            if(doublePriceAppend != "") {
                _.forEach($scope.roomRateAvailability, function (f) {
                    f.DoublePrice = doublePriceAppend;
                });
            }
        };
        $scope.clickRoom = function(){
            var roomPriceAppend = document.getElementById('txtRoomPriceAppend').value;
            if(roomPriceAppend != "") {
                _.forEach($scope.roomRateAvailability, function (f) {
                    f.RoomPrice = roomPriceAppend;
                });
            }
        };
        $scope.clickAvailable = function(){
            if($scope.availability != null) {
                _.forEach($scope.roomRateAvailability, function (f) {
                    f.AvailableRoomCount = $scope.availability;
                });
            }
        };
        $scope.saveRoomRate = function(){
            var startDate  = angular.element('#inputStart').val().toString('dd/mm/yyyy');
            var endDate = angular.element('#inputEnd').val().toString('dd/mm/yyyy');
            $http({
                method: 'POST',
                url: appSettings.API_BASE_URL + 'roomRateAvailability/saveRoomAvailabilityAndRate',
                params: {
                           startDate:startDate,endDate:endDate,culture:$scope.langCode,hotelID:$scope.CurrentUser.HotelID,
                           accommodationType:$scope.selectedPartner,pricePolicy:$scope.selectedPrice,
                           roomID:$scope.selectedRoom,sessionID:$scope.CurrentUser.SessionID
                        },
                data:$scope.roomRateAvailability
            }).success(function (response, status, headers, config) {
                Materialize.toast("Room availability and rate updated successfully.",5000,'green');
                $scope.btnShow_click();
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
            mainFactory.SetViewType(ViewType.Statistics);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });

