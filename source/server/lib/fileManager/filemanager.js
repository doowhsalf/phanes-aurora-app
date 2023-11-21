/**
 * Created by kacper on 6/8/16.
 */
/*
"use strict";

export default function FileManager(baseDirectory) {
  var path = Npm.require('path');
  var fs = Npm.require('fs');
  baseDirectory = baseDirectory.trim('/');
  let filesRootPath = Meteor.settings.filesRootPath;
  var basePath = `${filesRootPath}/${baseDirectory}/`;
  basePath = basePath.replace('//', '/');

  this.readInputFileAsBuffer = function (fileName) {
    try {
      var fileBuffer = fs.readFileSync(basePath + fileName);
      return fileBuffer;
    }
    catch (error) {
      throw new Error(`File ${fileName} not found`);
    }
  };

  this.readOutputFileAsBuffer = function (fileName) {
    var fileBuffer = fs.readFileSync(basePath + 'out/' + fileName);
    return fileBuffer;
  };

  this.writeBufferAsInputFile = function (fileName, writeBuffer) {
    createPathIfDoesNotExist(basePath);
    fs.writeFileSync(basePath + fileName, writeBuffer);
  };

  this.writeBufferAsOutputFile = function (fileName, writeBuffer) {
    let outPath = basePath + 'out/';
    createPathIfDoesNotExist(outPath);
    fs.writeFileSync(outPath + fileName, writeBuffer);
  };

  this.setBaseDirectory = function (baseDirectory) {
    baseDirectory = baseDirectory.trim('/');
    basePath = `${filesRootPath}/${baseDirectory}/`;
  };

  this.getBasePath = function () {
    return basePath;
  };

  this.getBaseOutPath = function () {
    return basePath + 'out';
  };

  this.listFiles = function () {
    return fs.readdirSync(basePath).reduce(function (list, file) {
      var name = path.join(basePath, file);
      if (!fs.statSync(name).isDirectory()) {
        list.push(file);
      }
      return list;
    }, []);
  };

  var createPathIfDoesNotExist = function (path) {
    var getParentPath = function (path) {
      //   root/dir1/dir2/ -> root/dir1/dir2 -> root/dir1
      path = path.replace(/\/+$/, '');
      let lastSlashIndex = path.lastIndexOf('/');
      return path.substring(0, lastSlashIndex);

    };

    if (!fs.existsSync(path)) {
       DEFCON5 && console.log(`Creating path ${path}`);
      let parentPath = getParentPath(path);
      if (!fs.existsSync(parentPath)) {
        createPathIfDoesNotExist(parentPath)
      }
      fs.mkdirSync(path);
    }
  }

}
*/
