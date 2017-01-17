var request = require('request');

console.log('Welcome to the Github Avatar Downloader!');

var GITHUB_USER = 'ylhoony';
var GITHUB_TOKEN = 'a9d56634be25bbc6d33db7dfb478d9447a8c4491';

function getRepoContributors(repoOwner, repoName, cb) {

  // var requestURL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'Github Avatar Project'
    },
    bearer: GITHUB_TOKEN
  }

  // ...
  request(requestOptions, function (err, response, body) {
      var overallData = JSON.parse(body);

      overallData.forEach(function(overallData) {

        console.log("Avatar URL for ID " + overallData.id + " is " + overallData.avatar_url);

      });

  });

        // .pipe(fs.createWriteStream('./future.jpg'));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});