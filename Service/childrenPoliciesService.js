/**
 * Created by Tomas on 26-Sep-16.
 */
angular.module("gbsApp").service('childrenPoliciesService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getChildrenPolicies = function (data,successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "childrenPolicies/getChildrenPolicySettings", successFunction, errorFunction);
    };
    this.getChildrenPolicySummary = function (data,successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "childrenPolicies/getChildrenPolicySummary", successFunction, errorFunction);
    };

    this.updateChildrenPolicies = function (data,attributeRoute,successFunction, errorFunction) {
        ajaxService.AjaxPostWithData(data, "childrenPolicies/updateChildrenPolicies"+attributeRoute,successFunction, errorFunction);
    };
}]);