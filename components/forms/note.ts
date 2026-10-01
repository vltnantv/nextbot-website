// Hands a note from one page to the /razgovor form (e.g. the package built on /ceni or the task on /studio).
// Kept in sessionStorage - never in the URL, so nothing personal ends up in links or server logs.
const KEY = 'nb-razgovor-note'

export function saveNote(note: string) {
  try {
    if (note.trim()) sessionStorage.setItem(KEY, note.trim().slice(0, 600))
    else sessionStorage.removeItem(KEY)
  } catch {
    // storage blocked (private mode): the form simply starts without a note
  }
}

export function takeNote(): string {
  try {
    return sessionStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function clearNote() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
