"use strict";

const Client = require("ssh2-sftp-client");

/*
 *download sftp file
 */
const downloadFile = async (sftpConfig, fileName, targetPath) => {
  const sftp = new Client("sftp-client");

  if (sftp) {
    console.log("downloading...");

    return await sftp
      .connect(sftpConfig)
      .then(async () => {
        try {
          await sftp.get(fileName, targetPath);
          console.log("downloaded");
          sftp.end();

          return targetPath;
        } catch (err) {
          throw err;
        }
      })
      .catch((err) => {
        throw err;
      });
  }
};

module.exports = { downloadFile };

// const listFiles = async () => {
//   if (sftp) {
//     sftp
//       .list(`/`)
//       .then((data) => {
//         const file = data.find((i) => i.name === FILE_NAME_1);

//         console.log(file);
//       })
//       .catch((e) => console.log(e.message));
//   }
// };
