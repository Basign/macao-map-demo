// bug fix hack
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
    // 设置地图容器高度
    var containerHeight = $('.C').offset().top;
    $('.C').css({
        height: 'calc(100vh - ' + containerHeight + 'px)'
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

    $(document).on('click', '.pC>.p1', togglePopup);

    $(document).on('click', '.pC>.pp .close', togglePopup);
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
            var height = ($(this).siblings().length + 1) * (72 + 2) - 2;

            $(this).find('[alt="down-caret"]').addClass('open').closest('.pn').addClass('open').css('height', height + 'px');
        }

        // 切换图层
        // var $this = $(this);
        // var layerIndex = $this.parent().index();
        // $('.ol-feature-filter>button').eq(layerIndex + 1).trigger('click');
    });

    $(document).on('click', '.mlri>.close', function () {
        $('.ml').removeClass('open2');
    });

    $(document).on('click', '.mlrc>.tg', function () {
        if ($(this).hasClass('text-open')) {
            $('.sdC').css('max-height', '90px');
            $(this).children().html('展开');
        } else {
            $('.sdC').css('max-height', 'unset');
            $(this).children().html('收起');
        }
        $(this).toggleClass('text-open');
    });

    $(document).on('click', '.pn>:not(.pnt)', function () {
        // TODO 收起其他展开, 添加 active 状态

        var id = $(this).data('location-id');
        self.initLocationDetail(siteData[id]);
    });

    $(document).on('click', '.mlrb', function findOnMap() {
        // 切换 全部 图层, 以显示所有 feature
        $('.ol-feature-filter>button').eq(0).trigger('click');

        $('.tB').trigger('click');
        map.getView().animate({ center: self.currentFeatureCoordinates }, { resolution: 0.5 });
    });

    $(document).on('click', '.lCiW', function () {
        var id = $(this).data('site-id');
        triggerInitLocationDetail(id);

        // TODO trigger
    });
}

// 点击兴趣点, 展开详情
MenuList.prototype.initLocationDetail = function (obj) {
    $('.mlr').scrollTop(0);

    $('.sdC').css('max-height', '90px');
    $('.mlrc>.tg>a').html('展开');
    $('.mlrc>.tg').removeClass('text-open');

    $('.mlrt').css('background-image', 'url(' + obj.image + ')');
    $('.opening-hours').html(obj.openingHours);
    $('.site-location').html(obj.location);
    $('.site-name').html(obj.name);
    $('.site-description').html(obj.description);

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
    menuList.initLocationDetail(siteData[id]);
}

window.app = {};
var app = window.app;

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.CustomControl = function (opt_options) {
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
ol.inherits(app.CustomControl, ol.control.Control);

// namespace for all features
window.mapData = {};
var mapData = window.mapData;

mapData.features = {
    data: {
        viewSpot: [
            // 大三巴
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['1'].coordinates),
                    siteId: '1'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/Pud0eg.png'
                    }))
                })
            },
            // 大炮台
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['2'].coordinates),
                    siteId: '2'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/PuwPpt.png'
                    }))
                })
            },
            // 博物馆
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['3'].coordinates),
                    siteId: '3'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2wIf.png'
                    }))
                })
            },
            // 议事亭前地
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['4'].coordinates),
                    siteId: '4'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2Bi8.png'
                    }))
                })
            },
            // 玫瑰堂
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['5'].coordinates),
                    siteId: '5'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2rRg.png'
                    }))
                })
            },
            // 东望洋炮台
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['6'].coordinates),
                    siteId: '6'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2css.png'
                    }))
                })
            },
            // TODO 大赛车博物馆
            // {
            //     feature: new ol.Feature({
            //         geometry: new ol.geom.Point(siteData['7'].coordinates),
            //         siteId: '7'
            //     }),
            //     style: new ol.style.Style({
            //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            //             anchor: [0.5, 1],
            //             anchorXUnits: 'fraction',
            //             anchorYUnits: 'fraction',
            //             src: 'https://s1.ax1x.com/2018/07/12/Pu2css.png'
            //         }))
            //     })
            // },
            // 渔人码头
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['8'].coordinates),
                    siteId: '8'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2Odx.png'
                    }))
                })
            },
            // 科学馆
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['9'].coordinates),
                    siteId: '9'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2xJO.png'
                    }))
                })
            },
            // 郑家大屋
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['10'].coordinates),
                    siteId: '10'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/Pu2zWD.png'
                    }))
                })
            },
            // TODO 妈阁庙
            // {
            //     feature: new ol.Feature({
            //         geometry: new ol.geom.Point(siteData['11'].coordinates),
            //         siteId: '11'
            //     }),
            //     style: new ol.style.Style({
            //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            //             anchor: [0.5, 1],
            //             anchorXUnits: 'fraction',
            //             anchorYUnits: 'fraction',
            //             src: 'https://s1.ax1x.com/2018/07/12/Pu2zWD.png'
            //         }))
            //     })
            // },
            // 旅游塔
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['12'].coordinates),
                    siteId: '12'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PuRATP.png'
                    }))
                })
            },
            // 龙环葡韵
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['13'].coordinates),
                    siteId: '13'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PuRefS.png'
                    }))
                })
            },
            // 官也街
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['14'].coordinates),
                    siteId: '14'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PufwIx.png'
                    }))
                })
            },
            // 威尼斯人
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['16'].coordinates),
                    siteId: '16'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PuR21e.png'
                    }))
                })
            },
            // 巴黎人
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['17'].coordinates),
                    siteId: '17'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PuR57t.png'
                    }))
                })
            },
            // 大熊猫馆
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['21'].coordinates),
                    siteId: '21'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PuWnN6.png'
                    }))
                })
            },
            // 圣方济各圣堂
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['22'].coordinates),
                    siteId: '22'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PuW1jH.png'
                    }))
                })
            },
            // 黑沙海滩
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['24'].coordinates),
                    siteId: '24'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PufSrd.png'
                    }))
                })
            }
        ],
        food: [
            // 官也街
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['14'].coordinates),
                    siteId: '14'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/12/PufwIx.png'
                    }))
                })
            },
            // 杏仁饼
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['15'].coordinates),
                    siteId: '15'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/Puwuhn.png'
                    }))
                })
            },
            // 葡式蛋挞
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['23'].coordinates),
                    siteId: '23'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/PuwBjK.png'
                    }))
                })
            }
        ],
        entertainment: [
            // 购物中心
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['18'].coordinates),
                    siteId: '18'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/Pu06MV.png'
                    }))
                })
            },
            // TODO 家庭儿童娱乐
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['19'].coordinates),
                    siteId: '19'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [5, 5],
                        anchorXUnits: 'pixels',
                        anchorYUnits: 'pixels',
                        src: 'https://s1.ax1x.com/2018/07/11/Pu0LZD.png'
                    }))
                })
            },
            // 金光综艺馆
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['20'].coordinates),
                    siteId: '20'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [165, 112],
                        anchorXUnits: 'pixels',
                        anchorYUnits: 'pixels',
                        src: 'https://s1.ax1x.com/2018/07/12/PuR7h8.png'
                    }))
                })
            }
        ],
        holiday: [
            // 澳门光影节
            // {
            //     feature: new ol.Feature({
            //         geometry: new ol.geom.Point(siteData['19'].coordinates),
            //         siteId: '25'
            //     }),
            //     style: new ol.style.Style({
            //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            //             anchor: [0.5, 1],
            //             anchorXUnits: 'fraction',
            //             anchorYUnits: 'fraction',
            //             src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
            //         }))
            //     })
            // },
            // 澳门格兰披治大赛车
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['26'].coordinates),
                    siteId: '26'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/PuBMLT.png'
                    }))
                })
            },
            // 烟花
            {
                feature: new ol.Feature({
                    geometry: new ol.geom.Point(siteData['27'].coordinates),
                    siteId: '27'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: 'https://s1.ax1x.com/2018/07/11/PuB0eO.png'
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
        url: 'https://ws1.sinaimg.cn/large/9130c6a9gy1ft5ngnh7m0j22kg3vz1kx.jpg',
        projection: projection,
        imageExtent: extent
    })
});

var zoomIn = document.createElement("img");
zoomIn.setAttribute('src', 'asset/img/zoom-in-2.svg');
zoomIn.setAttribute('alt', 'zoom-in');
var zoomOut = document.createElement("img");
zoomOut.setAttribute('src', 'asset/img/zoom-out-2.svg');
zoomOut.setAttribute('alt', 'zoom-out');

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
        mapData.layers.layersDict['food'],
        mapData.layers.layersDict['entertainment'],
        mapData.layers.layersDict['holiday']],
    view: new ol.View({
        projection: projection,
        center: ol.extent.getCenter(extent),
        // 缩放倍数
        resolution: 1,
        maxResolution: 4,
        minResolution: 0.5
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
        popup.setPosition(coordinates);
        if ($('#popup+.popover').length > 0) {
            // $('.popup-link-container').trigger('click');
            $(element).popover('destroy'); // 不销毁会导致不同 feature 弹出相同 popover
        }
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
                '               <div class="CF"></div>' +
                '           </div>' +
                '       </a>'
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
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
