angular.module("gbsApp").controller("regionController",
              function($scope,$rootScope,$location,$routeParams,appSettings,SessionStore,
                          sessionFactory,accountFactory,mainFactory,Notify,ViewType,MenuType) {

    var $baseApiUrl = appSettings.API_BASE_URL;
      $scope.selectLanguage = "Language";
      $scope.langCode ="";
      $scope.selectLanguages=[];
      $scope.selectLanguages = accountFactory.AllCultures();
      $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
      $scope.selectedImage = {};
      $scope.editImage = {};
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
        mainFactory.SetViewType(ViewType.Region);
    };
    $scope.SignOut = function(){
        accountFactory.LogOut(accountFactory.UserData());
    };
    $scope.regionTableConfig 	=	{
        title: 'Region Management',
        apiRequestLink: 'region/getRegions',
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
                label: 'Country',
                sortable: true,
                model: 'Country',
                editForm: {
                    type: 'selectCascade',
                    slugRequest: 'CountryID',
                    selectors: [
                        {
                            apiRequestLink: 'dropdown/getCountries?Culture='+sessionFactory.GetData(SessionStore.currentLanguage),
                            parentSlugRequest: false,
                            requestType: 'GET',
                            model: 'ID',
                            optionText: 'Name',
                            options: [],
                            placeholder: 'Select Country',
                            validation: {
                                required: true
                            }
                        }
                    ]
                }
            },
            {
                label: 'ParentID',
                sortable: true,
                model: 'ParentID',
                align: 'center',
                editForm: {
                    type: 'number',
                    slugRequest: 'ParentID',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'SecondParentID',
                sortable: true,
                model: 'secondParentID',
                align: 'center',
                editForm: {
                    type: 'number',
                    slugRequest: 'secondParentID',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'RegionType',
                sortable: true,
                model: 'RegionType',
                editForm: {
                    type: 'text',
                    slugRequest: 'RegionType',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Region Type'
                }
            },
            {
                label: 'SubRegionType',
                sortable: true,
                model: 'SubRegionType',
                editForm: {
                    type: 'text',
                    slugRequest: 'SubRegionType',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'SubRegion Type'
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
                        required: true
                    }
                }
            },
            {
                label: 'Photo',
                sortable: false,
                model: 'Image',
                type:'image',
                editForm: {
                    type: 'file',
                    slugRequest: 'editImage',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Photo'
                }
            },
            {
                label: 'ASCII Name',
                sortable: true,
                model: 'NameASCII',
                editForm: {
                    type: 'text',
                    slugRequest: 'NameASCII',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'ASCII Name'
                }
            },
            {
                label: 'Name(English)',
                sortable: true,
                model: 'Name_en',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_en',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(English)'
                }
            },

            {
                label: 'Name(Turkish)',
                sortable: true,
                model: 'Name_tr',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_tr',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Turkish)'
                }
            },

            {
                label: 'Name(German)',
                sortable: true,
                model: 'Name_de',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_de',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(German)'
                }
            },

            {
                label: 'Name(Spanish)',
                sortable: true,
                model: 'Name_es',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_es',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Spanish)'
                }
            },

            {
                label: 'Name(French)',
                sortable: true,
                model: 'Name_fr',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_fr',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(French)'
                }
            },

            {
                label: 'Name(Russian)',
                sortable: true,
                model: 'Name_ru',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_ru',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Russian)'
                }
            },

            {
                label: 'Name(Italian)',
                sortable: true,
                model: 'Name_it',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_it',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Italian)'
                }
            },

            {
                label: 'Name(Arabic)',
                sortable: true,
                model: 'Name_ar',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_ar',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Arabic)'
                }
            },

            {
                label: 'Name(Japanese)',
                sortable: true,
                model: 'Name_ja',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_ja',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Japanese)'
                }
            },
            {
                label: 'Name(Portuguese)',
                sortable: true,
                model: 'Name_pt',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_pt',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Portuguese)'
                }
            },
            {
                label: 'Name(Chinese)',
                sortable: true,
                model: 'Name_za',
                editForm: {
                    type: 'text',
                    slugRequest: 'Name_za',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Name(Chinese)'
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
                    placeholder: 'Code'
                }
            },
            {
                label: 'Population',
                sortable: true,
                model: 'Population',
                editForm: {
                    type: 'number',
                    slugRequest: 'Population',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Population'
                }
            },
            {
                label: 'Included in search',
                sortable: true,
                model: 'IsIncludedInSearch',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'IsIncludedInSearch',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'City',
                sortable: true,
                model: 'IsCity',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'IsCity',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'Popular',
                sortable: true,
                model: 'IsPopular',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'IsPopular',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'Filter',
                sortable: true,
                model: 'IsFilter',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'IsFilter',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'Main Page Display',
                sortable: true,
                model: 'IsMainPageDisplay',
                type:'checkbox',
                editForm: {
                    type: 'checkbox',
                    slugRequest: 'IsMainPageDisplay',
                    apiRequestLink: false,
                    options: false
                }
            },
            {
                label: 'Main Page DisplaySort',
                sortable: true,
                model: 'MainPageDisplaySort',
                editForm: {
                    type: 'number',
                    slugRequest: 'MainPageDisplaySort',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Main Page DisplaySort'
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
                label: 'Latitude',
                sortable: true,
                model: 'Latitude',
                editForm: {
                    type: 'number',
                    slugRequest: 'Latitude',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Latitude'
                }
            },
            {
                label: 'Longitude',
                sortable: true,
                model: 'Longitude',
                editForm: {
                    type: 'number',
                    slugRequest: 'Longitude',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'Longitude'
                }
            },
            {
                label: 'MapZoomIndex',
                sortable: true,
                model: 'MapZoomIndex',
                editForm: {
                    type: 'number',
                    slugRequest: 'MapZoomIndex',
                    apiRequestLink: false,
                    options: false,
                    placeholder: 'MapZoomIndex'
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
                apiRequestLink: 'region/deleteRegion'
            },
            deleteRows:{
                apiRequestLink: 'region/deleteRegions'
            },
            edit: {
                apiRequestLink: 'region/editRegion'
            },
            add: {
                apiRequestLink: 'region/addRegion',
                data: {
                    OpUserID:sessionFactory.GetData(SessionStore.userData).ID
                },
                form: {
                    opened: false,
                    label: 'Add New Region',
                    fields: [
//                        {
//                            label: 'ID',
//                            type:'number',
//                            slugRequest: 'ID',
//                            apiRequestLink: false,
//                            options: false,
//                            placeholder: 'ID',
//                            validation: {
//                                required: true
//                            }
//                        },
                        {
                            label: 'Country',
                            type: 'selectCascade',
                            slugRequest: 'CountryID',
                            selectors: [
                                {
                                    apiRequestLink: 'dropdown/getCountries?Culture='+sessionFactory.GetData(SessionStore.currentLanguage),
                                    parentSlugRequest: false,
                                    requestType: 'GET',
                                    model: 'ID',
                                    optionText: 'Name',
                                    options: [],
                                    placeholder: 'Select Country'
                                }
                            ]
                        },
                        {
                            label: 'ParentID',
                            type:'number',
                            slugRequest: 'ParentID'
                        },
                        {
                            label: 'SecondParentID',
                            slugRequest: 'secondParentID',
                            type:'number'
                        },
                        {
                            label: 'Region Type',
                            type: 'text',
                            slugRequest: 'RegionType',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Region Type'
                        },
                        {
                            label: 'SubRegionType',
                            model: 'SubRegionType',
                            type: 'text',
                            slugRequest: 'SubRegionType',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'SubRegion Type'
                        },
                        {
                            label: 'Name',
                            model: 'Name',
                            type: 'text',
                            slugRequest: 'Name',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Country Name',
                            validation: {
                                required: true
                            }

                        },
                        {
                            label: 'Photo',
                            model:'selectedImage',
                            type: 'file',
                            slugRequest: 'selectedImage',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Photo'

                        },
                        {
                            label: 'ASCII Name',
                            model: 'NameASCII',
                            type: 'text',
                            slugRequest: 'NameASCII',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'ASCII Name'

                        },
                        {
                            label: 'Name(English)',
                            model: 'Name_en',
                            type: 'text',
                            slugRequest: 'Name_en',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Name(English)'

                        },

                        {
                            label: 'Name(Turkish)',
                            model: 'Name_tr',
                            type: 'text',
                            slugRequest: 'Name_tr',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Name(Turkish)'

                        },

                        {
                            label: 'Name(German)',
                            model: 'Name_de',
                            type: 'text',
                            slugRequest: 'Name_de',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Name(German)'

                        },

                        {
                            label: 'Name(Spanish)',
                            model: 'Name_es',

                                type: 'text',
                                slugRequest: 'Name_es',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Spanish)'

                        },

                        {
                            label: 'Name(French)',
                            model: 'Name_fr',
                                type: 'text',
                                slugRequest: 'Name_fr',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(French)'

                        },

                        {
                            label: 'Name(Russian)',
                            model: 'Name_ru',
                                type: 'text',
                                slugRequest: 'Name_ru',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Russian)'
                        },

                        {
                            label: 'Name(Italian)',
                            model: 'Name_it',
                                type: 'text',
                                slugRequest: 'Name_it',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Italian)'
                        },

                        {
                            label: 'Name(Arabic)',

                            model: 'Name_ar',

                                type: 'text',
                                slugRequest: 'Name_ar',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Arabic)'

                        },

                        {
                            label: 'Name(Japanese)',

                            model: 'Name_ja',

                                type: 'text',
                                slugRequest: 'Name_ja',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Japanese)'

                        },
                        {
                            label: 'Name(Portuguese)',

                            model: 'Name_pt',

                                type: 'text',
                                slugRequest: 'Name_pt',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Portuguese)'

                        },
                        {
                            label: 'Name(Chinese)',

                            model: 'Name_za',

                                type: 'text',
                                slugRequest: 'Name_za',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Name(Chinese)'

                        },
                        {
                            label: 'Code',

                            model: 'Code',

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
                            label: 'Population',

                            model: 'Population',

                                type: 'number',
                                slugRequest: 'Population',
                                apiRequestLink: false,
                                options: false,
                                placeholder: 'Population'

                        },
                        {
                            label: 'Included in search',

                            model: 'IsIncludedInSearch',


                                type: 'checkbox',
                                slugRequest: 'IsIncludedInSearch',
                                apiRequestLink: false,
                                options: false

                        },
                        {
                            label: 'City',

                            model: 'IsCity',


                                type: 'checkbox',
                                slugRequest: 'IsCity',
                                apiRequestLink: false,
                                options: false

                        },
                        {
                            label: 'Popular',

                            model: 'IsPopular',
                            type:'checkbox',

                                slugRequest: 'IsPopular',
                                apiRequestLink: false,
                                options: false

                        },
                        {
                            label: 'Filter',

                            model: 'IsFilter',
                            type: 'checkbox',
                            slugRequest: 'IsFilter',
                            apiRequestLink: false,
                            options: false

                        },
                        {
                            label: 'Main Page Display',
                            model: 'IsMainPageDisplay',
                            type: 'checkbox',
                            slugRequest: 'IsMainPageDisplay',
                            apiRequestLink: false,
                            options: false

                        },
                        {
                            label: 'Main Page DisplaySort',
                            model: 'MainPageDisplaySort',
                            type: 'number',
                            slugRequest: 'MainPageDisplaySort',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Main Page DisplaySort'

                        },
                        {
                            label: 'Sort',
                            model: 'Sort',
                            type: 'number',
                            slugRequest: 'Sort',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Sort'

                        },
                        {
                            label: 'Latitude',
                            type: 'number',
                            slugRequest: 'Latitude',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Latitude'

                        },
                        {
                            label: 'Longitude',
                            type: 'number',
                            slugRequest: 'Longitude',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Longitude'

                        },
                        {
                            label: 'MapZoomIndex',
                            type: 'number',
                            slugRequest: 'MapZoomIndex',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'MapZoomIndex'

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
                            label: 'Active',
                            type: 'checkbox',
                            slugRequest: 'Active',
                            apiRequestLink: false,
                            options: false,
                            placeholder: 'Active'
                        }
                    ]
                }
            }
        }
    };

});