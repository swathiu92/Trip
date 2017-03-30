(function() {
    "use strict";
    angular.module("common.services")
        .filter('dateSplit', function(CONSTANTS, $filter) {
            return function(input) {
                var transformedInput = {};
                transformedInput.date = input.getDate();
                transformedInput.month = CONSTANTS.months[input.getMonth()];
                transformedInput.day = CONSTANTS.days[input.getDay()];
                transformedInput.year = $filter("date")(input, "yy");
                return transformedInput;
            };
        });
}());