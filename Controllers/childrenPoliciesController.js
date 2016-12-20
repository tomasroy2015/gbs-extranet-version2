/**
 * Created by Tomas on 26-Sep-16.
 */
angular.module("gbsApp").controller("childrenPoliciesController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$modal,dropdownFactory,childrenPoliciesFactory,ChildPolicyType) {

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

            dropdownFactory.GetChildUnits({culture:$scope.langCode});
            var param = {currencyCode:$scope.CurrentUser.CurrencyCode,hotelID: $scope.CurrentUser.HotelID,culture: $scope.langCode};
            childrenPoliciesFactory.GetChildrenPolicySummary(param);
        };

        $scope.$on(Notify.CHILDREN_POLICY_SUMMARY_DATA_SUCCESSFUL,function(event,response){
            $scope.childrenPolicySummary = childrenPoliciesFactory.ChildrenPolicySummary();
        });
        $scope.$on(Notify.CHILDREN_POLICIES_DATA_UPDATED_SUCCESSFUL,function(event,response){
            var param = {currencyCode:$scope.CurrentUser.CurrencyCode, hotelID: $scope.CurrentUser.HotelID,culture: $scope.langCode};
            childrenPoliciesFactory.GetChildrenPolicySummary(param);
        });
        $scope.$on(Notify.CHILDREN_POLICIES_DATA_SUCCESSFUL,function(event,response){
            childrenPoliciesFactory.InitPolicyData(childrenPoliciesFactory.ChildrenPoliciesData());
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'Views/Policies/addChildrenPolicy-en.html',
                controller: ['$scope', '$modalInstance', 'mainFactory','sessionFactory', 'childrenPoliciesFactory','dropdownFactory','ChildPolicyType',
                    function ($scope, $modalInstance, mainFactory,sessionFactory, childrenPoliciesFactory,dropdownFactory,ChildPolicyType) {
                        $scope.IsAbleToAccommodate = false;
                        $scope.IsExtraBedNeeded = false;
                        $scope.isExist = false;
                        $scope.data = {Name: ""};
                        $scope.ChildPolicyType = ChildPolicyType;
                        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
                        $scope.childrenPolicies = childrenPoliciesFactory.ChildrenPoliciesData();
                        $scope.childUnits = dropdownFactory.ChildUnits();
                        InitData();
                        function InitData(){
                            $scope.IsAbleToAccommodate = childrenPoliciesFactory.IsChildAccommodated();
                            $scope.IsExtraBedNeeded = childrenPoliciesFactory.IsExtraBedNeeded();
                        }
                        $scope.closeWindow = function () {
                            $modalInstance.dismiss();
                        };
                        $scope.click_accommodate = function (policy,value) {
                            $scope.IsAbleToAccommodate = value;
                            _.forEach($scope.childrenPolicies ,function(h){
                                var item = _.find(h.ChildrenPolicyItems,function(i){
                                    return i.IsExtrabedItem == false && i.IsProviderNeeded == true;
                                });
                                if(item){
                                    item.IsChildrenAccommodated = value;
                                }
                            })
                        };
                        $scope.click_extrabed = function (policy,value) {
                            $scope.IsExtraBedNeeded = value;
                            _.forEach($scope.childrenPolicies ,function(h){
                                var item = _.find(h.ChildrenPolicyItems,function(i){
                                    return  i.IsExtrabedItem == true && i.IsProviderNeeded == true;
                                });
                                if(item){
                                    item.IsExtrabedNeeded = value;
                                }
                            })
                        };
                        $scope.btn_Cancel = function () {
                            $modalInstance.dismiss();
                        };
                        $scope.btn_savePolicy = function(){
                            var attrRoute="/"+$scope.CurrentUser.HotelID+"/"+$scope.CurrentUser.CurrencyID;
                            childrenPoliciesFactory.UpdateChildrenPolicies($scope.childrenPolicies,attrRoute);
                        };
                    }],
                size: 'sm',
                keyboard: true,
                backdrop: 'static'
            });
        });
        $scope.add_policyClickHandler= function(){
            $scope.IsDataLoaded = false;
            var param = {hotelID: $scope.CurrentUser.HotelID,culture: $scope.langCode};
            childrenPoliciesFactory.GetChildrenPolicies(param);

        };
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