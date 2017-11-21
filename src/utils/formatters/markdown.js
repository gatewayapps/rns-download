import _ from 'lodash'

export default function toMarkdown (releaseNotes, locale = 'en-US') {
  if (!Array.isArray(releaseNotes) || releaseNotes.length === 0) {
    return
  }

  let content = []
  const releaseCount = releaseNotes.length

  releaseNotes.forEach((rn) => {
    const notes = rn.notes.filter((n) => n.locale.toLowerCase() === locale.toLowerCase())
    if (notes.length === 0) {
      return
    }

    const note = notes[0]

    if (!Array.isArray(note.items) && !note.items.length > 0) {
      return
    }

    if (releaseCount > 1) {
      let releaseHeader = `## ${rn.version}`
      if (rn.name) {
        releaseHeader += `: ${rn.name}`
      }
      content.push(releaseHeader)
    }

    if (note.header) {
      content.push(note.header)
      content.push('')
    }

    note.items.forEach((item) => {
      let itemNote = '- '
      if (Array.isArray(item.tags) && item.tags.length > 0) {
        itemNote += `**${item.tags.map((t) => _.startCase(t)).join(' / ')}** - `
      }
      itemNote += item.description.replace(/^(\s*)-/gm, '$1  -')
      content.push(itemNote)
    })
    content.push('')
  })

  return content.join('\n')
}
