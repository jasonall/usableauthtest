var fs = require('fs');
var googleapis = require('googleapis');

var scopes = [
  'https://www.googleapis.com/auth/youtube',
];

googleapis.credentials.getApplicationDefault(function(err, creds) {
  if (err) {
    console.log('Failed to get application default: ' + String(err));
  } else {
    var scopedCreds = creds.createScoped(scopes);

    scopedCreds.authorize(function(err, tokens) {
      if (err) {
        console.log('Failed to authorize: ' + String(err));
      } else {
        var youtube = googleapis.youtube({ version: 'v3', auth: scopedCreds });

        // Create a search
        var search = youtube.search.list({
          q: 'cats',
          part: 'snippet',
          maxResults: 50
        }, function (err, result) {
          if (err) {
            console.log('Youtube search failed: ' + String(err));
          } else {
            console.log(result);
          }
        });
      }
    });
  }
});