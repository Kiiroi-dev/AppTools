// Music theory utilities for TabLab

export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Interval patterns (semitones)
const SCALE_PATTERNS = {
  major:              [0, 2, 4, 5, 7, 9, 11],
  minor:              [0, 2, 3, 5, 7, 8, 10],
  harmonicMinor:      [0, 2, 3, 5, 7, 8, 11],
  melodicMinor:       [0, 2, 3, 5, 7, 9, 11],
  pentatonicMajor:    [0, 2, 4, 7, 9],
  pentatonicMinor:    [0, 3, 5, 7, 10],
  blues:              [0, 3, 5, 6, 7, 10],
}

const SCALE_LABELS = {
  major: 'Majeure',
  minor: 'Mineure naturelle',
  harmonicMinor: 'Mineure harmonique',
  melodicMinor: 'Mineure mélodique',
  pentatonicMajor: 'Pentatonique majeure',
  pentatonicMinor: 'Pentatonique mineure',
  blues: 'Blues',
}

export function noteIndex(note) {
  return ALL_NOTES.indexOf(note)
}

export function getScale(root, scaleType) {
  const rootIdx = noteIndex(root)
  if (rootIdx === -1) return []
  const pattern = SCALE_PATTERNS[scaleType]
  if (!pattern) return []
  return pattern.map(interval => ALL_NOTES[(rootIdx + interval) % 12])
}

export function getScalesForKey(root, mode) {
  if (mode === 'minor') {
    return [
      { key: 'minor', name: `${root} Mineure naturelle`, notes: getScale(root, 'minor') },
      { key: 'harmonicMinor', name: `${root} Mineure harmonique`, notes: getScale(root, 'harmonicMinor') },
      { key: 'pentatonicMinor', name: `${root} Pentatonique mineure`, notes: getScale(root, 'pentatonicMinor') },
      { key: 'blues', name: `${root} Blues`, notes: getScale(root, 'blues') },
    ]
  }
  return [
    { key: 'major', name: `${root} Majeure`, notes: getScale(root, 'major') },
    { key: 'pentatonicMajor', name: `${root} Pentatonique majeure`, notes: getScale(root, 'pentatonicMajor') },
    { key: 'minor', name: `${root} Mineure relative`, notes: getScale(ALL_NOTES[(noteIndex(root) + 9) % 12], 'minor') },
  ]
}

// Guitar standard tuning: E2 A2 D3 G3 B3 E4 (low to high)
export const STANDARD_TUNING = [
  { note: 'E', octave: 4 },  // string 1 (high E)
  { note: 'B', octave: 3 },  // string 2
  { note: 'G', octave: 3 },  // string 3
  { note: 'D', octave: 3 },  // string 4
  { note: 'A', octave: 2 },  // string 5
  { note: 'E', octave: 2 },  // string 6 (low E)
]

export const OPEN_NOTE_INDICES = STANDARD_TUNING.map(s => noteIndex(s.note))

export function noteAtFret(stringIdx, fret) {
  return ALL_NOTES[(OPEN_NOTE_INDICES[stringIdx] + fret) % 12]
}

// Common chord shapes: [E2, A2, D3, G3, B3, E4] frets, null = muted
export const CHORD_SHAPES = {
  'A':  [null, 0, 2, 2, 2, 0],
  'Am': [null, 0, 2, 2, 1, 0],
  'A7': [null, 0, 2, 0, 2, 0],
  'B':  [null, 2, 4, 4, 4, 2],
  'Bm': [null, 2, 4, 4, 3, 2],
  'C':  [null, 3, 2, 0, 1, 0],
  'C#m':[null, 4, 6, 6, 5, 4],
  'D':  [null, null, 0, 2, 3, 2],
  'Dm': [null, null, 0, 2, 3, 1],
  'D7': [null, null, 0, 2, 1, 2],
  'E':  [0, 2, 2, 1, 0, 0],
  'Em': [0, 2, 2, 0, 0, 0],
  'E7': [0, 2, 0, 1, 0, 0],
  'F':  [1, 3, 3, 2, 1, 1],
  'F#m':[2, 4, 4, 2, 2, 2],
  'G':  [3, 2, 0, 0, 0, 3],
  'G7': [3, 2, 0, 0, 0, 1],
  'Ab': [4, 6, 6, 5, 4, 4],
  'Bb': [null, 1, 3, 3, 3, 1],
  'Eb': [null, null, 1, 3, 4, 3],
}

// All chord names for autocomplete
export const ALL_CHORD_NAMES = [
  'A', 'Am', 'A7', 'Amaj7', 'Am7',
  'Bb', 'Bbm', 'B', 'Bm', 'B7',
  'C', 'Cm', 'C7', 'Cmaj7', 'C#m',
  'D', 'Dm', 'D7', 'Dmaj7', 'Dm7',
  'Eb', 'Ebm', 'E', 'Em', 'E7',
  'F', 'Fm', 'F#', 'F#m', 'F7',
  'G', 'Gm', 'G7', 'Gmaj7', 'G#', 'Ab',
]

export const NOTE_COLORS = {
  'A': '#7c6af7', 'A#': '#9b59b6',
  'B': '#4ecdc4',
  'C': '#ff6b6b', 'C#': '#e74c3c',
  'D': '#ffd93d', 'D#': '#f39c12',
  'E': '#51cf66',
  'F': '#ff922b', 'F#': '#e67e22',
  'G': '#74c0fc', 'G#': '#3498db',
  'Bb': '#9b59b6', 'Db': '#e74c3c', 'Eb': '#f39c12', 'Gb': '#e67e22', 'Ab': '#3498db',
}
