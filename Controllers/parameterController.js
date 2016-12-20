
/**
 * Created by Tomas on 23-Aug-16.
 */
angular.module("gbsApp").controller("parameterController",
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
            mainFactory.SetViewType(ViewType.Parameter);
        };
        $scope.SignOut = function(){
            accountFactory.LogOut(accountFactory.UserData());
        };
        $scope.parameterTableConfig 	=	{
            title: 'Parameter Management',
            apiRequestLink: 'parameter/getParameters',
            Culture: sessionFactory.GetData(SessionStore.currentLanguage),
            baseApiUrl: $baseApiUrl,
            rowIdModel: 'ID',
            editMode:true,
            cols: [
                {
                    label: 'ID',
                    sortable: true,
                    model: 'ID',
                    align: 'center',
                    editForm: false
                },
                {
                    label: 'Code',
                    sortable: true,
                    model: 'Code',
                    editForm: {
                        type: 'text',
                        slugRequest: 'Code',
                        apiRequestLink: false,
                        options: false,
                        placeholder: 'Code',
                        validation: {
                            required: true
                        }
                    }
                },
                {
                    label: 'Value',
                    sortable: true,
                    model: 'Value',
                    editForm: {
                        type: 'text',
                        slugRequest: 'Value',
                        apiRequestLink: false,
                        options: false,
                        placeholder: 'Value',
                        validation: {
                            required: true
                        }
                    }
                },
                {
                    label: 'Description',
                    sortable: true,
                    model: 'Description',
                    editForm: {
                        type: 'text',
                        slugRequest: 'Description',
                        apiRequestLink: false,
                        options: false,
                        placeholder: 'Description',
                        validation: {
                            required: true
                        }
                    }
                },
                {
                    label: 'Common',
                    sortable: true,
                    model: 'IsCommon',
                    type:'checkbox',
                    editForm: {
                        type: 'checkbox',
                        slugRequest: 'IsCommon',
                        apiRequestLink: false,
                        options: false,
                        placeholder: 'Common'
                    }
                },
                {
                    label: 'Date',
                    sortable: true,
                    model: 'Date',
                    align: 'center',
                    editForm: false
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
                label: 'VALUE',
                model: 'Value',
                slugRequest: 'Value',
                type: 'text'
            }
        ],
            actions: {
            delete: {
                apiRequestLink: 'parameter/deleteParameter'
            },
            deleteRows:{
                apiRequestLink: 'parameter/deleteParameters'
            },
            edit: {
                apiRequestLink: 'parameter/editParameter'
            },
            add: {
                apiRequestLink: 'parameter/addParameter',
                    data: {
                    CultureCode:sessionFactory.GetData(SessionStore.currentLanguage),
                        OptUserID:sessionFactory.GetData(SessionStore.userData).ID
                },
                form: {
                    opened: false,
                        label: 'Add New Parameter',
                        fields: [
                        {
                            label: 'Code',
                            type: 'text',
                            slugRequest: 'Code',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Code',
                            validation: {
                                required: true
                            }
                        },
                        {

                            label: 'Value',
                            type: 'text',
                            slugRequest: 'Value',
                            validation: {
                                required: true
                            }
                        },
                        {
                            label: 'Description',
                            type: 'text',
                            slugRequest: 'Description',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Description',
                            validation: {
                                required: true
                            }
                        },
                        {
                            label: 'Common',
                            type: 'checkbox',
                            slugRequest: 'VAT',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Vat'
                        }
                    ]
                }
            }
        }
        };
    });