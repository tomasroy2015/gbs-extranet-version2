/**
 * Created by Tomas on 27-Oct-16.
 */
angular.module("gbsApp").factory("propertyStatisticsFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,propertyStatisticService) {
    var dailyStatistics = null;
    var monthlyStatistics = null;
    var yearlyStatistics = null;
    var onGetDailyData = function(response){
        dailyStatistics = response;
        $rootScope.$broadcast(Notify.PROPERTY_STATISTICS_DAILY_DATA_SUCCESSFUL);
    };
    var onGetMonthlyData = function(response){
        monthlyStatistics = response;
        $rootScope.$broadcast(Notify.PROPERTY_STATISTICS_MONTHLY_DATA_SUCCESSFUL);
    };
    var onGetYearlyData = function(response){
        yearlyStatistics = response;
        $rootScope.$broadcast(Notify.PROPERTY_STATISTICS_YEARLY_DATA_SUCCESSFUL);
    };

    var onError = function(response){
        //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    return{

        GetDailyStatistics:function(data){
            propertyStatisticService.getPropertyStatistics(data,onGetDailyData,onError);
        },
        DailyStatisticsData:function(){
            return dailyStatistics;
        },
        GetMonthlyStatistics:function(data){
            propertyStatisticService.getMonthlyStatistics(data,onGetMonthlyData,onError);
        },
        MonthlyStatisticsData:function(){
            return monthlyStatistics;
        },
        GetYearlyStatistics:function(data){
            propertyStatisticService.getYearlyStatistics(data,onGetYearlyData,onError);
        },
        YearlyStatisticsData:function(){
            return yearlyStatistics;
        }
    };
});
