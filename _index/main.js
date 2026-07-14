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

var previewExtensions = {
    image: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'avif'],
    video: ['mp4', 'webm', 'ogv', 'mov'],
    audio: ['mp3', 'wav', 'ogg', 'flac', 'm4a']
};

function getPreviewType(href) {
    var ext = href.split(/[#?]/)[0].split('.').pop().toLowerCase();
    for (var type in previewExtensions) {
        if (previewExtensions[type].indexOf(ext) !== -1) {
            return type;
        }
    }
    return null;
}

var previewModalEl = document.getElementById('previewModal');
if (previewModalEl && window.bootstrap) {
    var previewModal = new bootstrap.Modal(previewModalEl);
    var previewTitle = document.getElementById('previewModalLabel');
    var previewBody = document.getElementById('previewModalBody');

    listItems.forEach(function (item) {
        var link = item.querySelector('td a');
        if (!link) {
            return;
        }
        var type = getPreviewType(link.getAttribute('href'));
        if (!type) {
            return;
        }
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-sm btn-link preview-toggle';
        button.setAttribute('aria-label', 'Preview ' + link.textContent.trim());
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>';
        button.addEventListener('click', function (link, type) {
            return function (event) {
                event.preventDefault();
                previewTitle.textContent = link.textContent.trim();
                previewBody.innerHTML = '';
                var media;
                if (type === 'image') {
                    media = document.createElement('img');
                    media.className = 'img-fluid';
                } else {
                    media = document.createElement(type);
                    media.className = 'w-100';
                    media.controls = true;
                }
                media.src = link.href;
                previewBody.appendChild(media);
                previewModal.show();
            };
        }(link, type));
        link.parentNode.insertBefore(button, link.nextSibling);
    });

    previewModalEl.addEventListener('hidden.bs.modal', function () {
        previewBody.innerHTML = '';
    });
}
