/**
 * Created by Tomas on 09-Sep-16.
 */
angular.module("gbsApp").controller("propertyInformationController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
                               sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,propertyOperationFactory) {
        var $baseApiUrl = appSettings.API_BASE_URL;
        $scope.selectLanguage = "Language";
        $scope.langCode ="";
        $scope.PropertyInfo = null;
        $scope.selectLanguages=[];
        $scope.selectedCards = [];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeMethod = function () {

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
            var param = {culture: $scope.langCode, hotelID: $scope.CurrentUser.HotelID};
            propertyOperationFactory.GetHotelInfo(param);

        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.saveProperty = function(){
            var sItems = [];
            if($scope.selectedCards){
                _.forEach($scope.selectedCards,function(n1){
                   var item = _.find($scope.PropertyInfo.AllCreditCardList,function(n2){
                       return n1 == n2.ID;
                    });
                    if(item){
                        sItems.push(item);
                    }
                });
                $scope.PropertyInfo.HotelCreditCardList = sItems;
            }
            propertyOperationFactory.UpdatePropertyInfo($scope.PropertyInfo);
        };
        $scope.cardsChanged = function(items){
            $scope.selectedCards = items;
        };
        $scope.$on(Notify.PROPERTY_INFORMATION_DATA_SUCCESSFUL,function(event,response){
            $scope.PropertyInfo = propertyOperationFactory.HotelInformation();
            if($scope.PropertyInfo.HotelCreditCardList){
                _.forEach($scope.PropertyInfo.HotelCreditCardList,function(n){
                    $scope.selectedCards.push(n.ID);
                })
            }
        });
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.PropertyInformation);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };
    });