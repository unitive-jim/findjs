findjs
------

`findjs -- walk a file hierarchy`

`findjs` is a CLI tool modeled after the unix tool `FIND(1)`. It can walk a file hierarchy and print to stdout the names of all files that satisfy some simple filters. The unix tool `find` can do anything `findjs` can do, and I expect few developers will want to use this `findjs` instead of `find`.

I wrote `findjs` simply to have a tool with the default filter options that I use regularly in my current development. Those defaults are:

1. Return only javascript files, i.e files with the extension `.js`.
2. Do not search within any `node_modules` directory.
3. Do not search within any `.git` directory.

One common way I use `findjs` is to pipe its output into the tool `xargs grep <pattern>`:

```
$ findjs src | xargs grep someFunctionName
```

I may soon extend `findjs` so that it can perform the `xargs grep` function, with something like:

```
$ findjs src -g someFunctionName
```


