/**
 * Created by Tomas on 23-Oct-16.
 */
angular.module("gbsApp").service('propertyReviewService', ['$http', 'ajaxService', function ($http, ajaxService) {

    this.getPropertyReviews = function (data,successFunction, errorFunction) {
        ajaxService.AjaxGetWithData(data, "propertyReview/getPropertyReviews", successFunction, errorFunction);
    };

    this.getIndividualSummary = function(data,successFunction,errorFunction){
        ajaxService.AjaxGetWithData(data,"propertyReview/getIndividualReviews",successFunction,errorFunction);
    };
}]);
