/**
 * Created by Tomas on 26-Jun-16.
 */
angular.module("gbsApp").controller("resetPasswordController",function($scope,$location, accountFactory,Notify){
    $scope.passwordMatched = true;
    $scope.emailNotSent = false;
    function init() {
        $scope.Password = "";
        $scope.NewPassword = "";
        var search = $location.search();
        $scope.UserID = search.UserID;
       // var location = search.location;
    }

    init();
    $scope.resetPasswordMail = function(){
        $scope.isInvalidInput= false;
        $scope.isResetBtnClicked = true;

        var isInvalid =  $scope.validateInput();
        if(isInvalid)
            return;

        var user = {
            Email   : $scope.UserName
        };
        accountFactory.SendEmail(user);
    };
    $scope.compareIT = function(){
        $scope.passwordMatched = true;
        if ($scope.NewPassword != $scope.Password) {
            $scope.passwordMatched = false;
        }
    };
    $scope.SetNewPassword = function(){
        var isInvalid =  $scope.validatePassword();
        if(isInvalid)
            return;

        var user = {
            Password   : $scope.Password,
            UserID : $scope.UserID
        };
        accountFactory.UpdatePassword(user);
    };
    $scope.validatePassword = function(){
        if($scope.NewPassword == "" || angular.isUndefined($scope.NewPassword)){
            return true;
        }
        if($scope.Password == "" || angular.isUndefined($scope.Password)){
            return true;
        }
        return false;
    };
    $scope.$on(Notify.EMAIL_SENT_SUCCESSFULLY, function(event,response){
        $scope.emailNotSent = false;
        Materialize.toast("Related e-mail has been sent to the email address you supplied. Please check your e-mail.",5000);
    });
    $scope.$on(Notify.UPDATE_PASSWORD_SUCCESSFULLY, function(event,response){
        Materialize.toast("Your new password has been set successfully.",5000);
    });
    $scope.$on(Notify.EMAIL_NOT_SENT, function(event,response){
        $scope.emailNotSent = true;
        $scope.resetErrorText = response.Message;
    });
    $scope.validateInput = function(){
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if($scope.UserName === "" || typeof $scope.UserName === "undefined") {
            $scope.isInvalidInput= true;
            $scope.isInvalidEmail = false;
            return $scope.isInvalidInput;
        }
        if (!filter.test($scope.UserName)) {
            $scope.isInvalidEmail = true;
            $scope.isInvalidInput= false;
            Materialize.toast("Invalid email entered.",5000);
            return $scope.isInvalidEmail;
        }
    };
    $scope.goBack = function(){
        accountFactory.RedirectToLogin();
    };
});