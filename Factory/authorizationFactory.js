/**
 * Created by Tomas on 27-Aug-16.
 */
angular.module("gbsApp").factory("auhtorizationFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,authorizationService) {
    var securityGroups = null;
    var securityGroupRights = null;
    var grp;
    var onGetData = function(response){
        securityGroups = response;
        sessionFactory.SetData(SessionStore.securityGroups,securityGroups);
        var selectedGrp = sessionFactory.GetData(SessionStore.selectedSecurityGroup);
        if(selectedGrp){
            grp =  _.find(securityGroups, function(o) {
                return o.ID == selectedGrp;
            });
        }

        var params = {
            cultureCode   : sessionFactory.GetData(SessionStore.currentLanguage),
            securityGroupID: selectedGrp ? selectedGrp :  securityGroups[0].ID,
            offset:($routeParams.page) ? (parseInt($routeParams.page) - 1)*20 : 0
        };
        $rootScope.$broadcast(Notify.SECURITY_GROUPS_DATA_SUCCESSFUL);
        authorizationService.getSecurityGroupRights(params,onGetRightsData,onSecurityError);
    };
    var onGetRightsData = function(response){
        securityGroupRights = response;
        sessionFactory.SetData(SessionStore.securityGroupRights,securityGroupRights);
        $rootScope.$broadcast(Notify.SECURITY_GROUPRIGHTS_DATA_SUCCESSFUL);
    };
    var onUpdatedData = function(response){
        Materialize.toast("User security group rights updated successfully.",3000,'green');
    };
    var onSecurityError = function(response){
      //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    return{

        GetSecurityGroups:function(data){
            authorizationService.getSecurityGroups(data,onGetData,onSecurityError);
        },
        SecurityGroups:function(){
            return securityGroups;
        },
        GetSecurityGroupRights:function(data){
            authorizationService.getSecurityGroupRights(data,onGetRightsData,onSecurityError);
        },
        SecurityGroupRights:function(){
            return securityGroupRights;
        },
        UpdateGroups:function(attributeRoute,data){
            authorizationService.updateGroups(attributeRoute,data,onUpdatedData,onSecurityError);
        }
    };
});