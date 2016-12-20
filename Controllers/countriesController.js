angular.module("gbsApp").controller("countriesController",
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
        mainFactory.SetViewType(ViewType.Country);
    };
    $scope.SignOut = function(){
        accountFactory.LogOut(accountFactory.UserData());
    };
    $scope.countryTableConfig 	=	{
        title: 'Country Management',
        apiRequestLink: 'country/getCountries',
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
                label: 'Symbol',
                sortable: true,
                model: 'Currency',
                editForm: {
                    type: 'selectCascade',
                    slugRequest: 'CurrencyID',
                    selectors: [
                        {
                            apiRequestLink: 'dropdown/getCurrencies?Culture='+sessionFactory.GetData(SessionStore.currentLanguage),
                            parentSlugRequest: false,
                            requestType: 'GET',
                            model: 'ID',
                            optionText: 'Name',
                            options: [],
                            placeholder: 'Select Currency'
                        }
                    ]
                }
            },
            {
                label: 'Name',
                sortable: true,
                model: 'Name',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Country Name',
                    validation: {
                        required: true,
                        maxlength:100
                    }
                }
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
                    placeholder: 'Country Code',
                    validation: {
                        required: true,
                        maxlength:2
                    }
                }
            },
            {
                label: 'Culture',
                sortable: true,
                model: 'CultureCode',
                editForm: {
                    type: 'text',
                    slugRequest: 'CultureCode',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Culture',
                    validation: {
                        required: true
                    }
                }
            },
            {
                label: 'Vat',
                sortable: true,
                model: 'VAT',
                editForm: {
                    type: 'number',
                    slugRequest: 'VAT',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Vat'
                }
            },
            {
                label: 'CityTax',
                sortable: true,
                model: 'CityTax',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'CityTax',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'CityTax'
                }
            },
            {
                label: 'HitCount',
                sortable: true,
                model: 'HitCount',
                editForm: false
            },
            {
                label: 'Sort',
                sortable: true,
                model: 'Sort',
                editForm: {
                    type: 'number',
                    slugRequest: 'Sort',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Sort'
                }
            },
            {
                label: 'Active',
                sortable: true,
                model: 'Active',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'Active',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Active',
                    validation: {
                        required: false
                    }
                }
            },
            {
                label: 'TemporaryCode',
                sortable: true,
                model: 'TemporaryCode',
                editForm: {
                    type: 'number',
                    slugRequest: 'TemporaryCode',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'TemporaryCode'
                }
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
                label: 'NAME',
                model: 'Name',
                slugRequest: 'Name',
                type: 'text'
            }
        ],
        actions: {
            delete: {
                apiRequestLink: 'country/deleteCountry'
            },
            deleteRows:{
                apiRequestLink: 'country/deleteCountries'
            },
            edit: {
                apiRequestLink: 'country/editCountry'
            },
            add: {
                apiRequestLink: 'country/addCountry',
                data: {
                    CultureCode:sessionFactory.GetData(SessionStore.currentLanguage),
                    OptUserID:sessionFactory.GetData(SessionStore.userData).ID
                },
                form: {
                    opened: false,
                    label: 'Add New Country',
                    fields: [
                        {
                            label: 'Name',
                            type: 'text',
                            slugRequest: 'Name',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Country Name',
                            validation: {
                                required: true,
                                maxlength:100
                            }
                        },
                        {
//                            label: 'Currency',
//                            type: 'select',
//                            slugRequest: 'CurrencyID',
//                            apiRequestLink: 'dropdown/getCurrencies?Culture='+sessionFactory.GetData(SessionStore.currentLanguage),
//                            model: 'ID',
//                            optionText: 'Name',
//                            options: [],
//                            placeholder: 'Select Currency'

                            label: 'Currency',
                            type: 'selectCascade',
                            slugRequest: 'CurrencyID',
                            selectors: [
                                {
                                    apiRequestLink: 'dropdown/getCurrencies?Culture='+sessionFactory.GetData(SessionStore.currentLanguage),
                                    parentSlugRequest: false,
                                    requestType: 'GET',
                                    model: 'ID',
                                    optionText: 'Name',
                                    options: [],
                                    placeholder: 'Select Currency'
                                }
                            ]
                        },
                        {
                            label: 'Code',
                            type: 'text',
                            slugRequest: 'Code',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Code',
                            validation: {
                                required: true,
                                maxlength:2
                            }
                        },
                        {
                            label: 'Vat',
                            type: 'number',
                            slugRequest: 'VAT',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Vat'
                        },
                        {
                            label: 'CityTax',
                            type: 'checkbox',
                            slugRequest: 'CityTax',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'CityTax'
                        },
                        {
                            label: 'Sort',
                            type: 'number',
                            slugRequest: 'Sort',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Sort'
                        }
                        ,
                        {
                            label: 'Active',
                            type: 'checkbox',
                            slugRequest: 'Active',
                            apiRequestLink: false,
                            options: false
                        }
                        ,
                        {
                            label: 'Temporary Code',
                            type: 'number',
                            slugRequest: 'TemporaryCode',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Temporary Code'
                        }
                    ]
                }
            }
        }
    };

});