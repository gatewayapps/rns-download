export default function toJson (releaseNotes) {
  if (!Array.isArray(releaseNotes) || releaseNotes.length === 0) {
    return
  }

  return JSON.stringify(releaseNotes, null, 2)
}
