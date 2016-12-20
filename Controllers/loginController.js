/**
 * Created by Tomas on 26-Jun-16.
 */
angular.module("gbsApp").controller("loginController", function($scope,$rootScope,$location, accountFactory,Notify,SessionStore,sessionFactory,mainFactory,ViewType) {
    $scope.selectLanguage = "en";
    $scope.selectLanguages=[];
    $scope.selectLanguages = accountFactory.AllCultures();
    $scope.UserName = "";
    $scope.Password = "";
    $scope.isInvalidUser = false;
    $scope.initializeController = function () {
        $scope.Email = "";
        $scope.Password = "";
        var language = accountFactory.CurrentLanguage();
        if(language !== null && !angular.isUndefined(language)){
            $scope.selectLanguage = accountFactory.CurrentLanguage();
        }
        accountFactory.SetCurrentLanguage($scope.selectLanguage);
    };
    $scope.languageChanged = function(value){
        accountFactory.SetCurrentLanguage(value);
        accountFactory.RedirectToLogin();
    };
    $scope.forgotPass = function () {
        accountFactory.RedirectToResetPassword();
    };

    $scope.loginOK = function () {
        $scope.isInvalidUser = false;
        var isInvalid =  $scope.validateInput();
        if(isInvalid)
            return;

        var user = $scope.createLoginCredentials();
        accountFactory.GetLoginData(user);
        //$location.path("/dashboard-"+accountFactory.CurrentLanguage());
    };
    $scope.$on(Notify.LOGIN_UNSUCCESSFUL, function(event,response){
        //alertsService.RenderErrorMessage(response.ReturnMessage);
        $scope.isInvalidUser = true;
        $scope.loginErrorText = response.Message;

    });
    $scope.$on(Notify.LOGIN_SUCCESSFUL, function(event,response){
        mainFactory.SetViewType(ViewType.Dashboard);
//        $location.path("/dashboard-"+sessionFactory.GetData(SessionStore.currentLanguage));
    });
    $scope.validateInput = function(){
        if($scope.UserName == "" || angular.isUndefined($scope.UserName)){
            return true;
        }
        if($scope.Password == "" || angular.isUndefined($scope.Password)){
            return true;
        }
        return false;
    };

    $scope.createLoginCredentials = function () {

        var params = {
            Email   : $scope.UserName,
            Password: $scope.Password
        };

        return params
    };
});

