# ngx-fancyindex-theme-bootstrap
Bootstrap 5 theme for [NGINX](https://www.nginx.org/) server with [ngx-fancyindex](https://github.com/aperezdc/ngx-fancyindex) module. Minimal, modern and simple. No jQuery required.
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

A static demo with a mocked directory listing (including the media preview feature below) is hosted on GitHub Pages: [https://llorephie.github.io/ngx-fancyindex-theme-bootstrap/](https://llorephie.github.io/ngx-fancyindex-theme-bootstrap/). Its source is `index.html` in the repository root.

## Media preview
Files with a recognized image (`png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `bmp`, `avif`), video (`mp4`, `webm`, `ogv`, `mov`) or audio (`mp3`, `wav`, `ogg`, `flac`, `m4a`) extension get a small preview icon next to their name. Clicking it opens the file inline in a modal using the browser's native `<img>`/`<video>`/`<audio>` elements &mdash; no extra JS library involved.

## Per-directory templates
`header.html` and `footer.html` already support overriding the default header/footer on a per-directory basis, without needing to check for the custom file's existence yourself. They use NGINX's SSI `include ... stub="..."` directive:

```
<!--# include virtual="$request_uri/.directory_index.html" stub="default_index" -->
```

If `.directory_index.html` (or `.directory_footer.html`) exists in the current directory, its content is included; if it doesn't (or the request fails), NGINX falls back to rendering the named `stub` block (`default_index`/`default_footer`) defined above it. Just drop a `.directory_index.html` and/or `.directory_footer.html` file into any directory you want to customize.

## Tricks
To ignore some directories and files to be publically listed append `.` to beginning of filename.