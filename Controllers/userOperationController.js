/**
 * Created by Tomas on 23-Aug-16.
 */
angular.module("gbsApp").controller("userOperationController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.selectLanguages = accountFactory.AllCultures();
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
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.UserOperation);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };
        $scope.userOperationConfig 	=	{
            title: 'User Operation Management',
            apiRequestLink: 'userOperation/getAll',
            Culture: sessionFactory.GetData(SessionStore.currentLanguage),
            baseApiUrl: $baseApiUrl,
            rowIdModel: 'ID',
            editMode:false,
            cols: [
                {
                    label: 'ID',
                    sortable: true,
                    model: 'ID',
                    align: 'center',
                    editForm: false
                },
                {
                    label: 'UserID',
                    sortable: true,
                    model: 'User'
                },
                {
                    label: 'Date',
                    sortable: true,
                    model: 'Date'
                },
                {
                    label: 'Operation Type',
                    sortable: true,
                    model: 'OperationType'
                },
                {
                    label: 'Part',
                    sortable: true,
                    model: 'Part'
                },
                {
                    label: 'RecordID',
                    sortable: true,
                    model: 'RecordID'
                },
                {
                    label: 'UserSessionID',
                    sortable: true,
                    model: 'UserSessionID',
                    editForm: false
                },
                {
                    label: 'IP Address',
                    sortable: true,
                    model: 'IPAddress'
                }
            ],
            advanceFilter: [
                {
                    label: 'ID',
                    model: 'ID',
                    slugRequest: 'ID',
                    type: 'number'
                },
                {
                    label: 'User ID',
                    model: 'User',
                    slugRequest: 'User',
                    type: 'text'
                },
                {
                    label: 'Date',
                    model: 'Date',
                    slugRequest: 'Date',
                    type: 'timestamp'
                }
            ],
            actions:false
        };
    });