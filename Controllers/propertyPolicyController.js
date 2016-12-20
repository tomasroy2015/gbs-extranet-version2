/**
 * Created by Tomas on 19-Oct-16.
 */
angular.module("gbsApp").controller("propertyPolicyController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$modal,dropdownFactory,propertyPolicyFactory) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
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
            propertyPolicyFactory.GetPolicySummary({hotelID:$scope.CurrentUser.HotelID});
            dropdownFactory.GetPriceUnits({culture:$scope.langCode});
        };
        $scope.$on(Notify.PROPERTY_POLICY_SUMMARY_DATA_PREPARATION_SUCCESSFUL,function(event,response){
            $scope.policySummary = propertyPolicyFactory.PolicySummaryData();
        });
        $scope.$on(Notify.PROPERTY_POLICY_DATA_PREPARATION_SUCCESSFUL,function(event,response){

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'Views/Policies/addPropertyPolicy.html',
                controller: ['$scope', '$modalInstance', 'mainFactory','sessionFactory', 'propertyPolicyFactory','dropdownFactory','SessionStore',
                    function ($scope, $modalInstance, mainFactory,sessionFactory, propertyPolicyFactory,dropdownFactory,SessionStore) {
                        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
                        $scope.propertyPolicies = propertyPolicyFactory.PropertyPolicyInfo();
                        $scope.priceUnits = dropdownFactory.PriceUnits();
                        $scope.closeWindow = function () {
                            $modalInstance.dismiss();
                        };
                        angular.element(document).ready(function () {
                            Init();
                        });

                        function Init(){
                            var selected = null;
                            _.forEach($scope.propertyPolicies, function (h) {
                                _.forEach(h.PropertyPolicyItems, function (i) {
                                    if(h.ID === i.PropertyPolicyID) {
                                        if(i.IsParentItem) {
                                            selected = _.find(i.PolicyItemUnits, function (u) {
                                                return u.ID == i.UnitID;
                                            });
                                        }

                                        if(selected != null && !angular.isUndefined(selected) && i.IsParentItem == false) {
                                            var headAttb = angular.element('#headerAttribute' + i.ID);
                                            var selAttb = angular.element('#selectAttribute' + i.ID);
                                            var price = angular.element('#numPrice'+ i.ID);
                                            if (selected.IsHideAttribute) {
                                                $(headAttb).css({"display": 'none'});
                                                $(selAttb).css({"display": 'none'});
                                                $(price).css({"display": 'none'});
                                            } else {
                                                $(headAttb).css({"display": ''});
                                                $(selAttb).css({"display": ''});
                                                $(price).css({"display": ''});
                                            }
                                        }
                                    }
                                })
                            });
                        }
                        $scope.selectUnit = function(header,item){
//                            if(item.IsHideAttribute) {
                            var selected = null;
                                _.forEach($scope.propertyPolicies, function (h) {
                                    _.forEach(h.PropertyPolicyItems, function (i) {
                                        if(header.ID === i.PropertyPolicyID) {
                                            if(i.IsParentItem) {
                                                selected = _.find(i.PolicyItemUnits, function (u) {
                                                    return u.ID == item;
                                                });
                                            }

                                            if(selected != null && !angular.isUndefined(selected) && i.IsParentItem == false) {
                                                var headAttb = angular.element('#headerAttribute' + i.ID);
                                                var selAttb = angular.element('#selectAttribute' + i.ID);
                                                var price = angular.element('#numPrice'+ i.ID);
                                                if (selected.IsHideAttribute) {
                                                    $(headAttb).css({"display": 'none'});
                                                    $(selAttb).css({"display": 'none'});
                                                    $(price).css({"display": 'none'});
                                                } else {
                                                    $(headAttb).css({"display": ''});
                                                    $(selAttb).css({"display": ''});
                                                    $(price).css({"display": ''});
                                                }
                                            }
                                        }
                                    })
                                });
//                            }
                        };
                        $scope.btn_Cancel = function () {
                            $modalInstance.dismiss();
                        };
                        $scope.btn_savePolicy = function(){
//                            var isInvalid = false;
//                            var isNoItem = null;
//                            _.forEach($scope.propertyPolicies, function (h) {
//                                if(!isInvalid) {
//                                    _.forEach(h.PropertyPolicyItems, function (i) {
//                                        $(selAttb).css({"border": '1px solid #9e9e9e'});
//                                        if(!isInvalid) {
//                                            var selAttb = angular.element('#selectAttribute' + i.ID);
//                                            if (i.IsParentItem) {
//                                                if (i.UnitID < 1) {
//                                                    $(selAttb).css({"border": '2px solid red'});
//                                                    isInvalid = true;
//                                                    //return isInvalid;
//                                                } else {
//                                                    isNoItem = _.find(i.PolicyItemUnits, function (f) {
//                                                        return f.ID == i.UnitID && f.IsHideAttribute == true;
//                                                    });
//                                                    if (isNoItem) {
//                                                        $(selAttb).css({"border": '1px solid #9e9e9e'});
//                                                        isInvalid = false;
//                                                        //return isInvalid;
//                                                    }
//                                                }
//                                            } else {
//                                                if ((isNoItem == null || angular.isUndefined(isNoItem)) && i.UnitID < 1 && !i.IsChargedItem) {
//                                                    $(selAttb).css({"border": '2px solid red'});
//                                                    isInvalid = true;
//                                                   // return isInvalid;
//                                                } else {
//                                                    if(!i.IsChargedItem && i.UnitID < 1){
//                                                        $(selAttb).css({"border": '2px solid red'});
//                                                        isInvalid = true;
//                                                       // return isInvalid;
//                                                    }else {
//                                                        $(selAttb).css({"border": '1px solid #9e9e9e'});
//                                                        isInvalid = false;
//                                                       // return isInvalid;
//                                                    }
//                                                }
//
//                                            }
//
//                                        }
//                                    })
//                                }
//                            });
//                            if(isInvalid) return;
                            var attrRoute="/"+sessionFactory.GetData(SessionStore.currentLanguage)+"/"+$scope.CurrentUser.HotelID+"/"+$scope.CurrentUser.ID+"/"+$scope.CurrentUser.CurrencyID;
                            propertyPolicyFactory.UpdatePropertyPolicy($scope.propertyPolicies,attrRoute);
                        };
                    }],
                size: 'sm',
                keyboard: true,
                backdrop: 'static'
            });
        });
        $scope.add_policyClickHandler= function(){
            var param = {culture: $scope.langCode,hotelID: $scope.CurrentUser.HotelID};
            propertyPolicyFactory.GetPropertyPolicies(param);
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.PropertyPolicies);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });