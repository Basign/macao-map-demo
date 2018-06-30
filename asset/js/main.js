function Popup() {
    function togglePopup() {
        $('.pC>.pp').toggleClass('open');
    }

    $(document).on('click', '.pC>.p1', togglePopup);

    $(document).on('click', '.pC>.pp .close', togglePopup);
}

var popup = new Popup();

function MenuList() {
    var self = this;

    $(document).on('click', '.ml>.tB', function () {
        if ($(this).hasClass('menu-open')) {
            $(this).removeClass('menu-open').find('img').attr('src', 'asset/img/menu.svg');
            $('.ml').removeClass('open1 open2');
        } else {
            $(this).addClass('menu-open').find('img').attr('src', 'asset/img/close-2.svg');
            $('.ml').addClass('open1');
        }
    });

    $(document).on('click', '.pn>.pnt', function () {
        if ($(this).closest('.pn').hasClass('open')) {
            $(this).find('[alt="down-caret"]').removeClass('open').closest('.pn').removeClass('open').removeAttr('style');
        } else {
            $('.pn.open').removeClass('open').removeAttr('style');
            var height = ($(this).siblings().length + 1) * (72 + 2) - 2;
            $(this).find('[alt="down-caret"]').addClass('open').closest('.pn').addClass('open').css('height', height + 'px');
        }

        // 切换图层
        var $this = $(this);
        var layerIndex = $this.parent().index();
        $('.ol-feature-filter>button').eq(layerIndex + 1).trigger('click');
    });

    $(document).on('click', '.mlri>.close', function () {
        $('.ml').removeClass('open2');
    });

    $(document).on('click', '.mlrc>.tg', function () {
        if ($(this).hasClass('text-open')) {
            $('.sdC').css('max-height', '80px');
            $(this).children().html('展开');
        } else {
            $('.sdC').css('max-height', 'unset');
            $(this).children().html('收起');
        }
        $(this).toggleClass('text-open');
    });

    $(document).on('click', '.pn>:not(.pnt)', function () {
        var id = $(this).data('location-id');
        self.initLocationDetail(siteData[id]);
    });
}

// 点击兴趣点, 展开详情
MenuList.prototype.initLocationDetail = function (obj) {
    $('.mlr').scrollTop(0);

    $('.sdC').css('max-height', '80px');
    $('.mlrc>.tg>a').html('展开');
    $('.mlrc>.tg').removeClass('text-open');

    $('.mlrt').css('background-image', 'url(' + obj.image + ')');
    $('.opening-hours').html(obj.openingHours);
    $('.site-location').html(obj.location);
    $('.site-name').html(obj.name);
    $('.site-description').html(obj.description);

    var tempHtml = '';
    for (loc of obj.relatedLocations) {
        tempHtml += '<div class="bxi">' +
            '          <div>' +
            '            <img src="' + loc.image + '" alt="related-locations">' +
            '          </div>' +
            '          <span>' + loc.name + '</span>' +
            '        </div>';
    }
    $('.lC').html(tempHtml);

    // 修改 open 状态
    $('.ml').addClass('open2');
    $('.tB').addClass('menu-open');
};

var menuList = new MenuList();

function triggerInitLocationDetail(id) {
    menuList.initLocationDetail(siteData[id]);
}

// map
/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;

//
// Define rotate to north control.
//

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.RotateNorthControl = function (opt_options) {
    var options = opt_options || {};

    var this_ = this;

    var filterAll = document.createElement('button');
    filterAll.innerHTML = '<img src="asset/img/all.svg" alt="filter-all">';
    var handleRotateNorth = function () {
        this_.getMap().getView().setRotation(0);
    };

    var filterViewSpot = document.createElement('button');
    filterViewSpot.innerHTML = '<img src="asset/img/door.svg" alt="filter-view-spot">';

    var filterFood = document.createElement('button');
    filterFood.innerHTML = '<img src="asset/img/food.svg" alt="filter-food">';

    var filterEntertainment = document.createElement('button');
    filterEntertainment.innerHTML = '<img src="asset/img/star.svg" alt="filter-entertainment">';

    var filterHoliday = document.createElement('button');
    filterHoliday.innerHTML = '<img src="asset/img/balloon.svg" alt="filter-holiday">';

    // 全部
    function changeFilterAll() {
        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer,
                mapData.layers.layersDict['viewSpot'],
                mapData.layers.layersDict['food'],
                mapData.layers.layersDict['entertainment'],
                mapData.layers.layersDict['holiday']]
        }));
    }
    filterAll.addEventListener('click', changeFilterAll, false);
    filterAll.addEventListener('touchstart', changeFilterAll, false);

    // 观光景点
    function changeFilterViewSpot() {
        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['viewSpot']]
        }));
    }
    filterViewSpot.addEventListener('click', changeFilterViewSpot, false);
    filterViewSpot.addEventListener('touchstart', changeFilterViewSpot, false);

    // 美食
    function changeFilterFood() {
        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['food']]
        }));
    }
    filterFood.addEventListener('click', changeFilterFood, false);
    filterFood.addEventListener('touchstart', changeFilterFood, false);

    // 娱乐活动
    function changeFilterEntertainment() {
        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['entertainment']]
        }));
    }
    filterEntertainment.addEventListener('click', changeFilterEntertainment, false);
    filterEntertainment.addEventListener('touchstart', changeFilterEntertainment, false);

    // 节日盛事
    function changeFilterHoliday() {
        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [backgroundLayer, mapData.layers.layersDict['holiday']]
        }));
    }
    filterHoliday.addEventListener('click', changeFilterHoliday, false);
    filterHoliday.addEventListener('touchstart', changeFilterHoliday, false);

    var element = document.createElement('div');
    element.className = 'ol-feature-filter ol-unselectable ol-control bs20 oh';
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
ol.inherits(app.RotateNorthControl, ol.control.Control);

var zoomIn = document.createElement("img");
zoomIn.setAttribute('src', 'asset/img/zoom-in-2.svg');
zoomIn.setAttribute('alt', 'zoom-in');
var zoomOut = document.createElement("img");
zoomOut.setAttribute('src', 'asset/img/zoom-out-2.svg');
zoomOut.setAttribute('alt', 'zoom-out');

// namespace for all features
window.mapData = {};
var mapData = window.mapData;

mapData.features = {
    data: {
        viewSpot: [
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1200, 700]),
                    siteId: '1'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            },
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1200, 800]),
                    siteId: '2'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            }
        ],
        food: [
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1100, 700]),
                    siteId: '3'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            },
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1100, 800]),
                    siteId: '1'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            }
        ],
        entertainment: [
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1300, 600]),
                    siteId: '2'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            },
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1300, 900]),
                    siteId: '3'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            }
        ],
        holiday: [
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1000, 600]),
                    siteId: '1'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            },
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point([1000, 900]),
                    siteId: '2'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 48],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                    }))
                })
            }
        ]
    },
    setFeatureStyle: function (feature, style) {
        feature.setStyle(style);
        return feature;
    },
    featuresDict: {},
    init: function () {
        var _ = mapData.features;

        // 将处理过的 features 放进 featuresDict
        var tempArray = [];
        for (key in _.data) {
            tempArray = [];
            for (value of _.data[key]) {
                tempArray.push(_.setFeatureStyle(value.feature, value.style));
            }
            _.featuresDict[key] = tempArray;
        }
    }
};
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
                source: source
            });
        }

        for (key in keys) {
            _.layersDict[key] = setLayerSource(mapData.sources.sourcesDict[key]);
        }
    },
    layersDict: {}
};
mapData.layers.setAllLayerSource();

var extent = [0, 0, 2574, 1416];
var projection = new ol.proj.Projection({
    code: 'macao-001',
    units: 'pixels',
    extent: extent
});
var backgroundLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: 'https://ws1.sinaimg.cn/large/9130c6a9gy1fq9zf1bhwnj21zi13chdt.jpg',
        projection: projection,
        imageExtent: extent
    })
});
var map = new ol.Map({
    controls: ol.control.defaults({
        zoomOptions: {
            className: 'ol-zoom oh bs20',
            zoomInLabel: zoomIn,
            zoomOutLabel: zoomOut
        }
    }).extend([new app.RotateNorthControl()]),
    target: document.getElementById('map'),
    layers: [backgroundLayer,
        mapData.layers.layersDict['viewSpot'],
        mapData.layers.layersDict['food'],
        mapData.layers.layersDict['entertainment'],
        mapData.layers.layersDict['holiday']],
    view: new ol.View({
        projection: projection,
        center: ol.extent.getCenter(extent),
        // TODO 根据图片分辨率计算缩放倍数
        resolution: 1,
        maxResolution: 4,
        minResolution: 0.5
        // zoom: 2,
        // maxZoom: 8
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
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
    var coordinates;
    if (feature) {
        coordinates = feature.getGeometry().getCoordinates();
        console.log(coordinates);
        popup.setPosition(coordinates);
        $(element).popover('destroy'); // 不销毁会导致不同 feature 弹出相同 popover
        $(element).popover({
            'placement': 'top',
            'html': true,
            'content': '<a class="popup-link-container" href="javascript:;" onclick="triggerInitLocationDetail(\'' + feature.get('siteId') + '\');">' +
                '           <div class="popup-inner">' +
                '               <div class="popup-inner-img-container">' +
                '                   <img src="' + siteData[feature.get('siteId')].image + '" class="popup-inner-img">' +
                '               </div>' +
                '               <div class="popup-inner-text-container">' +
                '                   <p class="popup-inner-text-title">' + siteData[feature.get('siteId')].name + '</p>' +
                '                   <p class="popup-inner-text-subtitle">' + siteData[feature.get('siteId')].subname + '</p>' +
                '               </div>' +
                '               <img src="asset/img/right.svg" alt="show-detail" class="popup-inner-right-arrow">' +
                '           </div>' +
                '       </a>'
        });
        $(element).popover('show');
    } else {
        if ($('#popup+.popover').length > 0) {

            $('.popup-link-container').trigger('click');
        }
        $(element).popover('destroy');
    }
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
    if (e.dragging) {
        $(element).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
