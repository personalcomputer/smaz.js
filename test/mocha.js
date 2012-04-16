var smaz = require('../index');

var strings = [
  "This is a small string",
  "foobar",
  "the end",
  "Smaz is a simple compression library",
  "Nothing is more difficult, and therefore more precious, than to be able to decide",
  "this is an example of what works very well with smaz",
  "1000 numbers 2000 will 10 20 30 compress very little",
  "and now a few italian sentences:",
  "Nel mezzo del cammin di nostra vita, mi ritrovai in una selva oscura",
  "Mi illumino di immenso",
  "L'autore di questa libreria vive in Sicilia",
  "try it against urls",
  "http://google.com",
  "http://programming.reddit.com",
  "http://github.com/antirez/smaz/tree/master"
];

describe('smaz', function(){

  strings.forEach(function(str, i){

    var cm = smaz.compress(str);
    var dc = smaz.decompress(cm);

    // Compression
    describe('.compress', function(){
      it('should always return a positive number', function(){
        var comprlen = cm.length;
        var comprlevel = Math.round(100-((100*comprlen)/str.length));
        comprlevel.should.be.above(0);
      });
    });

    // Decompression
    describe('.decompress', function(){
      it('should always return string that is equal to input', function(){
        dc.should.be.equal(str);
      });
    });
  });

  // Bad example
  describe(".compress", function(){
    it('should always return a negative number', function(){
      var str = "not-a-g00d-Exampl333";
      var cm = smaz.compress(str);
      var comprlen = cm.length;
      var comprlevel = Math.round(100-((100*comprlen)/str.length));
      comprlevel.should.be.below(0);
    });
  });

  // Random compress/decompress
  describe("random compress/decompress", function(){
    var times = 100;
    for(testn = 0; testn < times; testn++) {
      var ranlen = Math.floor(Math.random()*512);
      var input = '', i;
      for(i = 0; i < ranlen; i++) {
        input += String.fromCharCode(Math.floor(Math.random()*256));
      }
      var out = smaz.compress(input);
      var decompr = smaz.decompress(out);
      it('decompressed output value should always equal input value', function(){
        ranlen.should.be.equal(decompr.length);
        decompr.should.be.equal(input);
      });
    }
  });

});