/**
 * Created by Tomas on 27-Dec-16.
 */
angular.module("gbsApp").service('fileUploadService', ['$http','$rootScope',
                    function ($http, $rootScope) {
    this.uploadFileToUrl = function (file, uploadUrl,partID,userID,recordID,hotelID) {
//        var fd = new FormData();
//        fd.append('file', file);

//        $http.post(uploadUrl, fd, {
//            transformRequest: angular.identity,
//            headers: { 'Content-Type': undefined }
//        })
        $http({
            method: 'POST',
            url: uploadUrl,
            headers: { 'Content-Type': undefined },

            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("file", data.file);
                return formData;
            },
            data: { file: file},
            params:{hotelID:hotelID,partID:partID,userID:userID,recordID:recordID}
        })
        .success(function (response) {
           // $rootScope.$broadcast("photoUploaded", response);
            console.log(response);
        })
        .error(function () {
        });
    }
}]);