/**
 * Created by Tomas on 10-Sep-16.
 */
angular.module("gbsApp").factory("propertyOperationFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,propertyOperationService) {
    var hotelInformation = null;
    var onGetData = function(response){
        hotelInformation = response;
        $rootScope.$broadcast(Notify.PROPERTY_INFORMATION_DATA_SUCCESSFUL);
    };

    var onUpdatedData = function(response){
        Materialize.toast("Property information updated successfully.",3000,'green');
    };
    var onError = function(response){
        //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    return{

        GetHotelInfo:function(data){
            propertyOperationService.getHotelInformation(data,onGetData,onError);
        },
        HotelInformation:function(){
            return hotelInformation;
        },

        UpdatePropertyInfo:function(data){
            propertyOperationService.updateProperty(data,onUpdatedData,onError);
        }
    };
});