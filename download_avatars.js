var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the Github Avatar Downloader!');

var GITHUB_USER = 'ylhoony';
var GITHUB_TOKEN = 'a9d56634be25bbc6d33db7dfb478d9447a8c4491';

var mkdirSync = function () {
  try {
    fs.mkdirSync('./avatar/');
  } catch(e) {
    if ( e.code != 'EEXIST' )
      throw e;
  }
}();

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'Github Avatar Project'
    },
    bearer: GITHUB_TOKEN
  }
   request(requestOptions, cb); // callback to getRepoContributor
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
            throw err;
         })
         .on('response', function(res) {
            console.log('Downloading image...');
            console.log('Download complete.');
         })
         .pipe(fs.createWriteStream('./avatar/' + filePath));
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  var parse = JSON.parse(result.body);
  parse.forEach(function(x){
  console.log(x.avatar_url);
  console.log(x.login);
  console.log('********');

  downloadImageByURL(x.avatar_url, x.login +'.jpg' ); // Call downloadImageByURL
  })
});