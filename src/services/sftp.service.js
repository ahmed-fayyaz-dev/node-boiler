"use strict";

const Client = require("ssh2-sftp-client");
const { sftpConfig1 } = require("../config/sftpConfig");
var AdmZip = require("adm-zip");

const sftp = new Client("sftp-client");
const FILE_NAME_1 = "TOTAL.ZIP";
let localFile = __dirname + "/" + FILE_NAME_1;

/*
 *download sftp file
 */
const downloadFile = async () => {
  if (sftp) {
    console.log("downloading...");

    sftp
      .connect(sftpConfig1)
      .then(() => {
        sftp.get(FILE_NAME_1, localFile).then((file) => {
          console.log("downloaded", file);
          // console.log(file);

          sftp.end();
          return file;
        });
      })
      .catch((e) => console.log(e.message));
  }
};

const listFiles = async () => {
  if (sftp) {
    sftp
      .list(`/`)
      .then((data) => {
        const file = data.find((i) => i.name === FILE_NAME_1);

        console.log(file);
      })
      .catch((e) => console.log(e.message));
  }
};

const closeSftpCon = async () => {
  if (sftp) sftp.end();
};

module.exports = { sftp, downloadFile, closeSftpCon };
