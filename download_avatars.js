var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config()

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the Github Avatar Downloader!');

var gh_user = process.env.GITHUB_USER;
var gh_token = process.env.GITHUB_TOKEN;

var mkdirSync = function () {
  try {
    fs.mkdirSync('./avatar/');
  } catch(e) {
    if ( e.code != 'EEXIST' )
      throw e;
  }
}();

if (!repoOwner || !repoName) {
  console.log('input argument');
  return false;
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ gh_user + ':' + gh_token + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'Github Avatar Project'
    },
    bearer: gh_token
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