import {Meteor} from 'meteor/meteor';
import FileManager from './lib/fileManager/filemanager';

Picker.route('/file/:fileType/:fileId', function (params, req, res, next) {
  let {fileType, fileId} = params;
  try {
    let fileName = decodeURIComponent(fileId);
    var fileData = new FileManager(fileType).readOutputFileAsBuffer(fileName);
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.end(fileData);
  } catch (e) {
    res.end('File not found!');
  }


});
