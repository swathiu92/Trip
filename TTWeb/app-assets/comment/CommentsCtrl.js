(function () {
    angular.module("ttuApp")
    .controller('CommentsCtrl', ['$scope', '$state', '$http', '$timeout', '$location', commentsCtrl]);
    function commentsCtrl($scope, $rootScope, $state, $http, $timeout, $location) {
        var grid_pager = "#route-grid-pager";
        var $grid = $("#route-grid-table");
        var LOCATION_URL = 'api/CommentsJq';
        //resize to fit page size
        $(window).on('resize.jqGrid', function () {
            var size = $("#gridContainer").width();
            $grid.jqGrid('setGridWidth', size);
        });

        $grid.jqGrid({
            url: LOCATION_URL,
            datatype: "json",
            mtype: 'GET',
            height: 'auto',
            colNames: ['Id', 'Company', 'Name', 'Description', 'Registration Date', 'Review StartDate', 'Review EndDate'],
            colModel: [
                        {
                            name: 'Id', width: 2, index: 'Id', sortable: false, hidden: true
                        },
                        {
                            name: 'CompanyName', width: 80, index: 'CompanyName', sortable: true, search: true,
                            searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw'] }
                        },
                        {
                            name: 'Name', width: 80, index: 'Name', sortable: true,
                            searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw'] }
                        },
                        {
                            name: 'Description', width: 180, index: 'Description', sortable: false, search: false,
                        },
                        {
                            name: 'RegistrationDate', width: 120, index: 'RegistrationDate', sortable: true,
                            searchoptions: { sopt: ['lt', 'eq', 'gt'] },
                            orttype: "date", "formatter": "date", "formatoptions": { "srcformat": "d/m/Y H:i:s", "newformat": 'd/m/Y' }
                        },
                        {
                            name: 'ReviewStartDate', width: 120, index: 'ReviewStartDate', sortable: true,
                            searchoptions: { sopt: ['lt', 'eq', 'gt'] },
                            orttype: "date", "formatter": "date", "formatoptions": { "srcformat": "d/m/Y H:i:s", "newformat": 'd/m/Y' }

                        },
                        {
                            name: 'ReviewEndDate', width: 120, index: 'ReviewEndDate', sortable: true,
                            searchoptions: { sopt: ['lt', 'eq', 'gt'] },
                            orttype: "date", "formatter": "date", "formatoptions": { "srcformat": "d/m/Y H:i:s", "newformat": 'd/m/Y' }

                        }

            ],

            sortname: 'Name',
            sortorder: "desc",
            viewrecords: true,
            rowNum: 10,
            rowList: [5, 10, 20, 25],
            pager: grid_pager,
            altRows: true,
            autowidth: true,
            shrinkToFit: true,
            forceFit: true,
            multiselect: true,
            multiboxonly: true,
            gridview: false,
            loadError: function (xhr) {
                alert(xhr.responseText + xhr.status);
            },

            loadSuccess: function (result) {
                alert(JSON.sstringify(result));
            },
            success: function (result) {
                alert(JSON.sstringify(result));
            },
            loadComplete: function () {
                var table = this;
                setTimeout(function () {
                    updatePagerIcons(table);
                }, 0);

            },
            gridComplete: function () {
                if ($grid.getGridParam("records") == 0) {
                    $grid.addRowData(
                          "blankRow", { "Id": "No Comment found", "RouteText": "", "ResourceKey": "" });
                }
                //resize grid after load complete as in chrome- grid width becomes more than container after load complete
                if ($grid.is(":visible")) {
                    var size = $("#gridContainer").width();
                    $grid.jqGrid('setGridWidth', size);
                }
            }

        });

        //navButtons
        $grid.jqGrid('navGrid', grid_pager, {
            edit: false,
            add: false,
            del: false,
            search: true, // show search button on the toolbar
            searchicon: 'fa fa-search orange',
            searchtext: "Search&nbsp;&nbsp;",
            refresh: true,
            refreshicon: 'fa fa-refresh green',
            refreshtext: "Reload&nbsp;&nbsp;",
        },
        {}, //Edit options
        {}, // Add options
        {}, // Delete options
        {
            multipleSearch: true,
            multipleGroup: false,
            recreateForm: true,
            afterShowSearch: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                style_search_form(form);
            },
            afterRedraw: function () {
                style_search_filters($(this));
            }
        },//Search
        {}) // refresh options
        .navSeparatorAdd(grid_pager, {
            sepclass: 'ui-separator', sepcontent: ''
        })
        .navButtonAdd(grid_pager, {
            caption: "New Tag",
            buttonicon: 'fa fa-plus',
            onClickButton: function () {
                $state.go('products.add');
            },
            position: "last"
        })


    }

})();