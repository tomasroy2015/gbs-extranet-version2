/**
 * Created by Tomas on 19-Oct-16.
 */
angular.module("gbsApp").service('propertyPolicyService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getPropertyPolicies = function (data,successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "propertyPolicies/getPropertyPolicies", successFunction, errorFunction);
    };

    this.updatePropertyPolicy = function (data,attributeRoute,successFunction, errorFunction) {
        ajaxService.AjaxPostWithData(data, "propertyPolicies/updatePropertyPolicies"+attributeRoute,successFunction, errorFunction);
    };
    this.getPropertyPolicySummary = function(data,successFunction,errorFunction){
        ajaxService.AjaxGetWithData(data,"propertyPolicies/getPropertyPolicySummary",successFunction,errorFunction);
    };
}]);