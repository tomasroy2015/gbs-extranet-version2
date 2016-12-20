/**
 * Created by Tomas on 23-Oct-16.
 */
angular.module("gbsApp").controller("propertyReviewController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,$modal,dropdownFactory,propertyReviewFactory) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.IsDataLoaded = false;
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeController = function () {

            $scope.IsHotelAdmin =  $scope.CurrentUser.IsHotelAdmin;

            $scope.ViewType = ViewType;
            $scope.MenuType = MenuType;

            var language = sessionFactory.GetData(SessionStore.currentLanguage);
            $scope.langCode = language;
            if(language !== null && !angular.isUndefined(language)){
                $scope.selectLanguage = accountFactory.getlanguageName();
            }
            $scope.selectedView = mainFactory.GetCurrentView();
            $scope.selectedMenu = mainFactory.GetCurrentMenu();
            propertyReviewFactory.GetPropertyReviews({hotelID:$scope.CurrentUser.HotelID,culture:$scope.langCode});
            propertyReviewFactory.GetIndividualReviews({hotelID:$scope.CurrentUser.HotelID,culture:$scope.langCode});

        };
        $scope.$on(Notify.PROPERTY_REVIEW_DATA_PREPARATION_SUCCESSFUL,function(event,response){
            $scope.policyReviews = propertyReviewFactory.PropertyReviewsData();
        });
        $scope.$on(Notify.PROPERTY_REVIEW_INDIVIDUAL_DATA_PREPARATION_SUCCESSFUL,function(event,response){
            $scope.individualReviews = propertyReviewFactory.IndividualReviews();
        });

        $scope.add_policyClickHandler= function(){

        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.Reviews);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };

    });
