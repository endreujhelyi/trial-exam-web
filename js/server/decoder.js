exports.decoder = function (text, shift) {
  let decodedText= "";
  let lowerText = text.toLowerCase();
  for (let i = 0; i < lowerText.length; i++) {
    let original = lowerText.charCodeAt(i);
    let shifted = lowerText.charCodeAt(i) + parseInt(shift);

    if (shifted <= 122 && shifted >= 97) {
      decodedText += String.fromCharCode(shifted)
    } else {
      if (original < 97 || original > 122) {
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
