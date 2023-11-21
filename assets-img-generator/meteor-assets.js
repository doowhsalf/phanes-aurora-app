var fs = require("fs"),
  gm = require("gm").subClass({ imageMagick: true });

var icons = [
  { name: "android512", size: "512x512" },
  { name: "iphone_2x", size: "120x120" },
  { name: "iphone_3x", size: "180x180" },
  { name: "ipad", size: "76x76" },
  { name: "ipad_2x", size: "152x152" },
  { name: "ipad_pro", size: "167x167" },
  { name: "ios-settings-29x29", size: "29x29" },
  { name: "ios-settings_2x-58x58", size: "58x58" },
  { name: "ios-settings_3x-87x87", size: "87x87" },
  { name: "ios-settings-40x40", size: "40x40" },
  { name: "ios-settings_2x-80x80", size: "80x80" },
  { name: "ios-settings_2x-120x120", size: "120x120" },
  { name: "ios-settings_2x-180x180", size: "180x180" },
  { name: "ios-settings_2x-512x512", size: "512x512" },
  { name: "ios-settings_2x-1024x1024", size: "1024x1024" },
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
  { name: "icon-40x40@3x", size: "120x120" },
  { name: "icon-48x48", size: "48x48" },
  { name: "icon-50x50", size: "50x50" },
  { name: "icon-50x50@2x", size: "100x100" },
  { name: "icon-57x57", size: "57x57" },
  { name: "icon-58x58", size: "58x58" },
  { name: "icon-57x57@2x", size: "114x114" },
  { name: "icon-60x60", size: "60x60" },
  { name: "icon-60x60@2x", size: "120x120" },
  { name: "icon-72x72", size: "72x72" },
  { name: "icon-72x72@2x", size: "144x144" },
  { name: "icon-76x76", size: "76x76" },
  { name: "icon-87x87", size: "87x87" },
  { name: "icon-76x76@2x", size: "152x152" },
  { name: "icon-96x96", size: "96x96" },
  { name: "icon-1024x1024", size: "1024x1024" },
];

var splashes = [
  { name: "iphone_2x", size: "640x960" },
  { name: "iphone5", size: "640x1136" },
  { name: "iphone6", size: "750x1334" },
  { name: "iphone6p_portrait", size: "1242x2208" },
  { name: "iphone6p_6.5_2688x1242", size: "2688x1242" },
  { name: "iphone6p_5.8_2436x1125", size: "2436x1125" },
  { name: "iphone6p_5.5_2208x1242", size: "2208x1242" },
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
  { name: "android_1024_500", size: "1024x500" },
  { name: "splash-200x320", size: "200x200" },
  { name: "splash-320x200", size: "320x320" },
  { name: "splash-320x480", size: "320x480" },
  { name: "splash-320x480@2x", size: "640x960" },
  { name: "splash-320x568@2x", size: "640x1136" },
  { name: "splash-480x320", size: "480x320" },
  { name: "splash-480x800", size: "480x800" },
  { name: "splash-720x1280", size: "720x1280" },
  { name: "splash-720x1280", size: "720x1280" },
  { name: "splash-1024x500", size: "1024x500" },
  { name: "splash-768x1024@2x", size: "1536x2048" },
  { name: "splash-800x480", size: "800x480" },
  { name: "splash-1024x768", size: "1024x768" },
  { name: "splash-1024x768@2x", size: "2048x1536" },
  { name: "splash-1280x720", size: "1280x720" },
  { name: "splash-2000x3000", size: "2000x3000" },
  { name: "applewatch-s5-368x448", size: "368x448" },
  { name: "iphone-splash-500x750", size: "500x750" },
  { name: "iphone-splash2x-1000x1500", size: "1000x150" },
  { name: "iphone-splash3x-1500x2250", size: "1500x2250" },
  { name: "android-drawable-hdpi-750x1125", size: "750x1125" },
  { name: "android-drawable-mdpi-500x750", size: "500x750" },
  { name: "android-drawable-xhdpi-1000x1500", size: "1000x150" },
  { name: "android-drawable-xxhdpi-1500x2250", size: "1500x2250" },
  { name: "android-drawable-xxxhdpi-2000x3000", size: "2000x3000" },
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

  icon.resize(width, height).write(target + name + ".png", function (err) {
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
    .write(target + name + ".png", function (err) {
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

icons.forEach(function (icon) {
  resize("resources/icon.png", "resources/icons/", icon);
});

splashes.forEach(function (splash) {
  crop("resources/splash.png", "resources/splashes/", splash);
});
