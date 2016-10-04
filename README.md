# cli-glob-assist

Uses a given glob pattern to make modifications to a set of glob patterns for convenient cli usage.

## install

```sh
npm install cli-glob-assist
```

## example

```js
const {sync: globAssist} = require('cli-glob-assist')
const {sync: glob} = require('glob')

const globs = globAssist(process.argv.slice(2), '**/*.js')
const files = glob(globs)
```

Here are examples of the way a cli can be used with glob-assist, and how the same result would be achieved without glob-assist. In these examples, glob-assist is called with pattern `**/*.js`

```sh
# with - act on all js files in and nested under current directory
$ cmd
# without
$ cmd **/*.js

# with - act on all js files in and nested under "src" directory
$ cmd src
# without
$ cmd src/**/*.js
```

## API

### globAssist(globs = [], pattern = '', cb)

- `globs: [...globs], []` 0 or more globs or paths
- `pattern: string, ''`
- `cb: (err, globs) => {}` function that receives a prepared array of glob patterns

If `globs` has multiple globs/paths, or `globs` has a single path that isn't a directory, nothing is modified. The result is the same `globs` array that was input.

If there are no globs/paths given, `[pattern]` is returned so that the consumer will get files matching `pattern`.

If there is a single glob/path given and it is a directory, `pattern` will be appended to the directory so that the consumer will get files matching `pattern` under that directory.

### globAssist.sync(globs = [], pattern = '')

- **returns**: `[...globs]`
