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

    $(document).on('click', '.pn>div:not(.pnt)', function () {
        var id = $(this).data('location-id');
        self.initLocationDetail(site[id]);

        $('.ml').addClass('open2');
    });
}
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
            '            <img src="' + loc.image + '" alt="related-locations" srcset="">' +
            '          </div>' +
            '          <span>' + loc.name + '</span>' +
            '        </div>';
    }
    $('.lC').html(tempHtml);
};

var menuList = new MenuList();

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

    // TODO
    filterAll.addEventListener('click', handleRotateNorth, false);
    filterAll.addEventListener('touchstart', handleRotateNorth, false);

    // TODO
    function changeFilterViewSpot() {
        this_.getMap().setLayerGroup(new ol.layer.Group({
            layers: [picLayer, vectorLayer2]
        }));
    }
    filterViewSpot.addEventListener('click', changeFilterViewSpot, false);
    filterViewSpot.addEventListener('touchstart', changeFilterViewSpot, false);

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

// layer1, feature1, feature2
var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([1200, 700]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 48],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
    }))
});

iconFeature.setStyle(iconStyle);

var iconFeature2 = new ol.Feature({
    geometry: new ol.geom.Point([1200, 800]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});

var iconStyle2 = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 48],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
    }))
});

iconFeature2.setStyle(iconStyle2);

var vectorSource = new ol.source.Vector({
    features: [iconFeature, iconFeature2]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

// layer2, feature3, feature4
var iconFeature3 = new ol.Feature({
    geometry: new ol.geom.Point([1100, 700]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});

var iconStyle3 = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 48],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
    }))
});

iconFeature3.setStyle(iconStyle3);

var iconFeature4 = new ol.Feature({
    geometry: new ol.geom.Point([1100, 800]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});

var iconStyle4 = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 48],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
    }))
});

iconFeature4.setStyle(iconStyle4);

var vectorSource2 = new ol.source.Vector({
    features: [iconFeature3, iconFeature4]
});

var vectorLayer2 = new ol.layer.Vector({
    source: vectorSource2
});

var extent = [0, 0, 2574, 1416];
var projection = new ol.proj.Projection({
    code: 'macao-001',
    units: 'pixels',
    extent: extent
});
var picLayer = new ol.layer.Image({
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
    layers: [picLayer, vectorLayer, vectorLayer2],
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
    if (feature) {
        var coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        // $(element).popover({
        //     'placement': 'top',
        //     'html': true,
        //     'content': feature.get('name')
        // });
        // $(element).popover('show');
    } else {
        // $(element).popover('destroy');
    }
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
    if (e.dragging) {
        // $(element).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
