# ngx-fancyindex-theme-bootstrap
Bootstrap 4 theme for [NGINX](https://www.nginx.org/) server with [ngx-fancyindex](https://github.com/aperezdc/ngx-fancyindex) module. Minimal, modern and simple.
Comes with a search form (only in current directory)

## Usage

1. Make sure you have the ngx-fancyindex module compiled with NGINX, either by compiling it yourself or installing nginx via the full distribution (package ``nginx-extras`` for Ubuntu or ``nginx-mainline-mod-fancyindex`` from AUR for Arch Linux).
2. Add ``fancyindex on;``, ``fancyindex_header "/_index/header.html";``, ``fancyindex_footer "/_index/footer.html";`` directives to your server ``location { }`` block.
3. Move the ``_index/`` folder to the root of the site directory.
4. Edit links in ``_index/header.html`` and ``_index/footer.html``.
5. Restart/reload NGINX webserver.
6. Check that it's working and enjoy!

## Configuration

A standard config looks something like this:

```
fancyindex on;
fancyindex_localtime on;
fancyindex_exact_size off;
# Specify the path to the header.html and foother.html files (server-wise)
fancyindex_header "/_index/header.html";
fancyindex_footer "/_index/footer.html";
# Ignored files will not show up in the directory listing, but will still be public.
fancyindex_ignore "HideMeFromListing";
# Maximum file name length in bytes, change as you like.
fancyindex_name_length 255;
```

## Examples

Working example can be checked out at [https://files.llorephie.org/](https://files.llorephie.org).

## Tricks
To ignore some directories and files to be publically listed append `.` to beginning of filename.