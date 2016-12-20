/**
 * Created by Tomas on 27-Aug-16.
 */
angular.module("gbsApp").service('authorizationService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getSecurityGroups = function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "authorize/getSecurityGroups", successFunction, errorFunction);
    };
    this.getSecurityGroupRights = function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "authorize/getSecurityGroupRights", successFunction, errorFunction);
    };
    this.updateGroups = function (attributeRoute,data, successFunction, errorFunction) {
        ajaxService.AjaxPostWithData(data, "authorize/updateGroups"+attributeRoute, successFunction, errorFunction);
    };
}]);