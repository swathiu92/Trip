(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchSidebar', ['$log', searchSidebar]);

    function searchSidebar($log) {
        var linker = function (scope) {
            var $priceRange = $("#price-range");
            var $minPriceLabel = $(".min-price-label");
            var $maxPriceLabel = $(".max-price-label");
            var $priceSliderRange = $priceRange.find('.ui-slider-range');
            $priceRange.slider({
                range: false,
                min: 0,
                max: 1000,
                values: [100, 1000],
                slide: function (event, ui) {
                    $priceSliderRange.css('width', ui.values[0] / 10 + '%');
                    $minPriceLabel.html("$" + ui.values[0]);;
                }
            });
            $minPriceLabel.html("$" + $priceRange.slider("values", 0));
            $maxPriceLabel.html("$" + $priceRange.slider("values", 1));

            //this is a hack to hide 2nd handle
            $($priceRange.find(".ui-slider-handle")[1]).hide();

            var $flTimes = $("#flight-times");
            var $startTimesLabel = $(".start-time-label");
            var $endTimesLabel = $(".end-time-label");
            var $fltimesSliderRange = $flTimes.find('.ui-slider-range');

            $flTimes.slider({
                range: false,
                min: 0,
                max: 1439,
                step: 5,
                values: [360, 1440],
                slide: function (event, ui) {
                    $fltimesSliderRange.css('width', ui.values[0] * (100 / 1439) + '%');
                    $startTimesLabel.html(convertTimeToHHMM(ui.values[0]));
                }
            });

            $startTimesLabel.html(convertTimeToHHMM($flTimes.slider("values", 0)));
            $endTimesLabel.html(convertTimeToHHMM($flTimes.slider("values", 1)));
            //this is a hack to hide 2nd handle
            $($flTimes.find(".ui-slider-handle")[1]).hide();
        }

        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.selectedPanel = "airlines-filter";

            $scope.panelClickedEvent = function (event) {
                $scope.selectedPanel = event.currentTarget.id;
                if ($("#" + event.currentTarget.id).hasClass('collapsed'))
                    $("#" + event.currentTarget.id).toggleClass('collapsed ');
                else
                    $("#" + event.currentTarget.id).toggleClass(' collapsed');
                if ($("#" + event.currentTarget.id + '-content').hasClass('panel-collapse collapse'))
                    $("#" + event.currentTarget.id + '-content').toggleClass('panel-collapse collapse panel-collapse collapse in');
                else
                    $("#" + event.currentTarget.id + '-content').toggleClass('panel-collapse collapse in panel-collapse collapse');
            }
        }];

        return {
            restrict: 'E',
            scope: {
                locationss: "=",
				count: "="
            },
            templateUrl: 'app-assets/flight/views/common/searchsidebar.html',
            controller: controller,
            link: linker,
        }
    };
}());