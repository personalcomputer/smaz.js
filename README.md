SMAZ.js
-------

See http://github.com/antirez/smaz for information on smaz and the algorithm itself.

USAGE
-----

var c = smaz.compress("string");
var u = smaz.decompress(c);

Compressed binary data is stored using Javascript ArrayBuffers.

CREDITS
-------

Small was written by Salvatore Sanfilippo and is released under the BSD license. Check the COPYING file for more information. smaz.js was written by personalcomputer and is a derivative work also under the BSD license.
