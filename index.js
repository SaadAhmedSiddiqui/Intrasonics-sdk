const { statSync } = require('fs');
const { join, resolve: resolvePath } = require('path');
const { exec } = require('child_process');

const IntrasonicsSDK = (function () {
  /**
   * Represents Intrasonics SDK wrapper for nodejs.
   * @constructor
   * @param {object} config - Intrasonics configuration.
   * @param {string} config.softwareFolder - name or path to folder which will contain AVFileDecoder ffmpeg ffprobe files i.e. Encoder Software.
   * @param {string} config.tokenPath - name or path to encoder token (with .ist suffix).
   * @property {function} encode
   */
  function IntrasonicsSDK(config) {
    config = config || {};
    if (!config.softwareFolder) {
      throw new Error("Please include softwareFolder to folder which will contain AVFileDecoder ffmpeg ffprobe files");
    }
    if (!config.tokenPath || !(/\.ist$/).test(config.tokenPath)) {
      throw new Error("Please include tokenPath path to Encoder token (with .ist suffix)");
    }
    config.softwareFolder = resolvePath(config.softwareFolder);
    config.tokenPath = resolvePath(config.tokenPath);

    let pathResult;
    try {
      pathResult = statSync(config.softwareFolder);
    } catch (error) {
      throw new Error(`softwareFolder ${config.softwareFolder} folder does not exist`);
    }
    if (!pathResult.isDirectory()) {
      throw new Error(`softwareFolder ${config.softwareFolder} is invalid directory`);
    }
    if (!pathResult || !pathResult.isDirectory()) {
      next(createError(400, `path ${watcherPath} is invalid directory`));
      return
    }
    try {
      statSync(join(config.softwareFolder, 'AVFileDecoder'));
      statSync(join(config.softwareFolder, 'ffmpeg'));
      statSync(join(config.softwareFolder, 'ffprobe'));
    } catch (error) {
      throw new Error(`${config.softwareFolder} foler must includes all AVFileDecoder ffmpeg ffprobe files`);
    }
    try {
      pathResult = statSync(config.tokenPath);
    } catch (error) {
      throw new Error(`${config.tokenPath} does not exist`);
    }

    this.config = config;
  }
  /**
   * Intrasonics AV encoder allows users to insert codewords into media (audio/video) files.
   * @async
   * @function encode
   * @param {object} config - Intrasonics Encoder configuration.
   * @param {string} config.filePath - file name or file path of a audio/video file to be encoded.
   * @param {string} config.codeword - watermarkId/trackId that will be encoded in audio/video file.
   * @param {string} [config.outputPath] - file name or file path for encoded/output file.
   * @param {boolean | number} [config.eventEngine] - controls Event Engine 2 encoding true for on or time offset.
   * @param {number} [config.time] - time in seconds where the codeword will be placed.
   * @return {Promise<string>} - console output
   */
  IntrasonicsSDK.prototype.encode = async function Encode(config) {
    return new Promise((resolve, reject) => {
      config = config || {};
      if (!config.filePath) {
        throw new Error("Please include filePath to audio/video file that will be encoded");
      }
      if (!config.codeword) {
        throw new Error("Please include codeword (watermarkid/trackId) that will be encoded in audio/video file");
      }
      config.filePath = resolvePath(config.filePath);

      let execStr = `${this.config.softwareFolder}/AVFileEncoder `
        + `${config.filePath} `
        + `-l ${this.config.tokenPath} `
        + `-c ${config.codeword} `;

      if (config.outputPath) {
        config.outputPath = resolvePath(config.outputPath);
        console.log(config.outputPath);
        execStr += `-o ${config.outputPath} `
      }
      if (config.time) {
        execStr += `-t ${config.time}`;
      }
      if (config.eventEngine) {
        if (config.eventEngine === true) {
          execStr += '-e on';
        } else {
          execStr += `-e ${config.eventEngine}`;
        }
      }

      console.log(execStr);
      exec(execStr, async (err, stdout, stderr) => {
        if (err) {
          console.error(stderr);
          reject(err);
        }

        resolve(stdout);
      });
    });
  };

  return IntrasonicsSDK;
})();

exports['default'] = IntrasonicsSDK;
module.exports = exports['default'];
