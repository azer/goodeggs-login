## goodeggs-login

Auth GoodEggs with e-mail and password. Returns a [request](http://github.com/mikeal/request) wrapper with authenticated user 

## Install

```bash
$ npm install goodeggs-login
```

## Usage

```js
login = require('goodeggs-login')

azer = login('azer@kodfabrik.com', '123456')

azer({ url: 'basket?sanitize=true', json: true }).stream(process.stdout)
// => { user: { .. }, items: [] }
```

Run `example.js` to see it working.
