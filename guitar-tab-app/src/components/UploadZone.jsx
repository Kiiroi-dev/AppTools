import { useState, useCallback } from 'react'
import { getScalesForKey } from '../musicTheory'
import styles from './UploadZone.module.css'

function simulateAnalysis(filename) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: filename.replace(/\.[^.]+$/, ''),
        keyRoot: 'A',
        keyMode: 'minor',
        bpm: 142,
        timeSignature: '4/4',
        chords: ['Am', 'G', 'F', 'E'],
        progression: 'i - VII - VI - V',
        scales: getScalesForKey('A', 'minor'),
      })
    }, 2000)
  })
}

export default function UploadZone({ onTrackReady }) {
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle')
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
    const audioUrl = URL.createObjectURL(file)
    setStatus('done')
    onTrackReady({ file, audioUrl, ...analysis })
  }, [onTrackReady])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

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
            <p className={styles.sub}>MP3, WAV, FLAC, M4A</p>
            <label className={styles.btn}>
              Choisir un fichier
              <input type="file" accept="audio/*" onChange={(e) => handleFile(e.target.files[0])} hidden />
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
