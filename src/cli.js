'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const release = require('./')

const cli = meow(`
  Usage
    $ release <version>

    Version can be:
      patch | minor | major | prepatch | preminor | premajor | prerelease | 1.2.3

  Options
    --any-branch    Allow publishing from any branch
    --skip-cleanup  Skips cleanup of node_modules
    --preview       Just generate the changelog and display it

	Examples
	  $ release
	  $ release 1.0.2
`)

updateNotifier({pkg: cli.pkg}).notify()

release(cli.input[0], cli.flags)
  .then((pkg) => {
    console.log(`\n ${pkg.name} ${pkg.version} published`)
  })
  .catch((err) => {
    console.error('\n${err.message}')
    process.exit(1)
  })
