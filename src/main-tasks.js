'use strict'

const del = require('del')

const exec = require('./exec')

module.exports = (opts, input) => {
  return [{
    title: 'Cleanup',
    ignore: opts.skipCleanup,
    task () {
      return del('node_modules')
    }
  }, {
    title: 'Installing dependencies',
    ignore: opts.skipCleanup,
    task () {
      return exec('npm', ['install'])
    }
  }, {
    title: 'Run tests',
    task () {
      return exec('npm', ['test'])
    }
  }, {
    title: 'Determine version',
    ignore: input !== 'auto',
    task () {
      // TODO: use recommended-bump to figure out a suggested new version
      // and let the user confirm
    }
  }, {
    title: 'Bumping version',
    task () {
      // TODO: bump version in package.json
    }
  }, {
    title: 'Generate changelog',
    task () {
      // TODO: write this task
      // 1. generate base version
      // 2. open editor and give the user a way to edit and safe and resume
    }
  }, {
    title: 'Commit to git',
    task () {
    }
  }, {
    title: 'Create git tag',
    task () {

    }
  }, {
    title: 'Publish package to npm',
    task () {
      return exec('npm', ['publish'])
    }
  }, {
    title: 'Publish to github',
    task () {
      exec('git', ['push', '--follow-tags'])
    }
  }, {
    title: 'Creating github release',
    task () {
      // TODO: use conventional-github-release
      // important make it so that changes to the changelog.md file are reflected
      // in the release text.
    }
  }].filter((t) => !t.ignore)
}
