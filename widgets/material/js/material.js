/*
    ioBroker.vis material Widget-Set
    version: "0.1.1"
    Copyright 2018 nisiode<email@mail.com>
*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "title":          {"en": "Title",       "de": "Titel",  "ru": "???"},
        "subtitle":         {"en": "Subtitle",      "de": "Untertitel",   "ru": "???"}
    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance":     {"en": "Instance", "de": "Instanz", "ru": "?????????"},
    "open":         {"en": "open", "de": "offen", "ru": "?????????"},
    "close":        {"en": "close", "de": "geschlossen", "ru": "?????????"},
    "on":           {"en": "on", "de": "an", "ru": "?????????"},
    "off":          {"en": "off", "de": "aus", "ru": "?????????"}
});

// this code can be placed directly in material.html
vis.binds.material = {
    version: "0.1.0",
    showVersion: function () {
        if (vis.binds.material.version) {
            console.log('Version material: ' + vis.binds.material.version);
            vis.binds.material.version = null;
        }
    },
	tplMdListDoor: function (widgetID, view, data) {
        const srcOpen = 'widgets/material/img/fts_door_open.png';
        const srcClose = 'widgets/material/img/fts_door.png';
        const valOpen = _('open');
        const valClose = _('close');
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListDoor(widgetID, view, data);
            }, 100);
        }

        function update(state){
            var value = (state) ? valOpen : valClose;
            var src = (state) ? srcOpen : srcClose;
            $div.find('.my-list-value').html(value);
            $div.find('.my-list-icon').find('img').attr('src', src);
        }

        update(vis.states[data.oid + '.val']);
        
        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
        }
    },
	tplMdListWindow: function (widgetID, view, data) {
        const srcOpen = 'widgets/material/img/fts_window_2w_open.png';
        const srcClose = 'widgets/material/img/fts_window_2w.png';
        const valOpen = _('open');
        const valClose = _('close');
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListWindow(widgetID, view, data);
            }, 100);
        }

        function update(state){
            var value = (state) ? valOpen : valClose;
            var src = (state) ? srcOpen : srcClose;
            $div.find('.my-list-value').html(value);
            $div.find('.my-list-icon').find('img').attr('src', src);
        }

        update(vis.states[data.oid + '.val']);
        
        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
        }
    },
    tplMdListTemp: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListTemp(widgetID, view, data);
            }, 100);
        }

        function update(state){
            var temp = Math.round(parseFloat(state)*10) / 10;
            $div.find('.my-list-value').html(temp + ' °C');
        }

        update(vis.states[data.oid + '.val']);
        
        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
        }
    },
	tplMdListLight: function (widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        const valOn = _('on');
        const valOff = _('off');
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListLight(widgetID, view, data);
            }, 100);
        }

        function update(state){
            var value;
            var src;

            if(typeof state === 'number'){
                if(state == 0){
                    value = valOff;
                    src = srcOff;
                }else{
                    value = state + ' %';
                    var dim = Math.floor(parseFloat(state)/10)*10;
                    src = 'widgets/material/img/light_light_dim_' + dim + '.png';
                }
            }else{
                value = (state) ? valOn : valOff;
                src = (state) ? srcOn : srcOff;
            }
            $div.find('.my-list-value').html(value);
            $div.find('.my-list-icon').find('img').attr('src', src);
        }

        update(vis.states[data.oid + '.val']);
        
        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
        }
    }
};

vis.binds.material.showVersion();