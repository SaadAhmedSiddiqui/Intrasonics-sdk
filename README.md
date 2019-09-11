# Intrasonics SDK

Intrasonics SDK is a Nodejs wrapper sdk to assist you with command line encoding software of intrasonics

  + The Intrasonics AV encoder allows users to insert codewords into media (audio/video) files. The user can specify which codewords they wish to insert and at what point in time within the media file they should be inserted.
  + The encoder is available on Windows, Mac, or Linux. It uses a command/terminal window and the user may specify codewords and timings using either a configuration file or by typing commands at a prompt.
  + Magic

## Installation

``` sh
npm install intrasonics-sdk
```

## Tech

Intrasonics SDK uses a number of open source projects to work properly:

* [npm](https://www.npmjs.com/) - Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code.
* [node.js](https://nodejs.org) - evented I/O for the backend
* [intrasonics](https://www.intrasonics.com) - Intrasonics' audio watermarking technology uses sound to help you harness consumer interest when it matters most.

## Requirements

Intrasonics SDK uses resources provided by intrasonics:

* [encoding software](https://portal.intrasonics.com/app/resources) - A Folder contains files AVFileDecoder ffmpeg ffprobe files provided by intrasonic for encoding
* [encoder token](https://portal.intrasonics.com/app/tokens) - Encoder token (with .ist suffix) used to get access provided by intrasonics

## Encoder Sofware Versions used

* Linux - LinuxAVEncoder_4.2.0
* Mac - OSXAVEncoder_4.2.0
* Windows - WindowsAVEncoder_1.0.7

## Example

``` sh
const IntrasonicsSDK = require('intrasonics-sdk');

let intrasonicsSDK;
try {
  intrasonicsSDK = new IntrasonicsSDK({ softwareFolder: 'intrasonics', tokenPath: 'intrasonics/intrasonics-token.ist' });
  intrasonicsSDK.encode({
    filePath: 'input-files/audio.mp3',
    codeword: '10001',
    outputPath: 'encoded-files/audio_encoded.mp3',
    eventEngine: true
  })
    .then((stdout) => {
      console.log(stdout);
    }, (err) => {
      console.error(err);
    })
} catch (err) {
  console.error(err);
}
```

## Main Constructor

``` sh
const intrasonicsSDK = IntrasonicsSDK({softwareFolder, tokenPath});
 ```

## Main Constructor Config Options

### softwareFolder (string) [folder path or folder name]

* name or path to folder which will contain AVFileDecoder ffmpeg ffprobe files i.e. Encoder Software.

### tokenPath (string) [file path or file name]

* name or path to the encoder token (with .ist suffix)

## Encoder Instance Method

``` sh
await intrasonicsSDK.encode({filePath, codeword, [outputPath], [eventEngine], [time]})
 ```

### filePath (string) [file path or file name]

* file name or file path of a audio/video file to be encoded

### codeword (string)

* watermarkId/trackId that will be encoded in audio/video file

### outputPath (string) [Optional]

* file name or file path to encoded/output file

### eventEngine (boolean | number) [Optional]

* controls event engine 2 encoding true for on or time offset in number

### time (number) [Optional]

* time in seconds where the codeword will be placed

