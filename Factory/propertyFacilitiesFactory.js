/**
 * Created by Tomas on 12-Sep-16.
 */
angular.module("gbsApp").factory("propertyFacilitiesFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,propertyFacilitiesService) {
    var propertyFacilities = null;
    var onGetData = function(response){
        propertyFacilities = response;
        $rootScope.$broadcast(Notify.PROPERTY_FACILITY_DATA_SUCCESSFUL);
    };

    var onUpdatedData = function(response){
        Materialize.toast("Property facilities updated successfully.",3000,'green');
    };
    var onError = function(response){
        //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    return{

        GetPropertyFacilities:function(data){
            propertyFacilitiesService.getPropertyFacilities(data,onGetData,onError);
        },
        PropertyFacilities:function(){
            return propertyFacilities;
        },
        SavePropertyFacilities:function(data,attributeRoute){
            propertyFacilitiesService.savePropertyFacilities(data,attributeRoute,onUpdatedData,onError);
        }
    };
});