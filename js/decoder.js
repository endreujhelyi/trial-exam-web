var decoder = function(text, shift) {
  var decodedText= "";
  var lowerText = text.toLowerCase();
  for (var i = 0; i < lowerText.length; i++) {
    var shifted = lowerText.charCodeAt(i) + shift;

    if (shifted <= 122 && shifted >= 97) {
      decodedText += String.fromCharCode(shifted)
    } else {
      if (shifted < 61 - 25 || shifted > 122 + 25) {
        decodedText += lowerText[i];
      } else if (shifted > 122) {
          var code = shifted % 122;
          decodedText += String.fromCharCode(97 + code);
      } else {
          code = 97 - shifted;
          decodedText += String.fromCharCode(122 - code);
      }
    }
  }
  return decodedText;
}


decoder.get('/decode/all', function getid(req, resp) {
  con.query('SELECT decoded FROM texts', function(err,rows){
    if(err) {
      console.log(err.toString());
      return;
    }
    var all_texts = [];
    for (var i = 0; i < rows.length; i++){
      all_texts.push(rows[i].decoded);
    }
    resp.status(200).send({all: all_texts});
  });
});
