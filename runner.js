var fs = require('fs');
var googleapis = require('googleapis');

var scopes = [
  'https://www.googleapis.com/auth/youtube',
];

googleapis.credentials.getApplicationDefault(function(err, creds) {
  if (err) {
    console.log('Failed to get application default: ' + String(err));
  } else {
    if (creds.createScopedRequired()) {
      creds = creds.createScoped(scopes);
    }

    var youtube = googleapis.youtube({ version: 'v3', auth: creds });

    // Create a search
    var search = youtube.search.list({
      q: 'cats',
      part: 'snippet',
      maxResults: 50
    }, function (err, result) {
      if (err) {
        console.log(err);
        console.log('Youtube search failed: %j', err);
      } else {
        console.log(result);
      }
    });
  }
});
