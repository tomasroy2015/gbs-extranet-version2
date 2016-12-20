/**
 * Created by Tomas on 16-Oct-16.
 */
angular.module("gbsApp").service('cancelationPolicyService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getPropertyCancelPolicy = function (data,successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "propertyCancelPolicy/getPropertyCancelPolicy", successFunction, errorFunction);
    };

    this.updatePropertyCancelPolicy = function (data,attributeRoute,successFunction, errorFunction) {
        ajaxService.AjaxPostWithData(data, "propertyCancelPolicy/updatePropertyCancelPolicy"+attributeRoute,successFunction, errorFunction);
    };
}]);