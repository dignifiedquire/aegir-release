'use strict'

const execa = require('execa')

module.exports = (opts) => {
  return [{
    title: 'Check current branch',
    ignore: opts.anyBranch,
    task () {
      return execa
        .stdout('git', ['symbolic-ref', '--short', 'HEAD'])
        .then((branch) => {
          if (branch !== 'master') {
            throw new Error('Not on `master` branch. Use --any-branch to publish anyway.')
          }
        })
    }
  }, {
    title: 'Check local working tree',
    task () {
      return execa
        .stdout('git', ['status', '--porcelain'])
        .then((status) => {
          if (status !== '') {
            throw new Error('Unclean working tree. Commit or stash changes first.')
          }
        })
    }
  }, {
    title: 'Fetch remote changes',
    task () {
      return execa('git', ['fetch'])
    }
  }, {
    title: 'Check remote history',
    task () {
      return execa
        .stdout('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD'])
        .then((result) => {
          if (result !== 0) {
            throw new Error('Remote history differs. Please pull changes.')
          }
        })
    }
  }].filter((t) => !t.ignore)
}
