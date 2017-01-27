//alert('sourding123')
angular.module("gbsApp").controller("inboxmessagesController", function ($scope, $http, appSettings, SessionStore,
             sessionFactory, accountFactory, ViewType, MenuType, $rootScope, $location, $routeParams, mainFactory, propertyFacilitiesFactory, dropdownFactory) {
    var $baseApiUrl = appSettings.API_BASE_URL;
    $scope.selectLanguage = "Language";
    $scope.langCode = "";
    $scope.PropertyFacilities = null;
    $scope.selectLanguages = [];
    $scope.selectedCards = [];
    $scope.selectedUnit = {};
    $scope.selectLanguages = accountFactory.AllCultures();
    $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);

    $scope.ReceiverUserID = "100002";

    if (!$scope.CurrentUser)
        $location.path("/login-en");

    $scope.initializeController = function () {
        $scope.IsHotelAdmin = $scope.CurrentUser.IsHotelAdmin;

        $scope.ViewType = ViewType;
        $scope.MenuType = MenuType;
        var language = sessionFactory.GetData(SessionStore.currentLanguage);

        $scope.langCode = language;
        if (language !== null && !angular.isUndefined(language)) {
            $scope.selectLanguage = accountFactory.getlanguageName();
        }
        $scope.selectedView = mainFactory.GetCurrentView();
        $scope.selectedMenu = mainFactory.GetCurrentMenu();

        Getinboxmessages();
    }

    function Getinboxmessages() {

        $http({
            method: 'GET', url: appSettings.API_BASE_URL + 'inbox/getinboxmessage',
            params: {
                ReceiverID: $scope.ReceiverUserID,
                cultureCode: $scope.langCode
            }
        }).success(function (response, status, headers, config) {
            $scope.Inboxmessage = response;
            $scope.Inboxmessageinfo = response[0];

        }).error(function (response) {
            Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
        });

        Getuseremail();

    }

    function Getuseremail() {

        $http({
            method: 'GET', url: appSettings.API_BASE_URL + 'inbox/getuseremail',
            params: {
                cultureCode: $scope.langCode
            }
        }).success(function (response, status, headers, config) {
            $scope.Useremail = response;

        }).error(function (response) {
            Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
        });

    }


    $scope.deletemessage = function (MessageID) {

        sessionFactory.SetData(SessionStore.MessageId, MessageID);

        $("#divpopupconfirm").show();
    };

    $scope.okdeletemessage = function () {
        var MessageID = sessionFactory.GetData(SessionStore.MessageId);
       // alert(MessageID)
            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'inbox/deleteinboxmessage',
                params: {
                    ReceiverID: $scope.ReceiverUserID,
                    MessageID: MessageID,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {
                if (response == 1) {
                    Materialize.toast("Successfully Deleted the Message.",1000, "green");
                    $("#divpopupconfirm").hide();
                    Getinboxmessages();
                }
            }).error(function (response) {
                Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
            });
    }

    $scope.canceldeletemessage = function () {
        $("#divpopupconfirm").hide();
    };

    $scope.newmessage = function () {
        $("#divmsgsend").show();
    };

    $scope.sendmessage = function () {
        $scope.ReceiverUserID = angular.element('#drpemailto').val();
        $scope.Subject = angular.element('#txtsubject').val();
        $scope.Message = angular.element('#txtmessage').val();
        
        if ($scope.ReceiverUserID == 0)
        {
            $('#drpemailto').css('border-color', 'red');
        }
        else
        {
            $('#drpemailto').css('border-color', '#ddd');
        }
        if ($scope.Subject == "") {
            $('#txtsubject').css('border-color', 'red');
        }
        else {
            $('#txtsubject').css('border-color', '#ddd');
        }
        if ($scope.Message == "") {
            $('#txtmessage').css('border-color', 'red');
        }
        else {
            $('#txtmessage').css('border-color', '#ddd');
        }
        if ($scope.ReceiverUserID != 0 && $scope.Subject != "" && $scope.Message != "")
        {
            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'inbox/sendmessage',
                params: {
                    SenderID: $scope.CurrentUser.ID,
                    ReceiverID: $scope.ReceiverUserID,
                    Subject: $scope.Subject,
                    Message: $scope.Message,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {
                if (response == 1) {
                    $("#divmsgsend").hide();
                    Materialize.toast("Successfully Send the Message.", 1000, "green");
                    $('#drpemailto').val(0);
                    $('#txtsubject').val("");
                    $('#txtmessage').val("");
                }
            }).error(function (response) {
                Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
            });
        }
        

    };

    $scope.cancelmessage = function () {
        $("#divmsgsend").hide();
        $('#drpemailto').val(0);
        $('#txtsubject').val("");
        $('#txtmessage').val("");
        $('#drpemailto').css('border-color', '#ddd');
        $('#txtsubject').css('border-color', '#ddd');
        $('#txtmessage').css('border-color', '#ddd');
    };

    $scope.goToMenu = function (type) {
        mainFactory.SetViewType(type);
        $scope.selectedView = type;
    };
    $scope.setLanguage = function (value) {
        $scope.selectLanguage = value.name;
        accountFactory.SetCurrentLanguage(value.code);
        mainFactory.SetViewType(ViewType.Reservations);
    };
    $scope.SignOut = function () {
        accountFactory.LogOut(accountFactory.UserData());
    };
});