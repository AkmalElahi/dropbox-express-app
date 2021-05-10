const { dropboxGetList, uploadToDropbox, downloadFile } = require("./dropbox");

module.exports = function (app) {
  dropboxGetList(app);
  uploadToDropbox(app);
  downloadFile(app);
};
