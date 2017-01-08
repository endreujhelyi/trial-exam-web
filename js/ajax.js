var Ajax = function() {
  this.getCodes = function(callback) {
    this.collector('GET', '/decode/all', null, callback);
  }
  this.addCode = function(callback, data) {
    this.collector('POST', '/decode', data, callback);
  }

  this.collector = function(method, resource, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, 'http://localhost:3000' + resource, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    data = (data) ? JSON.stringify(data) : null;
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          actualList = JSON.parse(xhr.responseText);
          callback(actualList);
      }
    };
  };
};

var ajax = new Ajax();
