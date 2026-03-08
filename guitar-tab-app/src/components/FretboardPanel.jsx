import { useState } from 'react'
import styles from './FretboardPanel.module.css'

const STRINGS = ['E', 'B', 'G', 'D', 'A', 'E'] // high to low
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const OPEN_NOTES = [4, 11, 7, 2, 9, 4] // E4 B3 G3 D3 A2 E2 in NOTES index

const FRET_MARKERS = [3, 5, 7, 9, 12]
const NUM_FRETS = 13

function noteAt(stringIdx, fret) {
  return NOTES[(OPEN_NOTES[stringIdx] + fret) % 12]
}

const NOTE_COLORS = {
  'A': '#7c6af7', 'A#': '#9b59b6',
  'B': '#4ecdc4',
  'C': '#ff6b6b', 'C#': '#e74c3c',
  'D': '#ffd93d', 'D#': '#f39c12',
  'E': '#51cf66',
  'F': '#ff922b', 'F#': '#e67e22',
  'G': '#74c0fc', 'G#': '#3498db',
}

export default function FretboardPanel({ track }) {
  const [mode, setMode] = useState('scale') // scale | chords
  const [activeScale, setActiveScale] = useState(0)

  const scaleNotes = track.scales[activeScale]?.notes ?? []

  return (
    <div className={styles.panel}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${mode === 'scale' ? styles.active : ''}`}
          onClick={() => setMode('scale')}
        >Gamme</button>
        <button
          className={`${styles.tab} ${mode === 'chords' ? styles.active : ''}`}
          onClick={() => setMode('chords')}
        >Accords</button>
      </div>

      {mode === 'scale' && (
        <div className={styles.scaleSelect}>
          {track.scales.map((s, i) => (
            <button
              key={i}
              className={`${styles.scaleBtn} ${activeScale === i ? styles.active : ''}`}
              onClick={() => setActiveScale(i)}
            >
              {s.name.split(' ').slice(-1)[0]}
            </button>
          ))}
        </div>
      )}

      <div className={styles.fretboardWrap}>
        <div className={styles.fretboard}>
          {/* Fret markers */}
          <div className={styles.markers}>
            {Array.from({ length: NUM_FRETS }, (_, f) => (
              <div key={f} className={styles.markerCell}>
                {FRET_MARKERS.includes(f) && (
                  <div className={`${styles.marker} ${f === 12 ? styles.double : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Strings */}
          {STRINGS.map((openNote, si) => (
            <div key={si} className={styles.string}>
              <div className={styles.openString}>{openNote}</div>
              {Array.from({ length: NUM_FRETS }, (_, f) => {
                const note = noteAt(si, f)
                const isRoot = note === track.keyRoot
                const inScale = scaleNotes.includes(note)
                return (
                  <div key={f} className={styles.fretCell}>
                    <div className={styles.stringLine} />
                    {inScale && (
                      <div
                        className={`${styles.dot} ${isRoot ? styles.root : ''}`}
                        style={isRoot
                          ? { background: NOTE_COLORS[note], boxShadow: `0 0 8px ${NOTE_COLORS[note]}` }
                          : { background: NOTE_COLORS[note] + 'bb' }
                        }
                        title={note}
                      >
                        {note}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Fret numbers */}
          <div className={styles.fretNumbers}>
            {Array.from({ length: NUM_FRETS }, (_, f) => (
              <div key={f} className={styles.fretNum}>{f === 0 ? '' : f}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendDotRoot} /> Tonique ({track.keyRoot})
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} /> Notes de la gamme
        </div>
      </div>
    </div>
  )
}
