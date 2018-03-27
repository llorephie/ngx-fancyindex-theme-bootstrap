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

var currentDirectory = jQuery(location).attr('protocol') + "//" + jQuery(location).attr('host') + "/";
jQuery.each(jQuery('#nginx-fancyindex-directory').text().split('/'), function(id, directory) {
  if (id == 0) {
    jQuery('<li />', {
      class: "breadcrumb-item"
    }).append(
      jQuery('<a />', {
        href: currentDirectory,
        text: "(root)"
      })
    ).appendTo("#breadcrumbs");
  } else {
    jQuery('<li />', {
      class: "breadcrumb-item"
    }).append(
      jQuery('<a />', {
        href: currentDirectory + directory + "/" ,
        text: directory
      })
    ).appendTo("#breadcrumbs");
    currentDirectory = currentDirectory + directory + "/";
  }
});
