﻿

angular.module("gbsApp").service('accountsService', ['$http', 'ajaxService', function ($http, ajaxService) {

        this.registerUser = function (user, successFunction, errorFunction) {
            ajaxService.AjaxPostWithNoAuthenication(user, "accounts/RegisterUser", successFunction, errorFunction);
        };

        this.getLogin = function (user, successFunction, errorFunction) {
            ajaxService.AjaxGetWithData(user, "user/login", successFunction, errorFunction);
        };
        this.resetPassword = function (user, successFunction, errorFunction) {
            ajaxService.AjaxPostWithData(user, "user/resetpassword", successFunction, errorFunction);
        };
        this.updatePassword = function (user, successFunction, errorFunction) {
            ajaxService.AjaxPostWithData(user, "user/updatePassword", successFunction, errorFunction);
        };
        //Logout
        this.logout = function (user, successFunction, errorFunction) {
            ajaxService.AjaxPostWithData(user, "user/logout", successFunction, errorFunction);
        };
        //End of Logout
        this.getUser = function (successFunction, errorFunction) {
            ajaxService.AjaxGet("accounts/GetUser", successFunction, errorFunction);
        };        

        this.updateUser = function (user, successFunction, errorFunction) {
            ajaxService.AjaxPost(user, "accounts/UpdateUser", successFunction, errorFunction);
        };

    }]);
