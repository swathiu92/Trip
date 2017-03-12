(function () {
    angular.module("ttuApp")
    .controller('UsersCtrl', ['$scope', '$rootScope','$state', '$http', '$timeout', '$location', 'usersResource', usersCtrl]);
    function usersCtrl($scope, $rootScope, $state, $http, $timeout, $location, usersResource) {
        var grid_pager = "#route-grid-pager";
        var $grid = $("#route-grid-table");
        var LOCATION_URL = 'api/UsersJq';
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
            colNames: ['Name', 'Email Id', 'Contact', 'Roles'],
            colModel: [
                        {
                            name: 'Name', width: 100, index: 'Name', sortable: true,
                            searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw'] }
                        },
                        {
                            name: 'Email', width: 180, index: 'Email', sortable: true,
                            searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw'] }
                        },
                        {
                            name: 'PhoneNumber', width: 100, index: 'PhoneNumber', sortable: true,
                            searchoptions: { sopt: ['cn', 'eq', 'ne', 'bw'] }
                        },
                        {
                            name: 'Roles', width: 120, index: 'Roles', sortable: false, search:false,
                        }

            ],

            sortname: 'Email',
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
                          "blankRow", { "Id": "No user found", "RouteText": "", "ResourceKey": "" });
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
            refresh: true,
            refreshicon: 'fa fa-refresh green',
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
            caption: "Add User",
            buttonicon: 'fa fa-user',
            title:"Adds New User",
            onClickButton: function () {
                $state.go('users.add');
            },
            position: "last"
        })


    }

})();