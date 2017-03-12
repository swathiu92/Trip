/* Write here your custom javascript codes */
var ItemMap = {};

$(function () {
    String.prototype.lpad = function (padString, length) {
        var str = this;
        while (str.length < length)
            str = padString + str;
        return str;
    }

    function pad(s) { return (s < 10) ? '0' + s : s; }
    $.loadPage = function (uri) {
        $.ajax({
            url: uri,
            type: 'GET',
            async: false,
            beforeSend: function () {
                //$("loading_layer").show();
            },
            complete: function () {
                // $("loading_layer").hide();
            },
            cache: false,
            error: function (xhr) {
                if (xhr.status == 400)
                    alert(xhr.responseText + xhr.status);
                else
                    alert(xhr.responseText + xhr.status);

            },
            success: function (result) {
                $("#main-content").html(result);
            }
        });
    };

    $.launchDialog = function (launchUrl, windowId, dlgId) {
        var event_dlg_open_flag = false;
        if (event_dlg_open_flag == true) {
            return false;
        }

        $.ajax({
            url: launchUrl,
            beforeSend: function () {
                event_dlg_open_flag = true;
            },
            complete: function () {
                event_dlg_open_flag = false;
            },
            cache: false,
            success: function (response) {
                $(windowId).html(response);
                $(dlgId).modal({
                    //backdrop: 'static',
                    show: true,
                    backdrop: false,
                    keyboard: true,
                })
                event_dlg_open_flag = false;
            },
            error: function (xhr) {
                if (xhr.status == 400)
                    alert(xhr.responseText + xhr.status);     /* display validation errors in edit dialog */
                else
                    alert(xhr.responseText + xhr.status); /* display other errors in separate dialog */
                event_dlg_open_flag = false;
            }
        });
    }
    $.resetForm = function () {
        $(':input')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
    };

    initDateField = function (fieldId) {
        var d = new Date();
        var date = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        $(fieldId).val(date);
        $(fieldId).datepicker('setDate', date);
        $(fieldId).datepicker('update');
    }
    convertDateTime = function (inputFormat) {
        var d = new Date(inputFormat);
        return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
    }

    formatDateTime = function (input) {
        if (input === null)
            return null;
        // Split the date, divider is '/'
        var parts = input.match(/(\d+)/g);
        if (parts === null)
            return null;
        var date = new Date();
        return new Date(parts[2], parts[1] - 1, parts[0], date.getHours(), date.getMinutes(), date.getSeconds());
    }
    convertTimeToHHMM = function (t) {
        var minutes = t % 60;
        var hour = (t - minutes) / 60;
        var timeStr = (hour + "").lpad("0", 2) + ":" + (minutes + "").lpad("0", 2);
        var date = new Date("2014/01/01 " + timeStr + ":00");
        var hhmm = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
        return hhmm;
    }
    //replace icons with FontAwesome icons like above
    updatePagerIcons = function (table) {
        var replacement =
        {
            'ui-icon-seek-first': 'fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev': 'fa fa-angle-left bigger-140',
            'ui-icon-seek-next': 'fa fa-angle-right bigger-140',
            'ui-icon-seek-end': 'fa fa-angle-double-right bigger-140'
        };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
        })
    }
    enableTooltips = function (table) {
        $('.navtable .ui-pg-button').tooltip({ container: 'body' });
        $(table).find('.ui-pg-div').tooltip({ container: 'body' });
    }
    style_search_filters = function (form) {
        form.find('.delete-rule').val('X');
        form.find('.add-rule').addClass('btn btn-u btn-u-xs btn-u-dark-green');
        form.find('.add-group').addClass('btn btn-xs btn-success');
        form.find('.delete-group').addClass('btn btn-xs btn-danger');
    }

    style_search_form = function (form) {
        var dialog = form.closest('.ui-jqdialog');
        var buttons = dialog.find('.EditTable')
        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'fa fa-retweet');
        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'fa fa-comment-o');
        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-u btn-u-sm btn-u-blue').find('.ui-icon').attr('class', 'fa fa-search');
    }
});