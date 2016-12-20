/**
 * Created by Tomas on 10-Sep-16.
 */
angular.module("gbsApp").service('propertyOperationService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getHotelInformation = function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "propertyInformation/getHotelInformation", successFunction, errorFunction);
    };

    this.updateProperty = function (data, successFunction, errorFunction) {
        ajaxService.AjaxPostWithData(data, "propertyInformation/updatePropertyInfo", successFunction, errorFunction);
    };
}]);