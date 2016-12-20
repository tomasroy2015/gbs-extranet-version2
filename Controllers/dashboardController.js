/**
 * Created by Tomas on 02-Jul-16.
 */

angular.module("gbsApp").controller("dashboardController", function($scope,$rootScope,$location,sessionFactory,dropdownFactory, accountFactory,mainFactory,MenuType,ViewType,SessionStore,$routeParams) {
    $scope.selectLanguage = "Language";
    $scope.langCode ="";
    $scope.selectLanguages=[];
    $scope.selectLanguages = accountFactory.AllCultures();
    $scope.IsHotelAdmin = false;
    $scope.CurrentUser = null;
    $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
    if(!$scope.CurrentUser)
        $location.path("/login-en");
    $scope.initializeController = function () {
        $scope.ViewType = ViewType;
        $scope.MenuType = MenuType;
        var language = sessionFactory.GetData(SessionStore.currentLanguage);
        $scope.langCode = language;
        if(language !== null && !angular.isUndefined(language)){
            $scope.selectLanguage = accountFactory.getlanguageName();
        }
        $scope.selectedView = mainFactory.GetCurrentView();
        $scope.selectedMenu = mainFactory.GetCurrentMenu();

        $scope.IsHotelAdmin =  $scope.CurrentUser.IsHotelAdmin;
        $scope.currentDate = new Date();
        dropdownFactory.GetYears({culture:$scope.langCode});

    };
    $scope.setLanguage = function(value){
        $scope.selectLanguage = value.name;
        accountFactory.SetCurrentLanguage(value.code);
        mainFactory.SetViewType(ViewType.Dashboard);
    };
    $scope.forgotPass = function () {
        accountFactory.RedirectToResetPassword();
    };
    $scope.SignOut = function(){
        accountFactory.LogOut(accountFactory.UserData());
    };
    $scope.goToMenu = function(type){
        mainFactory.SetViewType(type);
        $scope.selectedView = type;
    };


});

