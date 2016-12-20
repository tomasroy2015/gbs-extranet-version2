/**
 * Created by Tomas on 27-Aug-16.
 */
angular.module("gbsApp").controller("authorizationController",
    function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
             sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType,auhtorizationFactory) {
        $scope.selectLanguage = "Language";
        $scope.selectedGroup = null;
        $scope.securityGroups = [];
        $scope.langCode ="";
        $scope.selectLanguages=[];
        $scope.rowCollection=[];
        $scope.displayColl=[];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        if(!$scope.CurrentUser)
            $location.path("/login-en");
        $scope.initializeController = function() {
            $scope.ViewType = ViewType;
            $scope.MenuType = MenuType;

            var language = sessionFactory.GetData(SessionStore.currentLanguage);
            $scope.langCode = language;
            if(language !== null && !angular.isUndefined(language)){
                $scope.selectLanguage = accountFactory.getlanguageName();
            }
            $scope.selectedView = mainFactory.GetCurrentView();
            $scope.selectedMenu = mainFactory.GetCurrentMenu();
            $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
            if(!$scope.CurrentUser)
                $location.path("/login-en");
            var params = {
                cultureCode   : $scope.langCode
            };
            auhtorizationFactory.GetSecurityGroups(params);
        };
        $scope.goToMenu = function(type){
            mainFactory.SetViewType(type);
            $scope.selectedView = type;
        };
        $scope.securityChanged = function(selected){
            sessionFactory.SetData(SessionStore.selectedSecurityGroup,selected.ID);
            var params = {
                cultureCode   : $scope.langCode,
                securityGroupID:selected.ID,
                offset: ($scope.currentPage - 1)* $scope.rowsPerPage
            };
            auhtorizationFactory.GetSecurityGroupRights(params);
        };
        $scope.$on(Notify.SECURITY_GROUPS_DATA_SUCCESSFUL, function(event){
            var groups = auhtorizationFactory.SecurityGroups();
            var selectedGrp = sessionFactory.GetData(SessionStore.selectedSecurityGroup);
            var grp;
            if(selectedGrp == null || angular.isUndefined(selectedGrp)){
                sessionFactory.SetData(SessionStore.selectedSecurityGroup,groups[0].ID);
                $scope.selectedGroup = groups[0];
            }else{
                grp = _.find(groups, function (n) {
                    return n.ID == selectedGrp;
                });
                $scope.selectedGroup = grp;
            }

//            if($scope.selectedGroup == null || angular.isUndefined($scope.selectedGroup))
//                $scope.selectedGroup =  groups[0];
            $scope.securityGroups = groups;
        });
        $scope.currentPage  =   ($routeParams.page) ? parseInt($routeParams.page) : 1;
        $scope.currentPage  =   ($scope.currentPage < 1) ? 1 : $scope.currentPage;
        $scope.rowsPerPage = 20;
        $scope.$on(Notify.SECURITY_GROUPRIGHTS_DATA_SUCCESSFUL, function(event){
            var data = auhtorizationFactory.SecurityGroupRights();
            $scope.rowCollection = data.rows;
            $scope.displayColl = [].concat($scope.rowCollection);
            $scope.paging  =   $scope.pagination(data.totalRows, $scope.currentPage, $scope.rowsPerPage);
        });
        $scope.setLanguage = function(value){
            $scope.selectLanguage = value.name;
            accountFactory.SetCurrentLanguage(value.code);
            mainFactory.SetViewType(ViewType.Authorization);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };
        $scope.btnSave = function(){
            var selectedItems = _.forEach( $scope.displayColl,function(n){
                n.OpUserID = sessionFactory.GetData(SessionStore.userData).ID
            });
            var attrRoute="/"+$scope.selectedGroup.ID;
            auhtorizationFactory.UpdateGroups(attrRoute,selectedItems);
        };
        $scope.pagination =   function($totalRows, $curPage, $perPage){
            var $maxPagesLoops   = 20;  // Display 5 pages on the screen.
            var $totalPages  = Math.ceil($totalRows/$perPage); //Calculate the total pages
            var $start      = (Math.ceil($curPage/$maxPagesLoops) - 1) * $maxPagesLoops + 1;
            var $prev       = ($start > $maxPagesLoops) ? ($start - 1) : 0;
            var $end;
            if ($totalPages < $maxPagesLoops) {
                $end  = $totalPages;
            } else{
                $end  = (($start + $maxPagesLoops - 1) > $totalPages) ? $totalPages : ($start + $maxPagesLoops - 1);
            }
            var $next   = ($end < $totalPages) ? ($end + 1) : 0;
            var $paging = {};
            $paging.first = 1;
            $paging.prev  = $prev;
            $paging.pages = [];
            for (var i = $start; i < ($end + 1); i++) {
                $paging.pages.push(i);
            }
            $paging.next  = $next;
            $paging.current = $curPage;
            $paging.last  = $totalPages;
            return $paging; //The returned paging object.
        };
        /*
         setLimitLength function
         $length: the rows per page: 10 20 50.
         result: Reload this page.
         */
        $scope.setLimitLength   = function($length){
            $location.search('length', $length);
            $location.search('page', 1);
        };
        /*
         setPage function
         $page: the page number to go.
         result: Reload this page.
         */
        $scope.setPage  =   function($page){
            $location.search('page', $page);

        };
    });