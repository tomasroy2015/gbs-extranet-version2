/**
 * Created by Tomas on 26-Oct-16.
 */
angular.module("gbsApp").service('propertyStatisticService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getPropertyStatistics = function (data,successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "propertyStatistics/dailyStatistics", successFunction, errorFunction);
    };

    this.getMonthlyStatistics = function(data,successFunction,errorFunction){
        ajaxService.AjaxGetWithData(data,"propertyStatistics/monthlyStatistics",successFunction,errorFunction);
    };

    this.getYearlyStatistics = function(data,successFunction,errorFunction){
        ajaxService.AjaxGetWithData(data,"propertyStatistics/yearlyStatistics",successFunction,errorFunction);
    };
}]);

