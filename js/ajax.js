var Ajax = function() {
  this.getCodes = function(callback) {
    this.collector('GET', '/decode/all', null, callback);
  }
  this.addCode = function(data) {
    this.collector('POST', '/decode', data);
  }

  this.collector = function(method, resource, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, 'http://localhost:5000' + resource, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    data = (data) ? JSON.stringify(data) : null;
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (callback != undefined) {
          callback(JSON.parse(xhr.responseText));
        }
      }
    };
  };
};

var ajax = new Ajax();
