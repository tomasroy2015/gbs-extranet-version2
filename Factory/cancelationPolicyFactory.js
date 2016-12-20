/**
 * Created by Tomas on 16-Oct-16.
 */
angular.module("gbsApp").factory("cancelationPolicyFactory", function($location,$routeParams,$rootScope,sessionFactory,
                                                                     ViewType,SessionStore,Notify,cancelationPolicyService) {
    var cancelPolicyData = null;
    var summary = null;
    var onGetData = function(response){
        cancelPolicyData = response;
        $rootScope.$broadcast(Notify.PROPERTY_CANCELLATION_DATA_PREPARATION_SUCCESSFUL);
    };
    var onError = function(response){

    };
    var onUpdateData = function(response){
        Materialize.toast("Property cancellation policy updated successfully.",3000,'green');
    };
    return{
        GetPropertyCancelPolicy:function(data){
            cancelationPolicyService.getPropertyCancelPolicy(data,onGetData,onError);
        },
        UpdatePropertyCancelPolicy:function(data,attributeRoute){
            cancelationPolicyService.updatePropertyCancelPolicy(data,attributeRoute,onUpdateData,onError);
        },
        CancellationPolicyInfo:function(){
            return cancelPolicyData;
        },
        SetCancellationSummary:function(value){
            summary = value;
        },
        GetCancellationSummary:function(){
            return summary;
        }
    };
});
