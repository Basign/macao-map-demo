$(window).on('load', function () {
    /* Preload code goes here */
    function preload(imageArray, index) {
        var index = index || 0;
        if (imageArray && imageArray.length > index) {
            var img = new Image();
            img.onload = function () {
                preload(imageArray, index + 1);
            }
            img.src = imageArray[index];
        }
    }
    /* images is an array with image metadata */

    var images = [];
    for (loc in siteData) {
        images.push(siteData[loc].image);
    }
    preload(images);
});
