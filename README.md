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
