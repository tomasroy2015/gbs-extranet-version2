/**
 * Created by Tomas on 23-Oct-16.
 */
angular.module("gbsApp").factory("propertyReviewFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,propertyReviewService) {
    var propertyReviews = null;
    var individualReviews = null;
    var onGetReviewData = function(response){
        propertyReviews = response;
        $rootScope.$broadcast(Notify.PROPERTY_REVIEW_DATA_PREPARATION_SUCCESSFUL);
    };

    var onGetIndividualData = function(response){
        individualReviews = response;
        $rootScope.$broadcast(Notify.PROPERTY_REVIEW_INDIVIDUAL_DATA_PREPARATION_SUCCESSFUL);
    };
    var onError = function(response){
        //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    return{

        GetPropertyReviews:function(data){
            propertyReviewService.getPropertyReviews(data,onGetReviewData,onError);
        },
        PropertyReviewsData:function(){
            return propertyReviews;
        },
        GetIndividualReviews:function(data){
            propertyReviewService.getIndividualSummary(data,onGetIndividualData,onError);
        },
        IndividualReviews:function(){
            return individualReviews;
        }
    };
});
