var fs = require("fs"),
    gm = require("gm").subClass({ imageMagick: true });

var icons = [
    { name: "iphone_2x", size: "120x120" },
    { name: "iphone_3x", size: "180x180" },
    { name: "ipad", size: "76x76" },
    { name: "ipad_2x", size: "152x152" },
    { name: "ipad_pro", size: "167x167" },
    { name: "ios_settings", size: "29x29" },
    { name: "ios_settings_2x", size: "58x58" },
    { name: "ios_settings_3x", size: "87x87" },
    { name: "ios_spotlight", size: "40x40" },
    { name: "ios_spotlight_2x", size: "80x80" },
    { name: "android_mdpi", size: "48x48" },
    { name: "android_hdpi", size: "72x72" },
    { name: "android_xhdpi", size: "96x96" },
    { name: "android_xxhdpi", size: "144x144" },
    { name: "android_xxxhdpi", size: "192x192" },
    { name: "icon-29x29", size: "29x29" },
    { name: "icon-29x29@2x", size: "29x29" },
    { name: "icon-36x36", size: "36x36" },
    { name: "icon-40x40", size: "40x40" },
    { name: "icon-40x40@2x", size: "80x80" },
    { name: "icon-48x48", size: "48x48" },
    { name: "icon-50x50", size: "50x50" },
    { name: "icon-50x50@2x", size: "100x100" },
    { name: "icon-57x57", size: "57x57" },
    { name: "icon-57x57@2x", size: "114x114" },
    { name: "icon-60x60", size: "60x60" },
    { name: "icon-60x60@2x", size: "120x120" },
    { name: "icon-72x72", size: "72x72" },
    { name: "icon-72x72@2x", size: "144x144" },
    { name: "icon-76x76", size: "76x76" },
    { name: "icon-76x76@2x", size: "152x152" },
    { name: "icon-96x96", size: "96x96" },
    { name: "icon-1024x1024", size: "1024x1024" },
];

var splashes = [
    { name: "iphone_2x", size: "640x960" },
    { name: "iphone5", size: "640x1136" },
    { name: "iphone6", size: "750x1334" },
    { name: "iphone6p_portrait", size: "1242x2208" },
    { name: "iphone6p_landscape", size: "2208x1242" },
    { name: "ipad_portrait", size: "768x1024" },
    { name: "ipad_portrait_2x", size: "1536x2048" },
    { name: "ipad_landscape", size: "1024x768" },
    { name: "ipad_landscape_2x", size: "2048x1536" },
    { name: "android_ldpi_landscape", size: "320x200" },
    { name: "android_mdpi_portrait", size: "320x480" },
    { name: "android_mdpi_landscape", size: "480x320" },
    { name: "android_hdpi_portrait", size: "480x800" },
    { name: "android_hdpi_landscape", size: "800x480" },
    { name: "android_xhdpi_portrait", size: "720x1280" },
    { name: "android_xhdpi_landscape", size: "1280x720" },
    { name: "android_xxhdpi_portrait", size: "1080x1440" },
    { name: "android_xxhdpi_landscape", size: "1440x1080" },
    { name: "splash-200x320", size: "200x200" },
    { name: "splash-320x200", size: "320x320" },
    { name: "splash-320x480", size: "320x480" },
    { name: "splash-320x480@2x", size: "640x960" },
    { name: "splash-320x568@2x", size: "640x1136" },
    { name: "splash-480x320", size: "480x320" },
    { name: "splash-480x800", size: "480x800" },
    { name: "splash-720x1280", size: "720x1280" },
    { name: "splash-768x1024", size: "768x1024" },
    { name: "splash-768x1024@2x", size: "1536x2048" },
    { name: "splash-800x480", size: "800x480" },
    { name: "splash-1024x768", size: "1024x768" },
    { name: "splash-1024x768@2x", size: "2048x1536" },
    { name: "splash-1280x720", size: "1280x720" },
];

function getSize(image) {
    var sizes = image.size.split("x");
    return { width: sizes[0], height: sizes[1] };
}

// source file, target directory, image profile
function resize(source, target, image) {
    var icon = gm(source);

    var imageSize = getSize(image);
    var width = imageSize.width;
    var height = imageSize.height;
    var name = image.name;

    icon.resize(width, height).write(target + name + ".png", function(err) {
        if (err) {
            console.log(err);
            console.log("Quitting because of an error");
        } else {
            console.log("Wrote " + name);
        }
    });
}

function crop(source, target, image) {
    var size;
    var splash = gm(source);

    var imageSize = getSize(image);
    var width = parseInt(imageSize.width);
    var height = parseInt(imageSize.height);
    var name = image.name;

    // square up so that it cuts off as little as possible
    if (height > width) {
        splash.resize(height, height);

        size = height;
    } else {
        splash.resize(width, width);

        size = width;
    }

    // calculate x and y offset
    var xOffset = size / 2 - width / 2;
    var yOffset = size / 2 - height / 2;

    splash
        .crop(width, height, xOffset, yOffset)
        .write(target + name + ".png", function(err) {
            if (err) {
                console.log(err);
                console.log("Quitting because of an error");
            } else {
                console.log("Wrote " + name);
            }
        });
}

// Run the code

if (!fs.existsSync(__dirname + "/resources/icons")) {
    fs.mkdirSync(__dirname + "/resources/icons");
}

if (!fs.existsSync(__dirname + "/resources/splashes")) {
    fs.mkdirSync(__dirname + "/resources/splashes");
}

icons.forEach(function(icon) {
    resize("resources/icon.png", "resources/icons/", icon);
});

splashes.forEach(function(splash) {
    crop("resources/splash.png", "resources/splashes/", splash);
});