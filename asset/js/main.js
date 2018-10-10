// 生成 HTML
(function i18nReplace() {
    $.each($('.MOLT'), function (index, value) {
        value.innerHTML = siteFilterData[index].i18n;
    });

    $('.tgI').html(i18n.collapse);
    $('.mlrb .bxi span').html(i18n.findOnMap);
    $('.mlrb2 .rl').html(i18n.relatedLocations);
})();

(function generateMenuListHTML() {
    var siteFilterLength = siteFilterData.length;
    for (var i = 1; i < siteFilterLength; i++) {
        var $tempPN = $('<div class="pn oh bs20 tr5">\
        <div class="pnt">' + siteFilterData[i].i18n + '\
          <img class="tr5" src="https://onlinemap.oss-cn-beijing.aliyuncs.com/landmarks/asset/img/downward.svg" alt="down-caret">\
        </div></div>');
        var siteLength = siteFilterData[i].sites.length;
        for (var j = 0; j < siteLength; j++) {
            var index = siteFilterData[i].sites[j];
            var site = siteData[index];
            $tempPN.append('<div data-location-id="' + index + '">\
            <span class="ln">' + site.name + '</span>\
            <img>\
          </div>');
        }
        $('.pnC').append($tempPN);
    }
})();

// bug fix hack
$('html').css('font-size', '12px');

$(function () {
    if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
    } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
    }
});

(function () {
    // js 设置样式
    // 地图容器高度
    // mobile overlay 高度
    var topDistance = $('.js-offset-top').offset().top;
    var offsetTopPixel = 0;
    // 利用 mobile 特殊元素判断 mobile/PC
    if ($('.m-lang').is(':hidden')) {
        var offsetTopPixel = (topDistance + 11); // 11px = 巴黎人 PC navbar hack
    } else {
        var offsetTopPixel = (topDistance + 4); // 7px = 巴黎人 mobile navbar hack
    }
    $('.C').css({
        top: offsetTopPixel + 'px'
    });
    $('.MO').css({
        height: 'calc(100% - ' + (offsetTopPixel + 52) + 'px)'
    });

    // 设置 menuList 图片
    $('.pn>:not(.pnt)').each(function () {
        var locationId = $(this).data('location-id');
        $(this).children('img').attr({ 'src': siteData[locationId].image, 'alt': siteData[locationId].name });
    });
})();

function Popup() {
    function togglePopup() {
        $('.pC>.pp').toggleClass('open');
    }

    $(document).on('click', '.p1', togglePopup);

    $(document).on('click', '.clspp', togglePopup);
}

var popup = new Popup();

function MenuList() {
    var self = this;
    this.currentFeatureCoordinates = [];

    $(document).on('click', '.ml>.tB, .cBC>img, .oML', function () {
        if ($('.ml').hasClass('menu-open')) {
            $('.ml').removeClass('menu-open open1 open2');
        } else {
            $('.ml').addClass('menu-open open1');
        }
        $('.pC>.pp').removeClass('open');
    });

    $(document).on('click', '.fB', function () {
        $('.oML, .fB').hide();
        $('.MO').show();
    });

    $(document).on('click', '.cMO', function () {
        $('.oML, .fB').show();
        $('.MO').hide();
    });

    $(document).on('click', '.MOL', function () {
        var $this = $(this);
        var layerIndex = $this.index();
        $('.ol-feature-filter>button').eq(layerIndex).trigger('click');
        $('.cMO').trigger('click');
    });

    // menuList 一级菜单
    $(document).on('click', '.pn>.pnt', function () {
        // 如果此分类已展开
        if ($(this).closest('.pn').hasClass('open')) {
            // down-caret 收起
            $('[alt="down-caret"]').removeClass('open');
            $(this).closest('.pn').removeClass('open').removeAttr('style');
        } else { // 未展开
            // 其他已展开分类切换 class
            $('.pn.open').removeClass('open').removeAttr('style');
            // down-caret 收起
            $('[alt="down-caret"]').removeClass('open');
            // 分类收起
            var height = ($(this).siblings().length + 1) * 74;

            $(this).find('[alt="down-caret"]').addClass('open').closest('.pn').addClass('open').css('height', height + 'px');
        }

        // 切换图层
        // var $this = $(this);
        // var layerIndex = $this.parent().index();
        // $('.ol-feature-filter>button').eq(layerIndex + 1).trigger('click');
    });

    $(document).on('click', '[data-location-id]', function () {
        $('.pC>.pp').removeClass('open');

        // 收起其他展开, 添加 active 状态
        $('.pn').addClass('open');
        $('.pnt').trigger('click');
        $(this).closest('.pn').children('.pnt').trigger('click');
        $('.pn>div.active').removeClass('active');
        $(this).addClass('active');

        var id = $(this).data('location-id');
        self.initLocationDetail(siteData[id]);
    });

    $(document).on('click', '.mlri>.cls', function () {
        $('.ml').removeClass('open2');
    });

    $(document).on('click', '.tgI', function () {
        if ($(this).hasClass('text-open')) {
            $('.sdC').css('max-height', '90px');
            $(this).html(i18n.collapse);
        } else {
            $('.sdC').css('max-height', '9999px');
            $(this).html(i18n.fold);
        }
        $(this).toggleClass('text-open');
    });

    $(document).on('click', '.mlrb', function findOnMap() {
        // 切换 全部 图层, 以显示所有 feature
        globalChangeFilterAll(false);

        $('.tB').trigger('click');

        map.getView().animate({ center: featureCoor2XY(self.currentFeatureCoordinates) }, { resolution: mapPara.minResolution });
    });

    $(document).on('click', '.lCiW', function () {
        var id = $(this).data('site-id');
        triggerInitLocationDetail(id);
    });
}

// 点击兴趣点, 展开详情
MenuList.prototype.initLocationDetail = function (obj) {
    $('.mlr').scrollTop(0);

    $('.mlrt').css('background-image', 'url(' + obj.image + ')');
    $('.opening-hours').html(obj.openingHours);
    $('.site-location').html(obj.location);
    $('.site-name').html(obj.name);

    // 展开收起逻辑
    $('.site-description').html(obj.description);
    if ($('.site-description').height() > 90) { // max-height: 90px;
        $('.sdC').css('max-height', '90px');
        $('.tgI').html(i18n.collapse).removeClass('text-open');
        $('.tg').show();
    } else {
        $('.tg').hide();
    }

    var tempHtml = '';
    var relatedlocationLength = obj.relatedLocations.length;
    for (var i = 0; i < relatedlocationLength; i++) {
        var relatedLocationId = obj.relatedLocations[i];
        var relatedLocation = siteData[relatedLocationId];
        tempHtml += '\
             <div class="lCi">' +
            '  <div data-site-id="' + relatedLocationId + '" class="lCiW" style="background:no-repeat center / cover url(' + relatedLocation.image + ')">' +
            '  </div>' +
            '  <span class="lCt">' + relatedLocation.name + '</span>' +
            '</div>';
    }
    $('.lC').html(tempHtml);

    // 修改 open 状态
    $('.ml').addClass('menu-open open1 open2');

    // 记录当前点击 feature 坐标，为 findOnMap() 确定位置
    this.currentFeatureCoordinates = obj.coordinates;
};

var menuList = new MenuList();

function triggerInitLocationDetail(id) {
    $(element).popover('destroy');
    $('[data-location-id="' + id + '"]').trigger('click');
}

window.app = {};
var app = window.app;

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
var globalChangeFilterAll;
app.CustomControl = function (opt_options) {
    var options = opt_options || {};

    var this_ = this;
    var currentLayerIndex = 0;

    var filterAll = document.createElement('button');
    filterAll.title = siteFilterData[0].i18n;
    filterAll.dataset.toggle = 'tooltip';
    filterAll.classList.add('active');
    filterAll.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.727 20.727" width="20.727" height="20.727"><defs><style>.cls-1,.cls-3{fill:none}.cls-1{stroke-miterlimit:10;stroke-width:1.4px}.cls-2{stroke:none}</style></defs><g id="全部_选中" transform="translate(-1.636 -1.636)"><g id="Group_6" data-name="Group 6" transform="translate(1.636 1.636)"><g id="Rectangle_3" data-name="Rectangle 3" class="cls-1"><path class="cls-2" d="M0 0h9.212v9.212H0z"/><path class="cls-3" d="M.7.7h7.812v7.812H.7z"/></g><g id="Rectangle_3_Copy_2" data-name="Rectangle 3 Copy 2" class="cls-1"><path class="cls-2" d="M0 0h9.212v9.212H0z" transform="translate(0 11.515)"/><path class="cls-3" d="M.7.7h7.812v7.812H.7z" transform="translate(0 11.515)"/></g><g id="Rectangle_3_Copy" data-name="Rectangle 3 Copy" class="cls-1"><path class="cls-2" d="M0 0h9.212v9.212H0z" transform="translate(11.515)"/><path class="cls-3" d="M.7.7h7.812v7.812H.7z" transform="translate(11.515)"/></g><g id="Rectangle_3_Copy_3" data-name="Rectangle 3 Copy 3" class="cls-1"><path class="cls-2" d="M0 0h9.212v9.212H0z" transform="translate(11.515 11.515)"/><path class="cls-3" d="M.7.7h7.812v7.812H.7z" transform="translate(11.515 11.515)"/></g></g></g></svg>';

    var filterViewSpot = document.createElement('button');
    filterViewSpot.title = siteFilterData[1].i18n;
    filterViewSpot.dataset.toggle = 'tooltip';
    filterViewSpot.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.89 17.441" width="23.89" height="17.441"><defs><style>.cls-1,.cls-2{fill:none;stroke-miterlimit:10;stroke-width:1.4px}.cls-2{stroke-linecap:square}</style></defs><g id="观光景点" transform="translate(-.055 -3.237)"><g id="观光景点-2" data-name="观光景点"><g id="观光景点_选中"><g id="Group_2" data-name="Group 2" transform="translate(.545 3.273)"><path id="Path" class="cls-1" d="M5.25 0c-.1 1.95-.772 6.2-2.879 7.753A1.714 1.714 0 0 1 0 7.495"/><path id="Path_Copy" data-name="Path Copy" class="cls-1" d="M-5.25 0c.1 1.95.772 6.2 2.879 7.753A1.714 1.714 0 0 0 0 7.495" transform="translate(22.909)"/><path id="Line_4" data-name="Line 4" class="cls-2" d="M.257.716h12.85" transform="translate(4.773 1.909)"/><path id="Line_4_Copy" data-name="Line 4 Copy" class="cls-2" d="M0 .477h15.273" transform="translate(3.818 6.205)"/><path id="Path-2" data-name="Path" class="cls-1" d="M0 .477h19.568" transform="translate(1.432 16.227)"/><path id="Path-3" data-name="Path" class="cls-1" d="M0 10.023V0" transform="translate(17.659 6.682)"/><path id="Path_Copy_2" data-name="Path Copy 2" class="cls-1" d="M.477 4.3V0" transform="translate(10.977 2.386)"/><path id="Path_Copy_3" data-name="Path Copy 3" class="cls-1" d="M.477 4.3V0" transform="translate(6.682 2.386)"/><path id="Path_Copy_4" data-name="Path Copy 4" class="cls-1" d="M.477 4.3V0" transform="translate(15 2)"/><path id="Path_Copy_6" data-name="Path Copy 6" class="cls-1" d="M1.023 9.568L1 0" transform="translate(4.136 7)"/></g></g></g></g></svg>';

    var filterFood = document.createElement('button');
    filterFood.title = siteFilterData[2].i18n;
    filterFood.dataset.toggle = 'tooltip';
    filterFood.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.568 14.474" width="19.568" height="14.474"><defs><style>.cls-1{fill:none;stroke-miterlimit:10;stroke-width:1.4px}</style></defs><g id="美食" transform="translate(-1.977 -4.204)"><g id="美食-2" data-name="美食"><g id="Group_7" data-name="Group 7"><g id="美食-3" data-name="美食" transform="translate(0 4)"><g id="Group_3" data-name="Group 3" transform="translate(0 .204)"><path id="Fill_1" data-name="Fill 1" class="cls-1" d="M20.757 8.957H2.732a9.413 9.413 0 0 1 2.755-6.343 8.8 8.8 0 0 1 12.513 0 9.413 9.413 0 0 1 2.755 6.342z" transform="translate(0 1.545)"/><path id="Line_3" data-name="Line 3" class="cls-1" d="M.49 1.288V0" transform="translate(11.265)"/></g><path id="Fill_4" data-name="Fill 4" class="cls-1" d="M0 4.555A6.957 6.957 0 0 1 4.317 0" transform="translate(5.963 4.683)"/><path id="Path" class="cls-1" d="M0 .477h19.568" transform="translate(1.977 13.5)"/></g></g></g></g></svg>';

    var filterEntertainment = document.createElement('button');
    filterEntertainment.title = siteFilterData[3].i18n;
    filterEntertainment.dataset.toggle = 'tooltip';
    filterEntertainment.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.759 22.596" width="23.759" height="22.596"><path d="M11.88 17.946l-6.409 3.371 1.225-7.14L1.505 9.12l7.166-1.038 3.209-6.5 3.206 6.5 7.169 1.042-5.184 5.053 1.225 7.14z" fill="none" stroke-miterlimit="10" stroke-width="1.4" data-name="娱乐活动"/></svg>';

    var filterHoliday = document.createElement('button');
    filterHoliday.title = siteFilterData[4].i18n;
    filterHoliday.dataset.toggle = 'tooltip';
    filterHoliday.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.127 22.518" width="22.127" height="22.518"><defs><style>.cls-1{fill:none;stroke-miterlimit:10;stroke-width:1.4px}.cls-2a{fill:#c9cfd8}</style></defs><g id="节日盛事" transform="translate(-.937 -.391)"><g id="节日盛事-2" data-name="节日盛事"><g id="Group_4" data-name="Group 4" transform="translate(1.636 1.091)"><path id="Oval" class="cls-1" d="M9.038.845A5.725 5.725 0 0 0 6.045 0 6.261 6.261 0 0 0 0 6.456a6.261 6.261 0 0 0 6.045 6.456A6.1 6.1 0 0 0 11.8 8.444" transform="translate(0 3.562)"/><ellipse id="Oval_Copy_2" data-name="Oval Copy 2" class="cls-1" cx="6.045" cy="6.456" rx="6.045" ry="6.456" transform="translate(8.636)"/><path id="Line_5" data-name="Line 5" class="cls-2a" d="M0 0v5.343h1.4V0z" transform="translate(5.614 16.475)"/><path id="Line_5_Copy" data-name="Line 5 Copy" class="cls-2a" d="M0 0v8.905h1.4V0z" transform="translate(14.25 12.913)"/><path id="Oval_Copy" data-name="Oval Copy" class="cls-1" d="M0 4.23A4.069 4.069 0 0 0 3.886 0" transform="translate(5.527 9.96)"/><path id="Oval_Copy_3" data-name="Oval Copy 3" class="cls-1" d="M0 4.23A4.069 4.069 0 0 0 3.886 0" transform="translate(14.279 5.692)"/></g></g></g></svg>';

    function zoomOut() {
        map.getView().animate({ resolution: mapPara.maxResolution }, { center: mapPara.center });
    }

    // 全部
    var changeFilterAll = function (noCenter) {
        $('.ol-feature-filter>button.active').removeClass('active');
        $(this).addClass('active');
        this_.currentLayerIndex = 0;

        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer,
                mapData.layers.layersDict['viewSpot'],
                mapData.layers.layersDict['viewSpotIcon'],
                mapData.layers.layersDict['food'],
                mapData.layers.layersDict['foodIcon'],
                mapData.layers.layersDict['entertainment'],
                mapData.layers.layersDict['entertainmentIcon'],
                mapData.layers.layersDict['holiday'],
                mapData.layers.layersDict['holidayIcon']]
        }));

        if (noCenter != false) {
            zoomOut();
        }
    }
    globalChangeFilterAll = changeFilterAll;
    filterAll.addEventListener('click', changeFilterAll, false);
    filterAll.addEventListener('touchstart', changeFilterAll, false);

    // 观光景点
    function changeFilterViewSpot() {
        $('.ol-feature-filter>button.active').removeClass('active');
        $(this).addClass('active');
        if (this_.currentLayerIndex !== 1) {
            $('#popup').popover('destroy');
        }
        this_.currentLayerIndex = 1;

        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['viewSpot'], mapData.layers.layersDict['viewSpotIcon']]
        }));

        zoomOut();
    }
    filterViewSpot.addEventListener('click', changeFilterViewSpot, false);
    filterViewSpot.addEventListener('touchstart', changeFilterViewSpot, false);

    // 美食
    function changeFilterFood() {
        $('.ol-feature-filter>button.active').removeClass('active');
        $(this).addClass('active');
        if (this_.currentLayerIndex !== 2) {
            $('#popup').popover('destroy');
        }
        this_.currentLayerIndex = 2;

        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['food'], mapData.layers.layersDict['foodIcon']]
        }));

        zoomOut();
    }
    filterFood.addEventListener('click', changeFilterFood, false);
    filterFood.addEventListener('touchstart', changeFilterFood, false);

    // 娱乐活动
    function changeFilterEntertainment() {
        $('.ol-feature-filter>button.active').removeClass('active');
        $(this).addClass('active');
        if (this_.currentLayerIndex !== 3) {
            $('#popup').popover('destroy');
        }
        this_.currentLayerIndex = 3;

        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['entertainment'], mapData.layers.layersDict['entertainmentIcon']]
        }));

        zoomOut();
    }
    filterEntertainment.addEventListener('click', changeFilterEntertainment, false);
    filterEntertainment.addEventListener('touchstart', changeFilterEntertainment, false);

    // 节日盛事
    function changeFilterHoliday() {
        $('.ol-feature-filter>button.active').removeClass('active');
        $(this).addClass('active');
        if (this_.currentLayerIndex !== 4) {
            $('#popup').popover('destroy');
        }
        this_.currentLayerIndex = 4;

        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['holiday'], mapData.layers.layersDict['holidayIcon']]
        }));

        zoomOut();
    }
    filterHoliday.addEventListener('click', changeFilterHoliday, false);
    filterHoliday.addEventListener('touchstart', changeFilterHoliday, false);

    var element = document.createElement('div');
    element.className = 'ol-feature-filter ol-unselectable ol-control bs20';
    element.appendChild(filterAll);
    element.appendChild(filterViewSpot);
    element.appendChild(filterFood);
    element.appendChild(filterEntertainment);
    element.appendChild(filterHoliday);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(app.CustomControl, ol.control.Control);

var mapData = {};
var commonPolygonStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0)'
    })
});
var commonIconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80' width='24' height='32'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='53.88' y1='61.13' x2='10.32' y2='7.34' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23f33070'/%3E%3Cstop offset='.18' stop-color='%23f93b67'/%3E%3Cstop offset='.45' stop-color='%23ff475d'/%3E%3Cstop offset='.45' stop-color='%23ff485d'/%3E%3Cstop offset='.58' stop-color='%23ff6267'/%3E%3Cstop offset='.72' stop-color='%23ff756e'/%3E%3Cstop offset='.85' stop-color='%23ff8073'/%3E%3Cstop offset='1' stop-color='%23ff8474'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg data-name='图层 2'%3E%3Cg data-name='图层 1'%3E%3Cpath d='M30 0A30 30 0 0 0 0 30a29.67 29.67 0 0 0 4.64 16c.39.67.83 1.32 1.28 2l.09.12 22.67 31.2a1.63 1.63 0 0 0 2.65 0L54 48.07l.07-.09c.46-.64.89-1.3 1.29-2A29.67 29.67 0 0 0 60 30 30 30 0 0 0 30 0z' fill='url(%23a)'/%3E%3Ccircle cx='30' cy='30' r='11.75' fill='%23fff'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    }))
});
function featureCoor2XY(coor) {
    var coordinates = coor[0];
    var cXStart = coordinates[2][0];
    var cXEnd = coordinates[3][0];
    var cX = (cXStart + cXEnd) / 2;
    var cY = coordinates[2][1] + 15;
    return [cX, cY];
};
mapData.features = {
    setFeatureStyle: function (feature, style) {
        var stylePara;
        if (!feature.get('isIcon')) {
            stylePara = style;
        } else {
            stylePara = function (feature, resolution) {
                var defaultResolution = 1; // map.View 缩放倍数
                style.getImage().setScale(defaultResolution / resolution);
                return style;
            };
        }
        feature.setStyle(stylePara);
        return feature;
    },
    featuresDict: {},
    init: function () {
        var _ = mapData.features;

        // 将处理过的 features 放进 featuresDict
        var tempArray = [];
        for (key in _.data) {
            tempArray = [];
            for (key2 in _.data[key]) {
                tempArray.push(_.setFeatureStyle(_.data[key][key2].feature, _.data[key][key2].style));
            }
            _.featuresDict[key] = tempArray;
        }
    }
};
mapData.features.data = {};
var siteFilterLength = siteFilterData.length;
for (var i = 1; i < siteFilterLength; i++) {
    var tempArray = [];
    var tempIconArray = [];
    var siteLength = siteFilterData[i].sites.length;
    for (var j = 0; j < siteLength; j++) {
        tempArray.push(
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Polygon(siteData[siteFilterData[i].sites[j]].coordinates),
                    siteId: siteFilterData[i].sites[j]
                }),
                style: commonPolygonStyle
            }
        );
        tempIconArray.push(
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(featureCoor2XY(siteData[siteFilterData[i].sites[j]].coordinates)),
                    siteId: siteFilterData[i].sites[j],
                    isIcon: true
                }),
                style: commonIconStyle
            }
        )
    }
    mapData.features.data[siteFilterData[i].name] = tempArray;
    mapData.features.data[siteFilterData[i].name + 'Icon'] = tempIconArray;
}
mapData.features.init();

mapData.sources = {
    setAllSourceFeature: function () {
        var _ = mapData.sources;
        var keys = mapData.features.data;
        function setSourceFeature(array) {
            return new ol.source.Vector({
                features: array
            })
        }

        for (key in keys) {
            _.sourcesDict[key] = setSourceFeature(mapData.features.featuresDict[key]);
        }
    },
    sourcesDict: {}
};
mapData.sources.setAllSourceFeature();

mapData.layers = {
    setAllLayerSource: function () {
        var _ = mapData.layers;
        var keys = mapData.features.data;
        function setLayerSource(source) {
            return new ol.layer.Vector({
                source: source,
                updateWhileAnimating: true,
                updateWhileInteracting: true
            });
        }

        for (key in keys) {
            _.layersDict[key] = setLayerSource(mapData.sources.sourcesDict[key]);
        }
    },
    layersDict: {}
};
mapData.layers.setAllLayerSource();

// map 参数
var extent = [0, 0, 2116, 3204];
var projection = new ol.proj.Projection({
    code: 'macao-001',
    units: 'pixels',
    extent: extent
});
var backgroundLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        // 背景底图 background image
        url: backgroundSvgString,
        projection: projection,
        imageExtent: extent
    })
});

var zoomIn = $('<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><defs><style/></defs><path d="M469.333 469.333H170.667v85.334h298.666v298.666h85.334V554.667h298.666v-85.334H554.667V170.667h-85.334v298.666z"/></svg>')[0];
var zoomOut = $('<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><defs><style/></defs><path d="M170.667 469.333h682.666v85.334H170.667z"/></svg>')[0];

var mapPara = {
    resolution: 2,
    minResolution: 0.5,
    maxResolution: 4,
    center: [1058, 1602],
    initialCenter: [450, 2470] // 以大三巴为中心
};
var map = new ol.Map({
    controls: ol.control.defaults({
        attribution: false,
        zoomOptions: {
            className: 'ol-zoom oh bs20',
            zoomInLabel: zoomIn,
            zoomOutLabel: zoomOut
        }
    }).extend([new app.CustomControl()]),
    target: document.getElementById('map'),
    layers: [backgroundLayer,
        mapData.layers.layersDict['viewSpot'],
        mapData.layers.layersDict['viewSpotIcon'],
        mapData.layers.layersDict['food'],
        mapData.layers.layersDict['foodIcon'],
        mapData.layers.layersDict['entertainment'],
        mapData.layers.layersDict['entertainmentIcon'],
        mapData.layers.layersDict['holiday'],
        mapData.layers.layersDict['holidayIcon']],
    view: new ol.View({
        projection: projection,
        // center: ol.extent.getCenter(extent),
        center: mapPara.initialCenter,
        // 默认缩放倍数
        resolution: mapPara.resolution,
        // 最小缩放 1/4 大
        maxResolution: mapPara.maxResolution,
        // 最大缩放 1/0.5 大
        minResolution: mapPara.minResolution
    })
});

var element = document.getElementById('popup');

var popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50]
});
map.addOverlay(popup);

// display popup on click
function mapClick(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
    var coordinates;
    if (feature) {
        coordinates = feature.getGeometry().getCoordinates();

        if (!feature.get('isIcon')) {
            coordinates = coordinates[0];
            var cXStart = coordinates[2][0];
            var cXEnd = coordinates[3][0];
            var cX = (cXStart + cXEnd) / 2;
            var cY = coordinates[2][1] - 22;
            coordinates = [cX, cY];
        } else {
            return false;
        }

        popup.setPosition(coordinates);
        if ($('#popup+.popover').length > 0) {
            // $('.popup-link-container').trigger('click');
            $(element).popover('destroy'); // 不销毁会导致不同 feature 弹出相同 popover
        }
        $(element).popover({
            'placement': 'top',
            'html': true,
            'content': '\
                 <a class="popup-link-container" href="javascript:;" onclick="triggerInitLocationDetail(\'' + feature.get('siteId') + '\');">' +
                '    <div class="popup-inner">' +
                '        <div class="popup-inner-img-container">' +
                '            <img src="' + siteData[feature.get('siteId')].image + '" class="popup-inner-img">' +
                '        </div>' +
                '        <div class="popup-inner-text-container">' +
                '            <p class="popup-inner-text-title">' + siteData[feature.get('siteId')].name + '</p>' +
                '            <p class="popup-inner-text-subtitle">' + siteData[feature.get('siteId')].subname + '</p>' +
                '        </div>' +
                '        <img src="https://onlinemap.oss-cn-beijing.aliyuncs.com/landmarks/asset/img/right.svg" alt="show-detail" class="popup-inner-right-arrow">' +
                '        <div class="CF"></div>' +
                '    </div>' +
                '</a>'
        });
        $(element).popover('show');
    } else {
        // TODO 点击到 popover 上 trigger
        // if ($('#popup+.popover').length > 0) {

        //     $('.popup-link-container').trigger('click');
        // }
        // $(element).popover('destroy');
    }
}
map.on('click', mapClick);

// change mouse cursor when over marker
map.on('pointermove', function (e) {
    if (e.dragging) {
        $(element).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = false;
    var feature = map.forEachFeatureAtPixel(e.pixel,
        function (feature) {
            return feature;
        });
    if (feature) {
        if (!feature.get('isIcon')) {
            hit = true;
        }
    }

    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

$('[data-toggle="tooltip"]').tooltip({
    placement: 'right',
    trigger: 'hover'
});
