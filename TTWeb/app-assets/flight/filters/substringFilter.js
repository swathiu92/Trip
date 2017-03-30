(function() {
    "use strict";
    angular.module("common.services")
        .filter('substringFilter', function() {
            return function(input) {
                var transformedInput = input.substring(0, 3);
                return transformedInput;
            };
        });
}());