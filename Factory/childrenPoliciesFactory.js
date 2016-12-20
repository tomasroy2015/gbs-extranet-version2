/**
 * Created by Tomas on 26-Sep-16.
 */
angular.module("gbsApp").factory("childrenPoliciesFactory", function($location,$routeParams,$rootScope,sessionFactory,ViewType,SessionStore,Notify,childrenPoliciesService) {
    var childrenPolicies = null;
    var isAccommodateChild = false;
    var isExtraBedNeeded = false;
    var allChildPolicyData = [];
    var childrenSummary = null;
    var onGetData = function(response){
        childrenPolicies = response;
        sessionFactory.SetData(SessionStore.childrenPolicies,childrenPolicies);
        $rootScope.$broadcast(Notify.CHILDREN_POLICIES_DATA_SUCCESSFUL,response);
    };
    var onGetSummaryData = function(response){
        childrenSummary = response;
        $rootScope.$broadcast(Notify.CHILDREN_POLICY_SUMMARY_DATA_SUCCESSFUL,response);
    };
    var onUpdatedData = function(response){
        Materialize.toast("Children policies updated successfully.",3000,'green');
        $rootScope.$broadcast(Notify.CHILDREN_POLICIES_DATA_UPDATED_SUCCESSFUL,response);
    };
    var onError = function(response){
        //  $rootScope.$broadcast(Notify.LOGIN_UNSUCCESSFUL,response);
    };
    return{

        GetChildrenPolicies:function(data){
            childrenPoliciesService.getChildrenPolicies(data,onGetData,onError);
        },
        ChildrenPoliciesData:function(){
            return childrenPolicies;
        },
        GetChildrenPolicySummary:function(data){
            childrenPoliciesService.getChildrenPolicySummary(data,onGetSummaryData,onError);
        },
        ChildrenPolicySummary:function(){
            return childrenSummary;
        },
        InitPolicyData:function(childrenPolicies){
            var hotelPolicies = [];
            _.forEach(childrenPolicies,function(h){
                if(h.ChildrenPolicyItems.length > 0){
                    _.forEach(h.ChildrenPolicyItems,function(i){
                        hotelPolicies.push(i);
                    });
                }
            });

            var accomData = _.filter(hotelPolicies,function(f){
                return f.IsChildrenAccommodated == true;
            });
            if(accomData && accomData.length > 0){
//                $scope.IsAbleToAccommodate = true;
                this.SetChildAccommodation(true);
            }else{
                this.SetChildAccommodation(false);
            }

            var extraData = _.filter(hotelPolicies,function(f){
                return f.IsExtrabedNeeded == true;
            });
            if(extraData && extraData.length > 0){
//                $scope.IsExtraBedNeeded = true;
                this.SetExtraBed(true);
            }else{
                this.SetExtraBed(false);
            }
            allChildPolicyData = hotelPolicies;
            sessionFactory.SetObject(SessionStore.allChildrenPolicies,allChildPolicyData);
        },
        GetAllChildrenPolicies:function(){
            return allChildPolicyData;
        },
        UpdateChildrenPolicies:function(data,attributeRoute){
            childrenPoliciesService.updateChildrenPolicies(data,attributeRoute,onUpdatedData,onError);
        },
        SetChildAccommodation:function(value){
            isAccommodateChild = value;
        },
        SetExtraBed:function(value){
            isExtraBedNeeded = value;
        },
        IsChildAccommodated:function(){
            return isAccommodateChild;
        },
        IsExtraBedNeeded:function(){
           return isExtraBedNeeded;
        }
    };
});