var contentTable = document.getElementById('list');
contentTable.setAttribute('class', 'table table-hover');

var listItems = [].slice.call(document.querySelectorAll('#list tbody tr'));

var input = document.getElementById('search');
input.addEventListener('keyup', function () {
    var i,
        e = "^(?=.*\\b" + this.value.trim().split(/\s+/).join("\\b)(?=.*\\b") + ").*$",
        n = RegExp(e, "i");
    listItems.forEach(function(item) {
        item.removeAttribute('hidden');
    });
    listItems.filter(function(item) {
        i = item.querySelector('td').textContent.replace(/\s+/g, " ");
        return !n.test(i);
    }).forEach(function(item) {
  	    item.hidden = true;
    });
});

var breadcrumbs = document.getElementById('breadcrumbs');
var currentDirectory = location.protocol + "//" + location.host + "/";
document.getElementById('nginx-fancyindex-directory').textContent.split('/').forEach(function(directory, id) {
  var li = document.createElement('li');
  li.setAttribute('class', 'breadcrumb-item');
  var a = document.createElement('a');
  if (id == 0) {
    a.setAttribute('href', currentDirectory);
    a.textContent = "(root)";
  } else {
    currentDirectory = currentDirectory + directory + "/";
    a.setAttribute('href', currentDirectory);
    a.textContent = directory;
  }
  li.appendChild(a);
  breadcrumbs.appendChild(li);
});
