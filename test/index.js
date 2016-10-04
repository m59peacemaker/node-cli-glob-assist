const test = require('tape')
const {join: joinPath} = require('path')
const globAssist = require('../')
const globAssistSync = globAssist.sync

test('globAssist - returns [pattern] when passed empty array', t => {
  t.plan(1)
  globAssist([], '**/*.js', (err, globs) => {
    if (err) {
      t.fail(err)
    } else {
      t.deepEqual(globs, ['**/*.js'])
    }
  })
})

test('globAssist.sync - returns [pattern] when passed empty array', t => {
  t.plan(1)
  const globs = globAssistSync([], '**/*.js')
  t.deepEqual(globs, ['**/*.js'])
})


test('globAssist - appends "pattern" to directory path when a single directory is given', t => {
  t.plan(1)
  const fixtureDir = joinPath(__dirname, 'fixtures')
  globAssist([fixtureDir], '**/*.js', (err, globs) => {
    if (err) {
      t.fail(err)
    } else {
      t.deepEqual(globs, [fixtureDir + '/**/*.js'])
    }
  })
})

test('globAssist.sync - appends "pattern" to directory path when a single directory is given', t => {
  t.plan(1)
  const fixtureDir = joinPath(__dirname, 'fixtures')
  const globs = globAssist.sync([fixtureDir], '**/*.js')
  t.deepEqual(globs, [fixtureDir + '/**/*.js'])
})

test('globAssist - nothing is changed when one glob is given and it is not a directory path', t => {
  t.plan(1)
  const arg = ['**']
  globAssist(arg, '**/*.js', (err, globs) => {
    if (err) {
      t.fail(err)
    } else {
      t.deepEqual(globs, arg)
    }
  })
})

test('globAssist.sync - nothing is changed when one glob is given and it is not a directory path', t => {
  t.plan(1)
  const arg = ['**']
  const globs = globAssistSync(arg, '**/*.js')
  t.deepEqual(globs, arg)
})

test('globAssist - nothing is changed when more than one glob is given', t => {
  t.plan(1)
  const fixtureDir = joinPath(__dirname, 'fixtures')
  const arg = [fixtureDir, fixtureDir]
  globAssist(arg, '**/*.js', (err, globs) => {
    if (err) {
      t.fail(err)
    } else {
      t.deepEqual(globs, arg)
    }
  })
})

test('globAssist.sync - nothing is changed when more than one glob is given', t => {
  t.plan(1)
  const fixtureDir = joinPath(__dirname, 'fixtures')
  const arg = [fixtureDir, fixtureDir]
  const globs = globAssistSync(arg, '**/*.js')
  t.deepEqual(globs, arg)
})
