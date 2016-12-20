/**
 * Created by Tomas on 28-Jun-16.
 */
angular.module("gbsApp").factory("accountFactory", function($location,sessionFactory,accountsService,Notify,$rootScope,SessionStore) {
    var userData = null;
    var currentLanguage = "en";
    var allCultures = [{"code":"en","name":"English"},
        {"code":"es","name":"Español"},
        {"code":"de","name":"Deutsch"},
        {"code":"fr","name":"Français"},
        {"code":"pt","name":"Português"},
        {"code":"gr","name":"Ελληνικά"},
        {"code":"ru","name":"Русский"},
        {"code":"it","name":"Italiano"},
        {"code":"ja","name":"日本語"},
        {"code":"zh","name":"简体中文"},
        {"code":"tr","name":"Türkçe"},
        {"code":"ar","name":"العربية"},
        {"code":"pl","name":"Polski"},
        {"code":"nr","name":"Nederlands"}];

    var onGetLoginData = function(response){
        userData = response;
        sessionFactory.SetObject(SessionStore.userData,userData);
        $rootScope.$broadcast(Notify.LOGIN_SUCCESSFUL);
    };
    var loginError = function(response){
        //Error handling goes here.
        //window.alert("Error in loading DataSet");
        $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    var onResetPassword = function(response){
        $rootScope.$broadcast(Notify.EMAIL_SENT_SUCCESSFULLY,response);
    };
    var resetPasswordError = function(response){
        //Error handling goes here.
        //window.alert("Error in loading DataSet");
        $rootScope.$broadcast(Notify.EMAIL_NOT_SENT,response);
    };
    var onUpdatePassword = function(response){
        $rootScope.$broadcast(Notify.UPDATE_PASSWORD_SUCCESSFULLY,response);
    };
    var updatePasswordError = function(response){
        //Error handling goes here.
        //window.alert("Error in loading DataSet");
         $rootScope.$broadcast(Notify.UPDATE_PASSWORD_NOT_SET,response);
    };
    return{
        GetLoginData:function(user){
            user.cultureCode = sessionFactory.GetData(SessionStore.currentLanguage);
            accountsService.getLogin(user,onGetLoginData,loginError);
        },
        LogOut:function(user){
            $location.path("/login-"+sessionFactory.GetData(SessionStore.currentLanguage));
            sessionFactory.Clear();
            $location.search({});
        },
        UserData:function(){
            return userData;
        },
        CurrentLanguage:function(){
            return currentLanguage;
        },
        getlanguageName:function(){
            var name = "";
            var code = sessionFactory.GetData(SessionStore.currentLanguage);
            switch (code){
                case 'en':
                    name="English";
                    break;
                case 'es':
                    name="Español";
                    break;
                case 'de':
                    name="Deutsch";
                    break;
                case 'fr':
                    name="Français";
                    break;
                case 'pt':
                    name="Português";
                    break;
                case 'gr':
                    name="Ελληνικά";
                    break;
                case 'ru':
                    name="Русский";
                    break;
                case 'it':
                    name="Italiano";
                    break;
                case 'ja':
                    name="日本語";
                    break;
                case 'zh':
                    name="简体中文";
                    break;
                case 'tr':
                    name="Türkçe";
                    break;
                case 'ar':
                    name="العربية";
                    break;
                case 'pl':
                    name="Polski";
                    break;
                case 'nr':
                    name="Nederlands";
                    break;
            }
            return name;
        },
        SendEmail:function(user){
              user.CultureCode = sessionFactory.GetData(SessionStore.currentLanguage);
              accountsService.resetPassword(user,onResetPassword,resetPasswordError);
        },
        UpdatePassword:function(user){
            user.CultureCode = sessionFactory.GetData(SessionStore.currentLanguage);
            accountsService.updatePassword(user,onUpdatePassword,updatePasswordError);
        },
        SetUserData:function(val){ /*For By pass Login page to set the user */
            userData = val;
        },
        AllCultures:function(){
            return allCultures;
        },
        SetCurrentLanguage:function(val){
            currentLanguage = val;
            sessionFactory.RemoveByKey(SessionStore.currentLanguage);
            sessionFactory.SetData(SessionStore.currentLanguage,currentLanguage);
        },
        RedirectToLogin:function(){
            $location.path("/login-"+sessionFactory.GetData(SessionStore.currentLanguage));
        },
        RedirectToResetPassword:function(){
            $location.path("/resetPassword-"+sessionFactory.GetData(SessionStore.currentLanguage));
        }
    };
});