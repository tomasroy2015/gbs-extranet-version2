/**
 * Created by Tomas on 27-Dec-16.
 */
//angular.module("gbsApp").directive('fileModel', ['$parse', function ($parse) {
//    return {
//        restrict: 'A',
//        link: function (scope, element, attrs) {
//            var model = $parse(attrs.fileModel);
//            var modelSetter = model.assign;
//
//            element.bind('change', function () {
//                scope.$apply(function () {
//                    modelSetter(scope, element[0].files[0]);
//                });
//            });
//        }
//    };
//}]);

angular.module("gbsApp").directive('fileUpload', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileUpload);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
//                    var value = {
//                        // File Name
//                        name: item.name,
//                        //File Size
//                        size: item.size,
//                        //File URL to view
//                        url: URL.createObjectURL(item),
//                        // File Input Value
//                        _file: item
//                    };
                    values.push(item);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);