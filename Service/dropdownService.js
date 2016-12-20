/**
 * Created by Tomas on 19-Sep-16.
 */
angular.module("gbsApp").service('dropdownService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getUnits = function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "dropdown/getUnit", successFunction, errorFunction);
    };
    this.getChildUnits=function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "dropdown/getChildrenUnit", successFunction, errorFunction);
    };
    this.getPenaltyRate=function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "dropdown/getPenaltyRate", successFunction, errorFunction);
    };
    this.getPriceUnits=function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "dropdown/getPriceUnits", successFunction, errorFunction);
    };
    this.getYears=function (data, successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "dropdown/getYears", successFunction, errorFunction);
    };

}]);