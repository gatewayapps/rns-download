import download from './utils/download'
import toJson from './utils/formatters/json'
import toMarkdown from './utils/formatters/markdown'

export default {
  getReleaseNotes
}

export function getReleaseNotes (projectId, version, options) {
  try {
    const opts = verifyOptions(options)
    return download(projectId, version, opts.scope)
      .then((releaseNotes) => {
        switch (opts.format.toLowerCase()) {
          case 'json':
            return toJson(releaseNotes)

          case 'md':
            return toMarkdown(releaseNotes, opts.locale)

          default:
            throw new Error(`Unsupported format: ${opts.format}`)
        }
      })
  } catch (e) {
    return Promise.reject(e)
  }
}

function verifyOptions (options) {
  const opts = Object.assign({}, options)

  if (!opts.scope) {
    opts.scope = 'patch'
  }

  if (!opts.locale) {
    opts.locale = 'en-US'
  }

  if (!opts.format) {
    options.format = 'md'
  }

  return opts
}
