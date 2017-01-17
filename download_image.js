var request = require('request');
var fs = require('fs');
var dir = './avatar/'

console.log('Welcome to the Github Avatar Downloader!');

var GITHUB_USER = 'ylhoony';
var GITHUB_TOKEN = 'a9d56634be25bbc6d33db7dfb478d9447a8c4491';

var mkdirSync = function () {
  try {
    fs.mkdirSync(dir);
  } catch(e) {
    if ( e.code != 'EEXIST' )
      throw e;
  }
}();

function downloadImageByURL(url, filePath) {


request.get(url)
       .on('error', function (err) {
          throw err;
       })
       .on('response', function(res) {
          console.log('Downloading image...');
          console.log('Download complete.');

       })
       .pipe(fs.createWriteStream(filePath));

}

downloadImageByURL('https://avatars.githubusercontent.com/u/43004?v=3', './avatar/kvirani.jpg')



// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });