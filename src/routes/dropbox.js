const { Dropbox } = require('dropbox'); // eslint-disable-line import/no-unresolved
const fs = require('fs');
const path = require('path');

const accessToken = process.env.DROPBOX_TOKEN

const dropboxGetList = (app) => {
  app.post('/dropbox/list', (req, res) => {
    try {
      const { folder } = req.body
      if (!folder) {
        return res.status(401).send({ message: "drpobox folder path is required" });
      }
      const dbx = new Dropbox({ accessToken });
      dbx.filesListFolder({ path: folder })
        .then((response) => {
          console.log(response);
          res.send(response);
        })
        .catch((error) => {
          res.send(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });
};

const uploadToDropbox = (app) => {
  app.post('/dropbox/upload', (req, res) => {
    try {
      const dbx = new Dropbox({ accessToken });

      fs.readFile(path.join(__dirname, '/testUpload.txt'), (error, contents) => {
        if (error) {
          console.log('Error: ', error);
        }

        // This uploads basic.js to the root of your dropbox
        dbx.filesUpload({ path: '/test.txt', contents })
          .then((response) => {
            res.send(response);
            console.log(response);
          })
          .catch((uploadError) => {
            console.log(uploadError);
          });
      });
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: error });
    }
  })
}

const downloadFile = (app) => {
  app.post('/dropbox/download', (req, res) => {
    try {
      const { sharedLink } = req.body
      if (!sharedLink) {
        return res.status(401).send({ message: "drpobox shared Link is required" });
      }
      const dbx = new Dropbox({ accessToken });
      console.log('shared link', sharedLink);
      dbx.sharingGetSharedLinkFile({ url: sharedLink })
        .then((data) => {
          fs.writeFile(data.result.name, data.fileBinary, 'binary', (error) => {
            if (error) {
              console.log('error in download', error);
              throw err;
            }
            res.status(200).send({ message: `File: ${data.result.name} saved.` });
            console.log(`File: ${data.name} saved.`);
          });
        })
        .catch((error) => {
          console.log('err', error);
          res.status(500).send({ error: error });
        });
    } catch (error) {
      console.log('err', error);
      res.status(500).send({ error: error });
    }
  })
}

module.exports = {
  dropboxGetList,
  uploadToDropbox,
  downloadFile
}
