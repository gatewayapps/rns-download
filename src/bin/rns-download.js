#!/usr/bin/env node
import yargs from 'yargs'
import download from '../utils/download'
import writer from '../utils/writer'

const argv = yargs
  .options({
    projectId: {
      alias: 'p',
      demandOption: true,
      type: 'string'
    },
    version: {
      alias: 'v',
      demandOption: true,
      type: 'string'
    },
    scope: {
      alias: 's',
      type: 'string',
      default: 'patch',
      choices: ['major', 'minor', 'patch']
    },
    locale: {
      alias: 'l',
      type: 'string',
      default: 'en-US',
      describe: 'Locale of the release notes include in the generated output file. Does not apply to the "json" format.'
    },
    format: {
      alias: 'f',
      default: 'md',
      type: 'string',
      choices: ['md', 'json']
    },
    outFile: {
      alias: 'o',
      type: 'string',
      demandOption: true,
      describe: 'output file to save release notes content'
    },
    help: {
      alias: 'h'
    }
  })
  .help('h')
  .argv

download(argv.projectId, argv.version, argv.scope)
  .then((releaseNotes) => {
    if (Array.isArray(releaseNotes) && releaseNotes.length > 0) {
      return writer(releaseNotes, argv.locale, argv.format, argv.outFile)
    } else {
      console.log('No release notes found.')
    }
  })
  .catch((error) => {
    console.error(error)
  })
