/**
 * Created by Tomas on 16-Oct-16.
 */
angular.module("gbsApp").controller("cancelationPolicyController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,dropdownFactory,cancelationPolicyFactory,$modal,Part,$http) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.IsRefundable = false;
        $scope.cancelSummaries = [];
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
            InitializeSummary();
//            dropdownFactory.GetPenaltyRate({culture:$scope.langCode,rateTypeID:Part.Hotel});
//            var param = {culture: $scope.langCode,hotelID: $scope.CurrentUser.HotelID};
//            cancelationPolicyFactory.GetPropertyCancelPolicy(param);
        };
        function InitializeSummary(){
            $http({method: 'GET',url: appSettings.API_BASE_URL + 'propertyCancelPolicy/getPropertyCancelSummary',
                  params: {hotelID:$scope.CurrentUser.HotelID,culture:$scope.langCode}
            }).success(function (response, status, headers, config) {
                $scope.cancelSummaries = response;
            }).error(function (response){
            });
        }
        $scope.$on(Notify.PENALTY_RATE_DATA_PREPARATION_SUCCESSFUL,function(event,response){
            $scope.penaltyRates = dropdownFactory.PenaltyRates();

        });
        $scope.$on(Notify.PROPERTY_CANCELLATION_DATA_PREPARATION_SUCCESSFUL,function(event,response){
            $scope.cancellationInfo = cancelationPolicyFactory.CancellationPolicyInfo();
            $scope.IsRefundable = ($scope.cancellationInfo.CancelTypeID == null || $scope.cancellationInfo.CancelTypeID == 1) ? false: true;
        });
        $scope.click_Refundoption = function(value){
            $scope.IsRefundable = value;
            $scope.cancellationInfo.CancelTypeID = value == false ? 1 : 2;
        };
        $scope.btnAddPolicy_Click = function(type){
            cancelationPolicyFactory.SetCancellationSummary(type);
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'Views/Policies/addCancellationPolicy-en.html',
                controller: ['$scope', '$modalInstance', 'mainFactory','sessionFactory','SessionStore', 'dropdownFactory','Part','$http','cancelationPolicyFactory',
                    function ($scope, $modalInstance, mainFactory,sessionFactory,SessionStore,dropdownFactory,Part,$http,cancelationPolicyFactory) {
                        $scope.IsNonRefund = true;
                        $scope.IsPrepayment = false;

                        var language = sessionFactory.GetData(SessionStore.currentLanguage);
                        var user = sessionFactory.GetObject(SessionStore.userData);
                        $scope.langCode = language;
                        var summaryData = cancelationPolicyFactory.GetCancellationSummary();
                        $scope.title = summaryData.CancelTypeName;
                        $scope.policy={ArrivalTypeID:null,ArrivalRateID:null,PrepaymentTypeID:null,CancelRateID:null,IsPrepayment:false,
                                       IsPublicDisplay:false,IsPrivateDisplay:false,IsPromotionDisplay:false,PolicyDescription:"",PaymentDescription:"",
                                       IsPeriodExists:false};
                        $scope.nPolicy = {selectedTime:null,selectedRateID:null};
                        InitData();
                        function InitData(){
                            $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/getPenaltyRate',params: {culture:$scope.langCode,rateTypeID:Part.CancellationCharge}
                            }).success(function (response, status, headers, config) {
                                 $scope.cancelCharges = response;
                            }).error(function (response){
                            });

                            $http({method: 'GET',url: appSettings.API_BASE_URL + 'dropdown/getPenaltyRate',params: {culture:$scope.langCode,rateTypeID:Part.CancellationDayOnArrival}
                            }).success(function (response, status, headers, config) {
                                $scope.arrivalDays = response;
                            }).error(function (response){
                            });

                            $http({method: 'GET',url: appSettings.API_BASE_URL + 'propertyCancelPolicy/getPrepaymentNames',params: {culture:$scope.langCode}
                            }).success(function (response, status, headers, config) {
                                $scope.prepayments = response;
                            }).error(function (response){
                            });
                        }

                        $scope.clickPreference = function(value){
                            $scope.IsNonRefund = value;

                        };
                        $scope.clickPrepayment = function(value){
                            $scope.IsPrepayment = value;
                        };
                        $scope.selectArrival =function(){
                            if($scope.policy.ArrivalTypeID && $scope.policy.ArrivalTypeID>=0){
                                var item = _.find($scope.arrivalDays,function(f){return f.ID == $scope.policy.ArrivalTypeID;});
                                if(item){
                                    $scope.arrivalDayText = item.Name;
                                }
                            }
                        };
                        $scope.selectedChargeBox = function(){
                            if($scope.policy.ArrivalRateID && $scope.policy.ArrivalRateID>=0){
                                var item = _.find($scope.cancelCharges,function(f){return f.ID == $scope.policy.ArrivalRateID;});
                                if(item){
                                    $scope.arrivalRateText = item.Name;
                                }
                            }
                        };
                        $scope.daySelectChange = function(){
                            if($scope.nPolicy.selectedTime && $scope.nPolicy.selectedTime>=0){
                                var item = _.find($scope.arrivalDays,function(f){return f.ID == $scope.nPolicy.selectedTime;});
                                if(item){
                                    $scope.daySelectText = item.Name;
                                }
                            }
                        };
                        $scope.rateSelectChange = function(){
                            if($scope.policy.CancelRateID && $scope.policy.CancelRateID>=0){
                                var item = _.find($scope.cancelCharges,function(f){return f.ID == $scope.policy.CancelRateID;});
                                if(item){
                                    $scope.rateSelectText = item.Name;
                                }
                            }
                        };
                        $scope.rate2SelectChange = function(){
                            if($scope.nPolicy.selectedRateID && $scope.nPolicy.selectedRateID>=0){
                                var item = _.find($scope.cancelCharges,function(f){return f.ID == $scope.nPolicy.selectedRateID;});
                                if(item){
                                     var rate1 = item.Name.substr(0,2);
                                    var rate2 = $scope.rateSelectText.substr(0,2);
                                    $scope.percentText = rate1-rate2+"%";
                                }
                            }
                        };
                        $scope.closeWindow = function () {
                            $modalInstance.dismiss();
                        };
                        $scope.clickPrepaymentCharge = function(value){
                            $scope.selectedPayment = value;
                        };
                        $scope.btn_Cancel = function () {
                            $modalInstance.dismiss();
                        };
                        $scope.btn_savePolicy = function(){
                            var p = $scope.policy;
                            p.PaymentDescription = document.getElementById("payment").innerText;
                            p.PolicyDescription = document.getElementById("policy").innerText;
                            p.CancelTypeID = summaryData.CancelTypeID;
                            p.HotellD = user.HotelID;
                            $http({
                                method: 'POST',
                                url: appSettings.API_BASE_URL + 'propertyCancelPolicy/savePolicy',
                                params: {
                                   culture:$scope.langCode,userID:user.ID
                                },
                                data:p
                            }).success(function (response, status, headers, config) {
                                Materialize.toast("Cancellation policy updated successfully.",5000,'green');
                                InitializeSummary();
                            }).error(function (response) {
                                Materialize.toast("Server error occured ",5000,'red');
                            });
                        };
                    }],
                size: 'sm',
                keyboard: false,
                backdrop: 'static'
            });
        };
//        $scope.btnSave_Click = function(){
//            if($scope.cancellationInfo.RefundableDayCount == null || angular.isUndefined($scope.cancellationInfo.RefundableDayCount)){
//                $scope.isInvalidCount = true;
//                return;
//            }
//            if($scope.cancellationInfo.PenaltyRateTypeID < 0){
//                $scope.isInvalidRate = true;
//                return;
//            }
//            $scope.IsRefundable = ($scope.cancellationInfo.CancelTypeID == null || $scope.cancellationInfo.CancelTypeID == 1) ? false: true;
//            cancelationPolicyFactory.UpdatePropertyCancelPolicy($scope.cancellationInfo,"/"+$scope.CurrentUser.ID);
//        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.ChildrenPolicies);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });