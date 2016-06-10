findjs
------

`findjs -- Walk a file hierarchy, listing or grepping matching files`

`findjs` is a CLI tool modeled after the unix tools `FIND(1)` and `GREP(1)`. Like `find`, it can walk a file hierarchy and print to stdout the names of all files that satisfy some simple filters. `findjs` can also run `egrep` on each file.

`findjs` can't do anything that can't be done with `find` and `grep`, but it has some simple defaults that make it more convenient for `node` development. Those defaults are:

1. Return only javascript files, i.e files with the extension `.js`.
2. Do not search within any `node_modules` directory.
3. Do not search within any `.git` directory.

These defaults can be overridden using the options `--file-match` and `--dir-match`.

Examples
--------

List all `.js` files under the current directory, but omitting the `.git` and `node_modules` directories:

```
$ findjs
index.js
lib/descendents.js
```

Grep all `.js` files under the current directory for a pattern:

```
$ findjs -g exports
index.js
1:module.exports = require('./lib/descendents.js');

lib/descendents.js
69:module.exports = {
```

List all `.js` files containing a pattern (like `grep -l`):

```
$ findjs -m function
lib/descendents.js
```

USAGE
-----

```
  Usage: findjs [options] [path...]

  Walk a file hierarchy, listing or grepping matching files

  Options:

    -h, --help                  output usage information
    -f, --file-match [pattern]  Include files that match pattern
    -d, --dir-match [pattern]   Exclude directories matching pattern
    -g, --grep [pattern]        Instead of listing files, grep each file for pattern
    -m, --match [pattern]       Only list files which contain pattern (grep -l)
```
