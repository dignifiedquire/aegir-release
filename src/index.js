'use strict'

const semver = require('semver')
const readPkgUp = require('read-pkg-up')

const gitTasks = require('./git-tasks')
const mainTasks = require('./main-tasks')

const VERSIONS = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease', 'auto']

module.exports = (input, opts) => {
  input = input || 'auto'
  opts = opts || {}

  if (VERSIONS.indexOf(input) === -1 && !semver.valid(input)) {
    return Promise.reject(
      new Error(
        `Version should be either ${VERSIONS.join(', ')}, or a valid semver version.`
      )
    )
  }

  const tasks = [{
    title: 'Git',
    task () {
      return gitTasks(opts)
    }
  }].concat(mainTasks(opts, input))


  const listr = new Listr(tasks, {
    showSubtasks: false
  })

  return listr.run()
    .then(() => readPkgUp())
    .then((result) => result.pkg)
}
