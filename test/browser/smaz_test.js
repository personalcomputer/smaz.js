var strings = [
  "This is a small string",
  "foobar",
  "the end",
  "not-a-g00d-Exampl333",
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

var test_times = 1000; //1000x less than in the native version.

function test_smaz() {
  var i;
  for(i = 0; i < strings.length; i++) {
    var comprlen = smaz.compress(strings[i]).length;
    var comprlevel = Math.round(100-((100*comprlen)/strings[i].length));
    if(comprlevel < 0) {
      document.write("\"<tt>"+strings[i]+"</tt>\" enlarged by "+-comprlevel+"%</br>");
    } else {
      document.write("\"<tt>"+strings[i]+"</tt>\" compressed by "+comprlevel+"%</br>");
    }
  }
}

function test_smaz_2() {
  var testn;
  for(testn = 0; testn < test_times; testn++) {
    var ranlen = Math.floor(Math.random()*512);
    var test_input = '';
    var i;
    for(i = 0; i < ranlen; i++) {
      test_input += String.fromCharCode(Math.floor(Math.random()*256));
    }
    
    var out = smaz.compress(test_input);
    var decompr = smaz.decompress(out);

    if(ranlen != decompr.length || decompr != test_input) {
      console.log(ranlen, decompr.length);
      console.log(decompr);
      console.log(test_input);
      alert("Test failed. :( If you don't mind, could you report the contents of the javascript console and your browser version to me at https://github.com/personalcomputer/smas.js? Thank you.");
    }
  }
  alert("Test passed :)");
}