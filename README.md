## ⚠️ **Final Update:** Hi folks. I created this library over 10 years ago in 2012 but I do not maintain it. This repository is archived. For a maintained version of smaz compression in Javascript, please look instead to the version provided by @remusao instead in npm as https://www.npmjs.com/package/@remusao/smaz. Thank you. 



-----
-----
-----
-----
-----
-----




SMAZ.js
-------

See http://github.com/antirez/smaz for information on smaz and the algorithm itself.

**Live Demo:** http://personalcomputer.github.com/smaz.js/

## Usage

### In browser:

```javascript
var c = smaz.compress("string");
var u = smaz.decompress(c);
```

### In node.js:

#### Installation

```bash
$ npm install smaz
```

#### How to use

```
var smaz = require("smaz");
var c = smaz.compress("string");
var u = smaz.decompress(c);
```

Compressed binary data is stored using JavaScript ArrayBuffers.

CREDITS AND LICENSE
-------------------

Small was written by Salvatore Sanfilippo and is released under the BSD license. Check the COPYING file for more information. smaz.js was written by personalcomputer and is a derivative work also under the BSD license.
