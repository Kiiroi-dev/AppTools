import { useState } from 'react'
import { noteAtFret, NOTE_COLORS, STANDARD_TUNING } from '../musicTheory'
import styles from './FretboardPanel.module.css'

const NUM_FRETS = 15
const FRET_MARKERS = [3, 5, 7, 9, 12, 15]
const NUM_STRINGS = 6

export default function FretboardPanel({ track }) {
  const [activeScale, setActiveScale] = useState(0)

  const scaleNotes = track.scales[activeScale]?.notes ?? []

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Manche</h3>

      {/* Scale selector */}
      <div className={styles.scaleSelector}>
        {track.scales.map((s, i) => (
          <button
            key={s.key}
            className={`${styles.scaleBtn} ${activeScale === i ? styles.active : ''}`}
            onClick={() => setActiveScale(i)}
          >
            <span className={styles.scaleName}>{s.name}</span>
            <span className={styles.scalePreview}>
              {s.notes.slice(0, 4).join(' ')}...
            </span>
          </button>
        ))}
      </div>

      {/* Vertical fretboard */}
      <div className={styles.fretboardScroll}>
        <div className={styles.fretboard}>
          {/* String labels at top */}
          <div className={styles.stringLabelsRow}>
            <div className={styles.fretLabel} />
            {STANDARD_TUNING.map((s, si) => (
              <div key={si} className={styles.stringLabel}>
                {s.note}{si === 0 || si === 5 ? '' : ''}
              </div>
            ))}
          </div>

          {/* Frets — each row is one fret, going top (nut) to bottom */}
          {Array.from({ length: NUM_FRETS + 1 }, (_, fret) => {
            const isMarker = FRET_MARKERS.includes(fret)
            const isNut = fret === 0
            return (
              <div key={fret} className={`${styles.fretRow} ${isNut ? styles.nutRow : ''}`}>
                <div className={`${styles.fretLabel} ${isMarker ? styles.markerLabel : ''}`}>
                  {fret === 0 ? '' : fret}
                  {isMarker && fret !== 0 && <span className={styles.markerDot}>●</span>}
                </div>
                {Array.from({ length: NUM_STRINGS }, (_, si) => {
                  const note = noteAtFret(si, fret)
                  const inScale = scaleNotes.includes(note)
                  const isRoot = note === track.keyRoot
                  const color = NOTE_COLORS[note] || '#888'

                  return (
                    <div key={si} className={`${styles.cell} ${isNut ? styles.nutCell : ''}`}>
                      {/* String line */}
                      <div className={styles.stringWire} />
                      {/* Note dot */}
                      {inScale && (
                        <div
                          className={`${styles.noteDot} ${isRoot ? styles.rootDot : ''}`}
                          style={{
                            background: isRoot ? color : `${color}cc`,
                            boxShadow: isRoot ? `0 0 6px ${color}` : 'none',
                          }}
                        >
                          <span className={styles.noteName}>{note}</span>
                          {isRoot && <span className={styles.rootLabel}>R</span>}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={styles.legendDot} style={{ background: NOTE_COLORS[track.keyRoot], boxShadow: `0 0 4px ${NOTE_COLORS[track.keyRoot]}` }} />
          <span>Tonique ({track.keyRoot})</span>
        </div>
        <div className={styles.legendRow}>
          <span className={styles.legendDot} style={{ background: '#aaa' }} />
          <span>Notes de la gamme</span>
        </div>
        <div className={styles.scaleInfo}>
          {track.scales[activeScale]?.notes.join(' — ')}
        </div>
      </div>
    </div>
  )
}
