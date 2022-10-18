const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { sftpService, extractService } = require("../services");

const { sftpConfig1 } = require("../config/sftpConfig");

const FILE_NAME_1 = "TOTAL.ZIP";

let TARGET_PATH_1 = __dirname + "/" + FILE_NAME_1;
let TARGET_UNZIP_PATH_1 = __dirname + "/" + "TOTAL.TXT";

const updateFeed = catchAsync(async (req, res) => {
  const file1 = await sftpService.downloadFile(
    sftpConfig1,
    FILE_NAME_1,
    TARGET_PATH_1
  );

  console.log(file1);

  // const file2 = await sftpService.downloadFile(sftpConfig1, FILE_NAME_1);

  if (!file1) {
    throw new ApiError(httpStatus.NOT_FOUND, "File1 not found");
  }

  // if (!file2) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "File2 not found");
  // }

  const unzipedFile1 = await extractService.unzip(file1, TARGET_UNZIP_PATH_1);

  // const unzipedFile2 = await extractService.unzip(file1, TARGET_UNZIP_PATH_1);

  if (!unzipedFile1) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, "File1 not unzipped");
  }
  // if (!unzipedFile2) {
  //   throw new ApiError(httpStatus.EXPECTATION_FAILED, "File2 not unzipped");
  // }

  res.json({
    success: "success",
    res: {
      downloadFile1: file1 && true,
      // downloadFile2: file2 == true,
      unzipFile1: unzipedFile1 && true,
      // unzipFile2: unzipedFile2 == true,
    },
  });
});

module.exports = {
  updateFeed,
};
