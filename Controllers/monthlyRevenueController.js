

angular.module("gbsApp").controller("monthlyRevenueController",
    function ($scope, $rootScope, $location, $routeParams, appSettings, SessionStore,
             sessionFactory, accountFactory, mainFactory, Notify, ViewType, MenuType, dropdownFactory, $http) {
      
        var $baseApiUrl = appSettings.API_BASE_URL;
        //alert($baseApiUrl)
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];

        $scope.month = "12";
        $scope.year = "2015";

        $scope.selectLanguage = "Language";
        //alert($scope.selectLanguage)
        $scope.IsDataLoaded = false;
        $scope.langCode = "";
        $scope.selectLanguages = [];
        $scope.selectLanguages = accountFactory.AllCultures();
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);

        if (!$scope.CurrentUser)
            $location.path("/login-en");
        initializeController()
        function initializeController() {
            //alert('df')
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
            Getmonthlyrevenue();

        }
       
        var payablearray = [];
        var GrossRevenuearray = [];
        var xaxis = [];
        var totalvalcal = 0;
        var commissionvalcal = 0;

        var totaldays = getDaysInMonth($scope.month, $scope.year)
        var j = 0;
        for (var i = 1; i <= totaldays; i++) {
            payablearray.push(j);
            GrossRevenuearray.push(j);
            xaxis.push(i);
        }

        function Getmonthlyrevenue() {
            //alert($scope.month)
            $http({
                method: 'GET', url: appSettings.API_BASE_URL + 'invoice/getmonthlyrevenue',
                params: {
                    Month: $scope.month,
                    Year: $scope.year,
                    cultureCode: $scope.langCode
                }
            }).success(function (response, status, headers, config) {
                $scope.InvoiceDetail = response;

                $.each(response, function (key, val) {

                    for (var i = 1; i <= totaldays; i++) {

                        if (i == val.Date)
                        {
                            payablearray[i - 1] = val.GrossRevenue;
                            GrossRevenuearray[i - 1] = val.CommissionAmount;
                            totalvalcal += val.PayableAmount;
                            commissionvalcal += val.CommissionAmount;
                        }
                    }
                });
               
                chartdisplay();
            }).error(function (response) {
                Materialize.toast("Something wrong happens in sever:" + response.Message, 1000, "red");
            });
            setTimeout("chartdisplay()", 5000);
            //chartdisplay();
        }

        function getDaysInMonth(m, y) {
            --m;
            if (/8|3|5|10/.test(m)) return 30;
            if (m != 1) return 31;
            if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) return 29;
            return 28;
        }

        function chartdisplay() {
            //alert("hi")
            //var data1 = [2, 2, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 2, 4, 2, 5, 4, 5, 6, 9, 8, 1, 2, 3, 4, 5, 6, 5];
            //var data2 = [2, 4, 2, 5, 4, 5, 6, 9, 8, 1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 2, 5, 4, 5, 6, 9, 8, 1, 2, 3, 4, 5];
            //alert(payablearray)
            //alert(GrossRevenuearray)
           
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: xaxis
                   
                },
                credits: {
                    enabled: false
                }, 
                exporting: { 
                    enabled: false
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'EUR'
                    },
                    stackLabels: {
                        enabled: true,
                        
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },

                series: [{
                    name: 'Gross Revenue',
                    data: payablearray,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }, {
                    name: 'Commission',
                    data: GrossRevenuearray,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
            document.getElementById("totalval").innerHTML = totalvalcal;
            var monthvals = monthname($scope.month);
            document.getElementById("monthval").innerHTML = monthvals;
            document.getElementById("monthval1").innerHTML = monthvals;
            document.getElementById("commissionval").innerHTML = commissionvalcal;
            document.getElementById("invoicemonth").innerHTML = invoicemonthname($scope.month);
        }

        function monthname(monthNumber)
        {
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December'];
            return monthNames[monthNumber - 1];
        }

        function invoicemonthname(monthNumber) {
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December'];
            if (monthNumber == 12)
            {
                return monthNames[0];
            }
            return monthNames[monthNumber];
        }

        $scope.backToHome = function (id) {
            // alert("invoices-" + sessionFactory.GetData(SessionStore.currentLanguage))
            $location.path("invoices-" + sessionFactory.GetData(SessionStore.currentLanguage));
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