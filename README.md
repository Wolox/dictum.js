# Dictum.js
[![Build Status](https://travis-ci.org/Wolox/dictum.js.svg)](https://travis-ci.org/Wolox/dictum.js)
[![Coverage Status](https://coveralls.io/repos/Wolox/dictum.js/badge.svg?branch=master)](https://coveralls.io/r/Wolox/dictum.js?branch=master)

Create automatic documentation of your NodeJS API endpoints.

## Installation

#### NPM

```bash
$ npm install --save-dev dictum.js
```

#### Yarn

```bash
$ yarn add --dev dictum.js
```

## Basic usage

The first step is to create a file in which we'll document our endpoints. So let's do that in `documentation.js`:

```node
var dictum = require('dictum.js');

// For every endpoints
dictum.document({
  description: 'Some description for the given endpoint',
  endpoint: '/some/endpoint',
  method: 'GET',
  requestHeaders: { /* headers for endpoint */ },
  requestPathParams: { /* path params for endpoint */ },
  requestBodyParams: { /* body params for endpoint */ },
  responseStatus: 200,
  responseHeaders: { /* headers for response */ },
  responseBody: { /* body params for response */ },
  resource: 'My Resource'
});
```

Second and last step, execute the created file to generate our html documentation in `./docs/index.html` like the following:

```bash
$ node documentation.js
```

## Easier usage

### Chai

If you pay attention to the basic usage, you will notice that it is a lot of boilerplate if your API has a lot of endpoints, this is not DRY. Luckily you can omit most of it when testing with chai:

```node
const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  should = chai.should();

describe('/some/endpoint GET', () => {
  it('should fail login because of invalid username', () => {
    chai.request(server)
      .post('/some/endpoint')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        dictum.chai(res, 'description for endpoint');
      });
    });
});
```
See the important line here:

```node
dictum.chai(res, 'description for endpoint');
```

Using `chai` returned `res` object will supply all the information we need to address the given endpoint. Optionally, we can provide a second parameter containing a description for it.

Then, documentation will be created when running our tests.

## Some other useful configurations

#### Markdown syntax instead of HTML? Change the formatter:

```node
dictum.setFormatter('markdown'); // default: 'html'
```

#### Publishing docs when using Express? Add:

```node
var express = require('express'),
  path = require('path'),
  app = express();

app.use('/docs', express.static(path.join(__dirname, 'docs')));
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
5. Run tests (`npm test`)
6. Push your branch (`git push origin my-new-feature`)
7. Create a new Pull Request

## About ##

This project is maintained by [Michel Agopian](https://github.com/mishuagopian) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**dictum.js** is available under the MIT [license](https://raw.githubusercontent.com/Wolox/dictum.js/master/LICENSE.md).

    Copyright (c) 2017 Wolox

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
