import { useState, useRef } from 'react'
import { ALL_NOTES, ALL_CHORD_NAMES, CHORD_SHAPES, NOTE_COLORS, getScalesForKey } from '../musicTheory'
import styles from './AnalysisPanel.module.css'

function ChordDiagram({ name, onRemove }) {
  const shape = CHORD_SHAPES[name]
  const frets = shape || [null, null, null, null, null, null]
  const stringLabels = ['E', 'A', 'D', 'G', 'B', 'e']

  return (
    <div className={styles.chord}>
      <div className={styles.chordHeader}>
        <span className={styles.chordName}>{name}</span>
        <button className={styles.removeChord} onClick={() => onRemove(name)} title="Supprimer">×</button>
      </div>
      <div className={styles.chordGrid}>
        {frets.map((fret, i) => (
          <div key={i} className={styles.chordString}>
            <span className={styles.chordStringLabel}>{stringLabels[i]}</span>
            {fret === null
              ? <span className={styles.muted}>✕</span>
              : fret === 0
              ? <span className={styles.open}>○</span>
              : <span className={styles.fretDot}>{fret}</span>}
          </div>
        ))}
      </div>
      {!shape && <div className={styles.noShape}>Diagramme à venir</div>}
    </div>
  )
}

function KeyEditor({ keyRoot, keyMode, onChangeKey }) {
  const [editing, setEditing] = useState(false)
  const [root, setRoot] = useState(keyRoot)
  const [mode, setMode] = useState(keyMode)

  const apply = () => {
    onChangeKey(root, mode)
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className={styles.keyBadge} onClick={() => setEditing(true)} title="Cliquer pour modifier">
        <span className={styles.keyRoot}>{keyRoot}</span>
        <span className={styles.keyMode}>{keyMode === 'minor' ? 'mineur' : 'majeur'}</span>
        <span className={styles.editIcon}>✎</span>
      </div>
    )
  }

  return (
    <div className={styles.keyEditor}>
      <select value={root} onChange={(e) => setRoot(e.target.value)} className={styles.select}>
        {ALL_NOTES.map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <select value={mode} onChange={(e) => setMode(e.target.value)} className={styles.select}>
        <option value="major">Majeur</option>
        <option value="minor">Mineur</option>
      </select>
      <button className={styles.applyBtn} onClick={apply}>OK</button>
      <button className={styles.cancelBtn} onClick={() => { setRoot(keyRoot); setMode(keyMode); setEditing(false) }}>×</button>
    </div>
  )
}

function ChordAdder({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef(null)

  const filtered = ALL_CHORD_NAMES.filter(c => c.toLowerCase().includes(search.toLowerCase())).slice(0, 8)

  const addChord = (name) => {
    onAdd(name)
    setSearch('')
    setOpen(false)
  }

  if (!open) {
    return <button className={styles.addChordBtn} onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }}>+ Ajouter</button>
  }

  return (
    <div className={styles.chordAdder}>
      <input
        ref={inputRef}
        className={styles.chordInput}
        placeholder="Am, G7, D..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && search.trim()) addChord(search.trim())
          if (e.key === 'Escape') { setOpen(false); setSearch('') }
        }}
      />
      <div className={styles.chordSuggestions}>
        {filtered.map(c => (
          <button key={c} className={styles.chordSuggestion} onClick={() => addChord(c)}>{c}</button>
        ))}
      </div>
    </div>
  )
}

export default function AnalysisPanel({ track, updateTrack }) {
  const [activeScale, setActiveScale] = useState(0)

  const handleChangeKey = (newRoot, newMode) => {
    const newScales = getScalesForKey(newRoot, newMode)
    updateTrack({
      keyRoot: newRoot,
      keyMode: newMode,
      scales: newScales,
    })
    setActiveScale(0)
  }

  const handleRemoveChord = (name) => {
    updateTrack({ chords: track.chords.filter(c => c !== name) })
  }

  const handleAddChord = (name) => {
    if (!track.chords.includes(name)) {
      updateTrack({ chords: [...track.chords, name] })
    }
  }

  const handleProgressionChange = (e) => {
    updateTrack({ progression: e.target.value })
  }

  return (
    <aside className={styles.panel}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Tonalité</h3>
        <KeyEditor keyRoot={track.keyRoot} keyMode={track.keyMode} onChangeKey={handleChangeKey} />
        <div className={styles.progression}>
          <span className={styles.label}>Progression</span>
          <input
            className={styles.progInput}
            value={track.progression}
            onChange={handleProgressionChange}
            spellCheck={false}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Accords</h3>
        <div className={styles.chords}>
          {track.chords.map(c => <ChordDiagram key={c} name={c} onRemove={handleRemoveChord} />)}
        </div>
        <ChordAdder onAdd={handleAddChord} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Gammes compatibles</h3>
        <div className={styles.scaleTabs}>
          {track.scales.map((s, i) => (
            <button
              key={s.key}
              className={`${styles.scaleTab} ${activeScale === i ? styles.active : ''}`}
              onClick={() => setActiveScale(i)}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className={styles.scaleNotes}>
          {track.scales[activeScale]?.notes.map(n => (
            <span
              key={n}
              className={styles.note}
              style={{
                background: (NOTE_COLORS[n] || '#888') + '33',
                borderColor: (NOTE_COLORS[n] || '#888') + '88',
                color: NOTE_COLORS[n] || '#888',
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </section>
    </aside>
  )
}
