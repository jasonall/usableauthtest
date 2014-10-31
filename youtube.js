var express = require('express');
var router = express.Router();
var fs = require('fs');
var googleapis = require('googleapis');

var scopes = [
  'https://www.googleapis.com/auth/youtube',
];
/* GET yourube listing. */
router.get('/', function(req, res) {

  googleapis.credentials.getApplicationDefault(function(err, creds) {
	  if (err) {
	    res.send('Failed to get application default: ' + String(err));
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

	        res.send('Youtube search failed: %j', err);
	      } else {
	        res.send(result);
	      }
	    });
	  }
	});
});

module.exports = router;
