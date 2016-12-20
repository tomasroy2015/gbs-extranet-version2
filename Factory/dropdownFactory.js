/**
 * Created by Tomas on 19-Sep-16.
 */
angular.module("gbsApp").factory("dropdownFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,dropdownService) {
    var units = null;
    var childUnits = null;
    var penaltyRates = null;
    var priceUnits = null;
    var years = null;
    var onGetUnitData = function(response){
        units = response;
        sessionFactory.SetObject(SessionStore.units,units);
        $rootScope.$broadcast(Notify.UNIT_DATA_PREPARATION_SUCCESSFUL);
    };
    var onGetChildUnitData = function(response){
        childUnits = response;
        sessionFactory.SetObject(SessionStore.childUnits,childUnits);
        $rootScope.$broadcast(Notify.CHILD_UNIT_DATA_PREPARATION_SUCCESSFUL);
    };
    var onError = function(response){
        //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    var onGeRateData = function(response){
        penaltyRates = response;
        $rootScope.$broadcast(Notify.PENALTY_RATE_DATA_PREPARATION_SUCCESSFUL);
    };
    var onGetpriceUnit = function(response){
        priceUnits = response;
        $rootScope.$broadcast(Notify.PRICE_UNIT_DROPDOWN_DATA_SUCCESSFULL);
    };
    var onGetYears = function(response){
        years = response;
        $rootScope.$broadcast(Notify.STATISTICS_YEAR_DROPDOWN_DATA_SUCCESSFULL);
    };
    return{

        GetUnits:function(data){
            dropdownService.getUnits(data,onGetUnitData,onError);
        },
        Units:function(){
            return units;
        },
        GetChildUnits:function(data){
            dropdownService.getChildUnits(data,onGetChildUnitData,onError);
        },
        ChildUnits:function(){
            return childUnits;
        },
        GetPenaltyRate:function(data){
            dropdownService.getPenaltyRate(data,onGeRateData,onError);
        },
        PenaltyRates:function(){
            return penaltyRates;
        },
        GetPriceUnits:function(data){
            dropdownService.getPriceUnits(data,onGetpriceUnit,onError);
        },
        PriceUnits:function(){
            return priceUnits;
        },
        GetYears:function(data){
            dropdownService.getYears(data,onGetYears,onError);
        },
        StatisticsYears:function(){
            return years;
        }
    };
});