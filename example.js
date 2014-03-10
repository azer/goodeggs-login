var login = require("./");

var req = login(process.argv[2], process.argv[3]);

req({ url: 'basket\?sanitize\=true', json: true }).pipe(process.stdout);

req({ url: 'basket\?sanitize\=true', json: true }, function (_, _, data) {
  console.log(data)
})

