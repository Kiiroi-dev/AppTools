import { useState } from 'react'
import styles from './AnalysisPanel.module.css'

const NOTE_COLORS = {
  'A': '#7c6af7', 'B': '#4ecdc4', 'C': '#ff6b6b',
  'D': '#ffd93d', 'E': '#51cf66', 'F': '#ff922b', 'G': '#74c0fc',
  'C#': '#ff6b6b', 'D#': '#ffd93d', 'F#': '#ff922b', 'G#': '#74c0fc',
}

function ChordDiagram({ name }) {
  // Simplified chord shapes for Am, G, F, E
  const shapes = {
    Am: [[null,0,2,2,1,0], 'x02210'],
    G:  [[3,2,0,0,0,3],   '320003'],
    F:  [[1,1,2,3,3,1],   '133211'],
    E:  [[0,2,2,1,0,0],   '022100'],
  }
  const shape = shapes[name]
  if (!shape) return <div className={styles.chordName}>{name}</div>

  return (
    <div className={styles.chord}>
      <div className={styles.chordName}>{name}</div>
      <div className={styles.chordFrets}>
        {shape[0].map((fret, i) => (
          <div key={i} className={styles.chordString}>
            {fret === null ? <span className={styles.muted}>✕</span>
              : fret === 0 ? <span className={styles.open}>○</span>
              : <span className={styles.fret}>{fret}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalysisPanel({ track }) {
  const [activeScale, setActiveScale] = useState(0)

  return (
    <aside className={styles.panel}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Tonalité</h3>
        <div className={styles.keyBadge}>
          <span className={styles.keyRoot}>{track.keyRoot}</span>
          <span className={styles.keyMode}>{track.keyMode === 'minor' ? 'mineur' : 'majeur'}</span>
        </div>
        <div className={styles.progression}>
          <span className={styles.label}>Progression</span>
          <code className={styles.prog}>{track.progression}</code>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Accords</h3>
        <div className={styles.chords}>
          {track.chords.map(c => <ChordDiagram key={c} name={c} />)}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Gammes compatibles</h3>
        <div className={styles.scaleTabs}>
          {track.scales.map((s, i) => (
            <button
              key={i}
              className={`${styles.scaleTab} ${activeScale === i ? styles.active : ''}`}
              onClick={() => setActiveScale(i)}
            >
              {s.name.replace('La ', '')}
            </button>
          ))}
        </div>
        <div className={styles.scaleNotes}>
          {track.scales[activeScale].notes.map(n => (
            <span
              key={n}
              className={styles.note}
              style={{ background: NOTE_COLORS[n] + '33', borderColor: NOTE_COLORS[n] + '88', color: NOTE_COLORS[n] }}
            >
              {n}
            </span>
          ))}
        </div>
        <p className={styles.scaleHint}>
          {activeScale === 2
            ? 'Idéale pour improviser — 5 notes, très mélodique'
            : activeScale === 1
            ? 'Sensible haussée → tension dramatique sur le V'
            : 'Gamme de base · 7 modes disponibles'}
        </p>
      </section>
    </aside>
  )
}
