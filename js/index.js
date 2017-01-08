var textarea = document.querySelector('textarea'),
    shift = document.querySelector('input'),
    sendButton = document.querySelector('button'),
    mainList = document.querySelector('ul');


ajax.getCodes(HTMLBuilder);

sendButton.addEventListener('click', function() {
  ajax.addCode({shift: shift.value, text: textarea.value});
  ajax.getCodes(HTMLBuilder);
})


function HTMLBuilder(codes) {
  const allLiTag = mainList.querySelectorAll('li');
  allLiTag.forEach(function(line) {
    mainList.removeChild(line);
  });
  codes.all.forEach(function(text) {
    const newLiTag = document.createElement('li');
    mainList.appendChild(newLiTag).innerHTML = text;
  });
}
