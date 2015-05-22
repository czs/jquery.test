/**
 * jquery notification plugin.
 * @author: weicheng xi
 * @date: 2015/05/22
 *
 **/
(function($) {

    $('head').append('<style> div.ntf-container {width: 400px; height: 60px; background-color: #FFFFFF; border-style: solid; border-width: 1px; position: fixed; border-radius: 3px; } div.ntf-container-info {border-color: green; top: 100px; left: 600px; } div.ntf-container-warn {border-color: yellow; top: 200px; left: 600px; } div.ntf-container-error {border-color: red; top: 300px; left: 600px; } div.ntf-status {display: inline-block; width: 40px; height: 100%; float: left; color: white; } div.ntf-status-info {background-color: green; } div.ntf-status-warn {background-color: yellow; } div.ntf-status-error {background-color: red; } div.ntf-content {display: inline-block; width: 340px; height: 100%; float: left; vertical-align: middle; padding-left: 10px; padding-right: 10px; background-color: white; /* overflow: hidden; */ overflow: auto; } div.ntf-content-info {color: rgba(0, 0, 0, 0.6); } div.ntf-content-warn {color: rgba(0, 0, 0, 0.6); } div.ntf-content-error {color: rgba(0, 0, 0, 0.6); } div.ntf-status div, div.ntf-content div {display: table; height: 100%; } div.ntf-status div span, div.ntf-content div span {display: table-cell; vertical-align: middle; } div.ntf-status div span {text-align: center; width: 40px; font-size: 22px; font-weight: bold; } </style>');

    var $ntfInfo = $('<div class="ntf-container ntf-container-info"> <div class="ntf-status ntf-status-info"> <div><span>√</span></div> </div> <div class="ntf-content ntf-content-info"> <div><span></span></div> </div> </div>');
    var $ntfWarn = $('<div class="ntf-container ntf-container-warn"> <div class="ntf-status ntf-status-warn"> <div><span>!</span></div> </div> <div class="ntf-content ntf-content-warn"> <div><span></span></div> </div> </div>');
    var $ntfError = $('<div class="ntf-container ntf-container-error"> <div class="ntf-status ntf-status-error"> <div><span>×</span></div> </div> <div class="ntf-content ntf-content-error"> <div><span></span></div> </div> </div>');

    var count = -1;
    var ntfHei = 60;
    var ntfWid = 400;

    function show($obj, msg, settings) {

        // calculate animate css prop value.
        var opts = $.extend({}, $.ntf.settings, settings);

        var initPos, hidePos;

        if (opts.position == 'left') {
            initPos = {
                top: ($.ntf.settings.initTop + count * (ntfHei + 3)),
                left: opts.offset,
                right: 'auto'
            };
            hidePos = {
                left: -ntfWid,
                opacity: 'hide'
            };
        } else if (opts.position == 'right') {
            initPos = {
                top: ($.ntf.settings.initTop + count * (ntfHei + 3)),
                right: opts.offset,
                left: 'auto'
            };
             hidePos = {
                right: -ntfWid,
                opacity: 'hide'
            };
        }

        count++;

        $obj.clone().find('.ntf-content div span').text(msg).end().appendTo('body').hide().css(initPos).fadeIn(400).animate({
            top: (opts.stopTop + count * (ntfHei + 3))
        }, 500, function() {
            $(this).hover(function() {
                $(this).stop(true);
            }, function() {
                $(this).animate(hidePos, 500, function() {
                    $(this).remove();
                    count--;
                });
            });
        }).delay(2000).animate(hidePos, 500, function() {
            $(this).remove();
            count--;
        });

    }

    $.extend({
        ntf: {
            settings: {
                position: 'left', // left, right
                initTop: 300,
                offset: 100,
                stopTop: 50
            },
            info: function(msg, settings) {
                show($ntfInfo, msg, settings);
            },
            warn: function(msg, settings) {
                show($ntfWarn, msg, settings);
            },
            error: function(msg, settings) {
                show($ntfError, msg, settings);
            }
        }

    });
})(jQuery);
