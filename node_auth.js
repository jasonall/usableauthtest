var fs = require('fs');
var googleapis = require('googleapis');

var CLIENT_ID = '850491353909-vrfaudcricgdqava78eld2812blra5q3.apps.googleusercontent.com';
var CLIENT_SECRET = 'MIICWzCCAcSgAwIBAgIIFTYMd2sGehYwDQYJKoZIhvcNAQEFBQAwUzFRME8GA1UEAxNIODUwNDkxMzUzOTA5LXZyZmF1ZGNyaWNnZHFhdmE3OGVsZDI4MTJibHJhNXEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tMB4XDTE0MTAwMjA1MDAxOFoXDTI0MDkyOTA1MDAxOFowUzFRME8GA1UEAxNIODUwNDkxMzUzOTA5LXZyZmF1ZGNyaWNnZHFhdmE3OGVsZDI4MTJibHJhNXEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNWudooQfJz4r6jMQKr9ZmIKlQst7Ld+CZmaWGB1tkATjVMnlLF9sqckf5+jsnC/8wO4IZfw/GEfuLB9xpBKdYeWGCNCcn/hyi9dXdoeBW4tg9I9S7ma6kcc8zmwfmE9MiQfryqJ+KcDbSiUUg2meRMrBf+8TPx0gxKRUk5fjBCwIDAQABozgwNjAMBgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8EDDAKBggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOBgQAQds57kaMMk1eOYZkEkpCmYN4d4u7O/AGovPfzf3eHfEcCYHTpYZbh+lvZTg7nrrBD4gatRS1nFyjNRSnV29X4s0sOW5GZCAs4V0LYMWduZTTTza/XbgBBnv0fqcCEjR2YBUYVzNWwFy8zs3/t9RTZU/WcEnLxJkwpQUUQk7efdA==';
var REDIRECT_URL = 'www.myexample.com';

var AUTH_EMAIL_ADDRESS = '850491353909-vrfaudcricgdqava78eld2812blra5q3@developer.gserviceaccount.com';
var KEY_FILE_PATH = 'key.pem';
var JSON_FILE_PATH = 'key.json';

var scopes = [
  'https://www.googleapis.com/auth/youtube',
];

// Extract the json from the file.
fs.readFile(JSON_FILE_PATH, function(err, result) {
  if (result) {
    var json = JSON.parse(result);
    if (json) {
      googleapis.credentials.fromJSON(json, function(err, creds) {
        if (err) throw err;

        var auth = creds.createScoped(scopes);

        auth.authorize(function (err, tokens) {
          if (err) throw err;

          //googleapis.options({ auth: credentials });

          var youtube = googleapis.youtube({ version: 'v3', auth: auth });

          // Create a search
          var search = youtube.search.list({
            q: 'cats',
            part: 'snippet',
            maxResults: 50
          }, function (err, result) {
            if (err) throw err;
            console.log(result);
          });
        });
      });
    }
  }
});


