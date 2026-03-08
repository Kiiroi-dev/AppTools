import { useState, useCallback } from 'react'
import styles from './UploadZone.module.css'

// Simulated analysis — will be replaced by real backend call
function simulateAnalysis(filename) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: filename.replace(/\.[^.]+$/, ''),
        key: 'La mineur',
        keyRoot: 'A',
        keyMode: 'minor',
        bpm: 142,
        timeSignature: '4/4',
        chords: ['Am', 'G', 'F', 'E'],
        progression: 'i - VII - VI - V',
        scales: [
          { name: 'La mineur naturelle', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
          { name: 'La mineur harmonique', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#'] },
          { name: 'La pentatonique mineure', notes: ['A', 'C', 'D', 'E', 'G'] },
        ],
      })
    }, 2000)
  })
}

export default function UploadZone({ onTrackReady }) {
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | analyzing | done
  const [progress, setProgress] = useState('')

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('audio/')) {
      alert('Fichier audio requis (mp3, wav, flac...)')
      return
    }
    setStatus('analyzing')
    setProgress('Analyse de la tonalité...')

    setTimeout(() => setProgress('Détection des accords...'), 700)
    setTimeout(() => setProgress('Génération de la tablature...'), 1400)

    const analysis = await simulateAnalysis(file.name)
    setStatus('done')
    onTrackReady({ file, ...analysis })
  }, [onTrackReady])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }, [handleFile])

  const onInputChange = (e) => handleFile(e.target.files[0])

  return (
    <div className={styles.container}>
      <div
        className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {status === 'idle' && (
          <>
            <div className={styles.uploadIcon}>🎵</div>
            <h2 className={styles.title}>Dépose ton audio ici</h2>
            <p className={styles.sub}>MP3, WAV, FLAC, M4A — ou extrait depuis YouTube avec le converter</p>
            <label className={styles.btn}>
              Choisir un fichier
              <input type="file" accept="audio/*" onChange={onInputChange} hidden />
            </label>
          </>
        )}

        {status === 'analyzing' && (
          <>
            <div className={styles.spinner} />
            <p className={styles.progressText}>{progress}</p>
          </>
        )}
      </div>
    </div>
  )
}
