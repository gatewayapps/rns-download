import Promise from 'bluebird'
import fs from 'fs-extra'
import path from 'path'
import toJson from './formatters/json'
import toMarkdown from './formatters/markdown'

Promise.promisifyAll(fs)

export default function writeReleaseNotes (releaseNotes, locale, format, outputFile) {
  try {
    let content

    switch (format.toLowerCase()) {
      case 'json':
        content = toJson(releaseNotes)
        break

      case 'md':
        content = toMarkdown(releaseNotes, locale)
        break

      default:
        throw new Error(`Unsupported format: ${format}`)
    }

    return writeFile(content, outputFile)
  } catch (e) {
    return Promise.reject(e)
  }
}

function writeFile (content, outputFile) {
  outputFile = path.resolve(outputFile)
  const outputDir = path.dirname(outputFile)
  fs.ensureDirSync(outputDir)
  return fs.writeFileAsync(outputFile, content)
}
