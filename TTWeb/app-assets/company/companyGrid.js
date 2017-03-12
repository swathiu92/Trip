(function () {
    "use strict";
    angular.module("ttuApp")
            .directive("companyGrid", ["$state","$log", companyGrid]);

    function companyGrid($state) {
        var template = '<div class="row" style="margin-top: 10px; position:relative;z-index:1;" id="cgContainer">'+
           '<table id="cgTable"></table>'+
                '<div id="cgPager"></div>'+
                '</div';
        return {
            restrict: 'E',
            template:template, 
            scope: true,
            link: function (scope, element, attrs) {
                var cgPager = "#cgPager";
                var $companyGrid = $("#cgTable");
                var $cgContainer = $("#cgContainer");

                var LOCATION_URL = 'api/Companies';

                $companyGrid.jqGrid({
                    url: LOCATION_URL,
                    datatype: "json",
                    mtype: 'GET',
                    width: '100%',
                    height: '100%',
                    colNames: ['Id', 'Name', 'Description', 'Registration Date', 'LastAccess Date'],
                    colModel: [
                                {
                                    name: 'Id', width: 2, index: 'Id', sortable: false, hidden: true
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
                                    name: 'LastAccessDate', width: 120, index: 'LastAccessDate', sortable: true,
                                    searchoptions: { sopt: ['lt', 'eq', 'gt'] },
                                    orttype: "date", "formatter": "date", "formatoptions": { "srcformat": "d/m/Y H:i:s", "newformat": 'd/m/Y' }

                                }

                    ],

                    sortname: 'RegistrationDate',
                    sortorder: "desc",
                    viewrecords: true,
                    rowNum: 10,
                    rowList: [5, 10, 20, 25],
                    pager: cgPager,
                    altRows: true,
                    autowidth: true,
                    shrinkToFit: true,
                    forceFit: true,
                    multiselect: false,
                    multiboxonly: true,
                    gridview: true,
                    loadError: function (result) {
                        alert(JSON.stringify(result));
                        $log.info("company grid:loadError" + JSON.stringify(result));
                    },

                    loadComplete: function () {
                        var table = this;
                        setTimeout(function () {
                            updatePagerIcons(table);
                        }, 0);

                    },
                    gridComplete: function () {
                        if ($companyGrid.getGridParam("records") == 0) {
                            $companyGrid.addRowData(
                                  "blankRow", { "Id": "No company found", "RouteText": "", "ResourceKey": "" });
                        }
                        //resize grid after load complete as in chrome- grid width becomes more than container after load complete
                        if ($companyGrid.is(":visible")) {
                            var size = $("#gridContainer").width();
                            $companyGrid.jqGrid('setGridWidth', size);
                        }
                    }

                });

                //navButtons
                $companyGrid.jqGrid('navGrid', cgPager, {
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
                .navSeparatorAdd(cgPager, {
                    sepclass: 'ui-separator', sepcontent: ''
                })
                .navButtonAdd(cgPager, {
                    caption: "Add Company",
                    title: "Add Company",
                    buttonicon: 'fa fa-building',
                    onClickButton: function () { scope.addCompany(); }
                })
                .navButtonAdd(cgPager, {
                    caption: "View Products",
                    title: "View Products",
                    buttonicon: 'fa fa-eye fa-cube',
                    onClickButton: function () {
                        var selectedRow = $companyGrid.getGridParam("selrow");
                        var rowData = $companyGrid.getRowData(selectedRow);

                        if (rowData.Name == undefined) {
                            alert('Please Select a row.');
                            return;
                        }
                        var params = {};
                        params.companyId = rowData.Id;
                        params.companyName = rowData.Name;
                        if (params === '' || params.length <= 0) {
                            alert('Select a valid item.');
                            return;
                        }
                        $state.go('products.view', params);

                    },
                    position: "last"
                })
                .navButtonAdd(cgPager, {
                    caption: "Add Product",
                    title: "Add Product",
                    buttonicon: 'fa fa-cube',
                    onClickButton: function () {
                        var selectedRow = $companyGrid.getGridParam("selrow");
                        var rowData = $companyGrid.getRowData(selectedRow);

                        if (rowData.Name == undefined) {
                            alert('Please Select a row.');
                            return;
                        }
                        var params = {};
                        params.companyId = rowData.Id;
                        params.companyName = rowData.Name;
                        if (params === '' || params.length <= 0) {
                            alert('Select a valid item.');
                            return;
                        }

                        scope.addProduct(params);
                    },
                    position: "last"
                });
                //resize to fit page size
                $(window).on('resize.jqGrid', function () {
                    var size = $cgContainer.width();
                    $companyGrid.jqGrid('setGridWidth', size);
                });

            }
        }
    }
}());