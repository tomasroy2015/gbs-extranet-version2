/**
 * Created by Tomas on 19-Oct-16.
 */
angular.module("gbsApp").factory("propertyPolicyFactory", function($location,$routeParams,$rootScope,sessionFactory,
                                                                      ViewType,SessionStore,Notify,propertyPolicyService) {
    var propertyPolicyData = null;
    var summaryData = null;
    var onGetData = function(response){
        propertyPolicyData = response;
        $rootScope.$broadcast(Notify.PROPERTY_POLICY_DATA_PREPARATION_SUCCESSFUL);
    };
    var onError = function(response){

    };
    var onSummaryData = function(response){
        summaryData = response;
        $rootScope.$broadcast(Notify.PROPERTY_POLICY_SUMMARY_DATA_PREPARATION_SUCCESSFUL);
    };
    var onUpdateData = function(response){
        Materialize.toast("Property policy updated successfully.",3000,'green');
        summaryData = response;
        $rootScope.$broadcast(Notify.PROPERTY_POLICY_SUMMARY_DATA_PREPARATION_SUCCESSFUL);
    };
    return{
        GetPropertyPolicies:function(data){
            propertyPolicyService.getPropertyPolicies(data,onGetData,onError);
        },
        UpdatePropertyPolicy:function(data,attributeRoute){
            propertyPolicyService.updatePropertyPolicy(data,attributeRoute,onUpdateData,onError);
        },
        PropertyPolicyInfo:function(){
            return propertyPolicyData;
        },
        GetPolicySummary:function(data){
            propertyPolicyService.getPropertyPolicySummary(data,onSummaryData,onError);
        },
        PolicySummaryData:function(){
         return summaryData;
        }
    };
});