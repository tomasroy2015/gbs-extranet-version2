//Balstechnology-AJ

var array2 = [];
var id2 = "";
angular.module("gbsApp").controller("addroomController", function ($scope, $http, appSettings, SessionStore,
             sessionFactory, accountFactory, ViewType, MenuType, $rootScope, $location, $routeParams, mainFactory, propertyFacilitiesFactory, dropdownFactory, $timeout) {
    var $baseApiUrl = appSettings.API_BASE_URL;
    $scope.selectLanguage = "Language";
    $scope.langCode = "";
    $scope.PropertyFacilities = null;
    $scope.selectLanguages = [];
    $scope.selectedCards = [];
    $scope.selectedUnit = {};
    $scope.selectLanguages = accountFactory.AllCultures();
    $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
    if (!$scope.CurrentUser)
        $location.path("/login-en");
    var hotelid = "";

    $scope.initializeController = function () {
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
        hotelid = sessionFactory.GetData(SessionStore.Hotelroomid);
       
        Initialize();

        var atttributesrray = [];
    }
    function  EditDisplay()
    {
        $scope.hotelroomid = sessionFactory.GetData(SessionStore.Hotelroomid);
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/Editroomdetails',
            params: {hotelroomid: $scope.hotelroomid }
        }).success(function (response, status, headers, config) {
            $scope.EditDisplay = response;

            $scope.RoomTypeID = $scope.EditDisplay[0].RoomTypeID;
            $scope.RoomCount = $scope.EditDisplay[0].RoomCount;
            $scope.RoomSize = $scope.EditDisplay[0].RoomSize;
            $scope.MaxPeopleCount = $scope.EditDisplay[0].MaxPeopleCount;
            $scope.MaxChildrenCount = $scope.EditDisplay[0].MaxChildrenCount;
            $scope.BabyCotCount = $scope.EditDisplay[0].BabyCotCount;
            $scope.ExtraBedCount = $scope.EditDisplay[0].ExtraBedCount;
            $scope.SmokingTypeID = $scope.EditDisplay[0].SmokingTypeID;
            $scope.ViewTypeID = $scope.EditDisplay[0].ViewTypeID;
            $timeout(function () {
                document.getElementById('drpRoomType').value = $scope.RoomTypeID;
            }, 1500);
            document.getElementById("txtRoomCount").value = $scope.RoomCount;
            document.getElementById("txtRoomSize").value = $scope.RoomSize;
            document.getElementById("txtRoomMaxPeopleCount").value = $scope.MaxPeopleCount;
            document.getElementById("txtRoomMaxChildrenCount").value = $scope.MaxChildrenCount;
            document.getElementById("txtBabyCotCount").value = $scope.BabyCotCount;
            document.getElementById("txtExtraBedCount").value = $scope.ExtraBedCount;
            $timeout(function () {
                document.getElementById('drpSmokingStatus').value = $scope.SmokingTypeID;
            }, 500);
            $timeout(function () {
                document.getElementById('drpViewType').value = $scope.ViewTypeID;
            }, 500);
          
            $timeout(function () {
                EditAttributeHeaders();
            }, 1000);
            $timeout(function () {
                EditHotelRoomBeds();
            }, 1400);
           
        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }

    function EditHotelRoomBeds()
    {
       // alert('sf')
        $scope.hotelroomid = sessionFactory.GetData(SessionStore.Hotelroomid);
       // alert($scope.hotelroomid)
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/EditHotelRoomBeds',
            params: { hotelroomid: $scope.hotelroomid }
        }).success(function (response, status, headers, config) {
            $scope.EditHotelRoomBeds = response;
          //  document.getElementById("hdnroomid").value = $scope.EditHotelRoomBeds.HotelRoomID;
            _.forEach($scope.EditHotelRoomBeds, function (c) {
                var arryoption = [];
                var arraybedtype = [];
                var arraycount = [];
                var arrayroomid = [];
                arryoption.push(c.OptionNo);
                arraybedtype.push(c.BedTypeID);
                arraycount.push(c.Count);
                arrayroomid.push(c.HotelRoomID);
                document.getElementById("hdnroomid").value = arrayroomid;
                
                if (c.OptionNo =="1") {
                    document.getElementById('' + arryoption + '_txtbeddetails_' + arraybedtype + '').value = arraycount;
                }
                if (c.OptionNo == "2") {
                    document.getElementById('' + arryoption + '_txtbeddetails_' + arraybedtype + '').value = arraycount;
                }
                if (c.OptionNo == "3") {
                    document.getElementById('' + arryoption + '_txtbeddetails_' + arraybedtype + '').value = arraycount;
                }
            });
        }).error(function (response) {
            // alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }

    function EditAttributeHeaders()
    {
        $scope.hotelroomid = sessionFactory.GetData(SessionStore.Hotelroomid);
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/EditAttributeHeaders',
            params: {hotelroomid: $scope.hotelroomid }
        }).success(function (response, status, headers, config) {
            
            $scope.Editattributeheader = response;
            $scope.Editattributeheader = response;
            _.forEach($scope.AttributeHeaders, function (h) {
                _.forEach($scope.Editattributeheader, function (c) {

                    if (c.AttributeId == h.AttributeId) {
                        h.IsSelected = true;
                    }
                });
            });
              
               
            


        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
    }

    function Initialize() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/addroomsinsert',
        }).success(function (response, status, headers, config) {      
            $scope.RoomType = response;
        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
        Somking();
    }
    function Somking() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/smoking',
        }).success(function (response, status, headers, config) {
            $scope.smokingType = response;
        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
        RoomView();
    }

    function RoomView() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/RoomView',
        }).success(function (response, status, headers, config) {
            $scope.RoomViewType = response;
        }).error(function (response) {
            // alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
        Language();
    }

    function Language() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/Language',
        }).success(function (response, status, headers, config) {
            $scope.LanguageType = response;
        }).error(function (response) {
            //alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
        Roombed();
    }
    function Roombed() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/Roombed',
        }).success(function (response, status, headers, config) {
            $scope.Roombed = response;
        }).error(function (response) {
            // alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });
        AttributeHeaders();
    }

    var headarr = [];
    var scopearr = [];
    function AttributeHeaders() {
        $http({
            method: 'GET',
            url: appSettings.API_BASE_URL + 'addrooms/AttributeHeaders',
        }).success(function (response, status, headers, config) {

           // alert(response)
            $scope.AttributeHeaders = response;
           // alert(response.length);
            //for (var i = 0; i < response.length; i++)
            //{
            //    headarr.push($scope.AttributeHeaders[i].AttributeHeaderName)
            //}
            //var uniqueNames = [];
            //$.each(headarr, function (i, el) {
            //    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            //});
            //$scope.dfgdf = uniqueNames;
            //alert(uniqueNames)
           
        }).error(function (response) {
            // alert('error')
            Materialize.toast("Server error occured ", 5000, 'red');
        });

        if (hotelid != undefined) {
            EditDisplay();
        }
    }
    $scope.myFilter = function (item) {
      
        return item === 'Pool and wellnessPool' || item === 'Activities';

    };
    $scope.bntbalck = function () {
        sessionFactory.RemoveByKey(SessionStore.Hotelroomid);
        $location.path("room-" + sessionFactory.GetData(SessionStore.currentLanguage));
    };
    $scope.savehotelroom = function(){
    //alert('df')
        $scope.CurrentUser = sessionFactory.GetObject(SessionStore.userData);
        $scope.HotelRoomID = document.getElementById("hdnroomid").value;
        //alert($scope.HotelRoomID)
          $scope.RoomType = angular.element('#drpRoomType').val();
          $scope.RoomCount = angular.element('#txtRoomCount').val();
          $scope.RoomSize = angular.element('#txtRoomSize').val();
          $scope.RoomMaxPeopleCount = angular.element('#txtRoomMaxPeopleCount').val();
          $scope.RoomMaxChildrenCount = angular.element('#txtRoomMaxChildrenCount').val();
          $scope.BabyCotCount = angular.element('#txtBabyCotCount').val();
          $scope.ExtraBedCount = angular.element('#txtExtraBedCount').val();
          $scope.SmokingStatus = angular.element('#drpSmokingStatus').val();
          $scope.ViewType = angular.element('#drpViewType').val();
          $scope.Culture = angular.element('#drpCulture').val();
          $scope.Description = angular.element('#txtDescription').val();

          if ($scope.RoomType == "0") {
              document.getElementById("lblRoomTypeID").style.display = '';
          }
          else {
              document.getElementById("lblRoomTypeID").style.display = 'none';
          }
          if ($scope.RoomCount == "") {
              document.getElementById("lblRoomCount").style.display = '';
          }
          else {
              document.getElementById("lblRoomCount").style.display = 'none';
          }

          if ($scope.RoomSize == "") {
              document.getElementById("lblRoomSize").style.display = '';
          }
          else {
              document.getElementById("lblRoomSize").style.display = 'none';
          }
          if ($scope.RoomMaxPeopleCount == "") {
              document.getElementById("lblRoomMaxPeopleCount").style.display = '';
          }
          else {
              document.getElementById("lblRoomMaxPeopleCount").style.display = 'none';
          }

          var RoomCountCheck = "Valid";
          var BedTextCount = [];
          var BedCountDetails = [];
          for (var i = 1; i <= 3; i++) {
              for (var j = 1; j <= 6; j++) {
                    var BedText = document.getElementById('' + i + '_txtbeddetails_' + j + '').value;
                  var BedTextValue = i + ';' + BedText + ';' + j;
                  BedTextCount.push(BedTextValue);
                  if (BedText != "") {
                      BedCountDetails.push(BedText);
                      if (BedText > 5) {
                          RoomCountCheck = "Invalid";
                      }
                  }
              }
          }
          var BedCountText = BedTextCount.join(',');

          var chkHotelAttributes = [];
          $(".chkAttributes:checked").each(function () {
              chkHotelAttributes.push($(this).val());
          });

          $scope.HotelAttributes = chkHotelAttributes.join(',');
         
          if ($scope.RoomType != "0" && $scope.RoomCount != "" && $scope.RoomSize != "" && $scope.RoomMaxPeopleCount != "") {
              $scope.Validmessage = "";
              $http({
                  method: 'Post',
                  url: appSettings.API_BASE_URL + 'addrooms/InsertRoom',
                  params: { HotelID: $scope.CurrentUser.HotelID,HotelRoomID:$scope.HotelRoomID, RoomType: $scope.RoomType, RoomCount: $scope.RoomCount, RoomSize: $scope.RoomSize, RoomMaxPeopleCount: $scope.RoomMaxPeopleCount, RoomMaxChildrenCount: $scope.RoomMaxChildrenCount, BabyCotCount: $scope.BabyCotCount, ExtraBedCount: $scope.ExtraBedCount, SmokingStatus: $scope.SmokingStatus, ViewType: $scope.ViewType, Culture: $scope.Culture, Description: $scope.Description, HotelAttributes: $scope.HotelAttributes, BedCountText: BedCountText }
              }).success(function (response, status, headers, config) {
                  //alert('sueccess')
                  // alert(response)
                  if ($scope.HotelRoomID != "")
                  {
                      Materialize.toast("Room Updated successfully.", 5000, 'green');
                      Initialize();
                  }
                  else if($scope.HotelRoomID == "") {
                      Materialize.toast("Room Inserted successfully.", 5000, 'green');
                  }
              }).error(function (response) {
                  // alert('error')
                  Materialize.toast("Server error occured ", 5000, 'red');
              });
          }
          else {
              $scope.Validmessage = "Please Enter the Column value RoomType,RoomCount,RoomSize and Maximum number of persons";
          }
    }
    $scope.RoomCounts = function () {
        var value = 1001;
        var RoomCount = angular.element('#txtRoomCount').val();

        if (RoomCount >= value || RoomCount == 0) {

            document.getElementById("lblRoomCountWarning").style.display = '';
        }

        else if (RoomCount <= value && RoomCount != 0) {
            document.getElementById("lblRoomCountWarning").style.display = 'none';
        }
    }

    $scope.RoomSizes = function () {
        var value = 501;
        var RoomSize = angular.element('#txtRoomSize').val(); 

        if (RoomSize >= value || RoomSize == 0) {

            document.getElementById("lblRoomSizeWarning").style.display = '';            

        }

        else if (RoomSize <= value && RoomSize != 0) {
            document.getElementById("lblRoomSizeWarning").style.display = 'none';

        }
    }

    $scope.RoomMaxPeopleCounts = function () {
        var value = 16;
        var RoomMaxPeopleCount = angular.element('#txtRoomMaxPeopleCount').val(); 

        if (RoomMaxPeopleCount >= value || RoomMaxPeopleCount == 0) {

            document.getElementById("lblRoomMaxPeopleCountWarning").style.display = '';
        }

        else if (RoomMaxPeopleCount <= value && RoomMaxPeopleCount != 0) {
            document.getElementById("lblRoomMaxPeopleCountWarning").style.display = 'none';

        }
    }

    $scope.RoomMaxChildrenCounts = function () {
        var value = 16;
        var RoomMaxChildrenCount =angular.element('#txtRoomMaxChildrenCount').val();

        if (RoomMaxChildrenCount >= value) {

            document.getElementById("lblRoomMaxChildrenCountWarning").style.display = '';
        }

        else if (RoomMaxChildrenCount <= value) {
            document.getElementById("lblRoomMaxChildrenCountWarning").style.display = 'none';

        }
    }

    $scope.RoomBabyCotCounts = function () {
        var value = 11;
        var BabyCotCount = angular.element('#txtBabyCotCount').val(); 

        if (BabyCotCount >= value) {

            document.getElementById("lblRoomBabyCotCountWarning").style.display = '';
        }

        else if (BabyCotCount <= value) {
            document.getElementById("lblRoomBabyCotCountWarning").style.display = 'none';

        }
    }

    $scope.RoomExtraBedCount = function () {
        var value = 11;
        var ExtraBedCount = angular.element('#txtExtraBedCount').val(); 

        if (ExtraBedCount >= value) {

            document.getElementById("lblRoomExtraBedCountWarning").style.display = '';
        }

        else if (ExtraBedCount <= value) {
            document.getElementById("lblRoomExtraBedCountWarning").style.display = 'none';

        }
    }

    $scope.goToMenu = function (type) {
        mainFactory.SetViewType(type);
        $scope.selectedView = type;
    };
    $scope.setLanguage = function (value) {
        $scope.selectLanguage = value.name;
        accountFactory.SetCurrentLanguage(value.code);
        mainFactory.SetViewType(ViewType.Parameter);
    };
    $scope.SignOut = function () {
        accountFactory.LogOut(accountFactory.UserData());
    };


});