/**
 * Created by Tomas on 12-Sep-16.
 */
angular.module("gbsApp").service('propertyFacilitiesService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getPropertyFacilities = function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "propertyFacilities/getPropertyFacilities", successFunction, errorFunction);
    };

    this.savePropertyFacilities = function (data,attributeRoute, successFunction, errorFunction) {
        ajaxService.AjaxPostWithData(data, "propertyFacilities/savePropertyFacilities"+attributeRoute, successFunction, errorFunction);
    };
}]);