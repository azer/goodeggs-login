var request = require("request");
var path = require('path');
var through = require('through');
var pubsub = require('pubsub');

module.exports = auth;

function auth (email, password) {
  var onLogin = pubsub();
  var locked;
  var cookie;

  return start;

  function start () {
    var stream = through();
    var args = arguments;

    if (!cookie) {
      onLogin.subscribe(function (error, newCookie) {
        if (error) return callback(error);
        cookie = newCookie;
        call(stream, args);
      });

      if (!locked) {
        locked = true;
        login(email, password);
      }

      return stream;
    }

    call(stream, args);
  }

  function call (stream, args) {
    var options = args[0];

    if (typeof options == 'string') {
      options = { url: options };
    }

    options.headers || (options.headers = {});

    options.headers.cookie = cookie;

    if (options.url.indexOf('http') == -1) {
      options.url = 'http://' + path.join('www.goodeggs.com/', options.url);
    }

    args[0] = options;

    if (typeof args[args.length -1] != 'function') {
      return request.apply(undefined, args).pipe(stream);  
    }

    return request.apply(undefined, args);
  }

  function login (email, password, callback) {
    var body = { email: email, password: password };

    request.post({ url: 'https://www.goodeggs.com/auth', json: body }, function (error, response) {
      if (error) return onLogin.publish(error);
      onLogin.publish(undefined, response.headers['set-cookie'][0])
    });
  }
}

