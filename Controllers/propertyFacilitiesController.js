/**
 * Created by Tomas on 12-Sep-16.
 */
angular.module("gbsApp").controller("propertyFacilitiesController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,propertyFacilitiesFactory,dropdownFactory) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.langCode ="";
        $scope.PropertyFacilities = null;
        $scope.selectLanguages=[];
        $scope.selectedCards = [];
        $scope.selectedUnit = {};
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeMethod = function () {

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
            var param = {hotelID: $scope.CurrentUser.HotelID,culture: $scope.langCode};
            dropdownFactory.GetUnits({cultureCode:$scope.langCode});
            propertyFacilitiesFactory.GetPropertyFacilities(param);

        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.saveFacilities = function(){
            var facilityItems = [];
            _.forEach($scope.PropertyFacilities,function(h){
               if(h.PropertyFacilitiesItems.length > 0){
                   _.forEach(h.PropertyFacilitiesItems,function(i){
                       if(i.hasAttribute) {
                           if (i.Charged == true || i.Charged == false) {
                               if (i.selectedUnit && !angular.isUndefined(i.selectedUnit)) {
                                   i.UnitID = i.selectedUnit.ID;
                               }
                           }
                           facilityItems.push(i);
                       }
                   });
               }
            });
            var attrRoute="/"+$scope.CurrentUser.HotelID+"/"+$scope.langCode;
            propertyFacilitiesFactory.SavePropertyFacilities(facilityItems,attrRoute);
        };
        $scope.chkAttribChecked = function(id){
            if (id != "") {
                var mainAttb = angular.element('#chkMainAttribute'+id);
                var paidAttb = angular.element('#chkPaidAttribute'+id);
                if (mainAttb.is(':checked')) {
                    //alert(AtrribID)
                    paidAttb.prop('disabled', false);
                }
                else {
                    paidAttb.attr('checked', false);
                    paidAttb.prop('disabled', true);
                }

            }
        };

        $scope.chkPaidChecked = function(id){
            if (id != "") {
                var paidAttb = angular.element(document.querySelector('#chkPaidAttribute'+id));
                var drpAttb = angular.element(document.querySelector('#drpUnit'+id));
                if (paidAttb.is(':checked')) {
                    drpAttb.addClass('make-enable');
                }
                else {
                    drpAttb.removeClass('make-enable');
                }

            }
        };
        $scope.$on(Notify.PROPERTY_FACILITY_DATA_SUCCESSFUL,function(event,response){
            var facilities = propertyFacilitiesFactory.PropertyFacilities();
            _.forEach(facilities,function(h){
                if(h.PropertyFacilitiesItems.length > 0){
                    _.forEach(h.PropertyFacilitiesItems,function(i){
                        if(i.Charged == true || i.Charged == false){
                            i.selectedUnit = _.find($scope.AllUnits,function(f){return f.ID == i.UnitID});
                            i.Units = $scope.AllUnits;
                        }
                    });
                }
            });
            $scope.PropertyFacilities = facilities;
        });
        $scope.$on(Notify.UNIT_DATA_PREPARATION_SUCCESSFUL,function(event,response){
            $scope.AllUnits = dropdownFactory.Units();
        });
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.PropertyInformation);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };
    });