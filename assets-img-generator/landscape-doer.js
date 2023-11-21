var fs = require("fs"),
  gm = require("gm").subClass({ imageMagick: true });

var icons = [
  { name: "android512", size: "512x512" },
];

var splashes = [
  { name: "iphone-splash-500x750", size: "500x750" },
  { name: "iphone-splash2x-1000x1500", size: "1000x1500" },
  { name: "iphone-splash3x-1500x2250", size: "1500x2250" },
  { name: "android-drawable-hdpi-750x1125", size: "750x1125" },
  { name: "android-drawable-mdpi-500x750", size: "500x750" },
  { name: "android-drawable-xhdpi-1000x1500", size: "1000x1500" },
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
