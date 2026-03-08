import { useEffect, useRef, useState } from 'react'
import * as alphaTab from '@coderline/alphatab'
import styles from './TabViewer.module.css'

// Demo GP file encoded as base64 — will be replaced by the backend-generated tab
// This is a minimal Guitar Pro 5 file with Am arpeggio for demonstration
const DEMO_TEX = `
\\title "Analyse en cours..."
\\tempo 142
\\tuning E4 B3 G3 D3 A2 E2
\\instrument 25
.
(0.5 2.5) (0.4 2.4) (0.3 2.3) (0.2 0.2) |
(2.5 2.5) (1.4 1.4) (2.3 2.3) (0.2 0.2) |
(3.5 3.5) (2.4 2.4) (2.3 2.3) (1.2 1.2) |
(0.5 0.5) (2.4 2.4) (1.3 1.3) (0.2 0.2)
`

export default function TabViewer({ track }) {
  const containerRef = useRef(null)
  const apiRef = useRef(null)
  const [playerState, setPlayerState] = useState('stopped') // stopped | playing | paused

  useEffect(() => {
    if (!containerRef.current) return

    const settings = new alphaTab.Settings()
    settings.core.tex = true
    settings.core.engine = 'html5'
    settings.display.layoutMode = alphaTab.LayoutMode.Page
    settings.display.scale = 1.1
    settings.player.enablePlayer = true
    settings.player.enableCursor = true
    settings.player.enableAnimatedBeatCursor = true
    settings.player.soundFont = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2'

    const api = new alphaTab.AlphaTabApi(containerRef.current, settings)
    apiRef.current = api

    api.playerStateChanged.on((args) => {
      setPlayerState(args.state === 1 ? 'playing' : 'paused')
    })

    api.tex(DEMO_TEX)

    return () => api.destroy()
  }, [])

  const togglePlay = () => {
    if (!apiRef.current) return
    apiRef.current.playPause()
  }

  const stop = () => {
    if (!apiRef.current) return
    apiRef.current.stop()
    setPlayerState('stopped')
  }

  return (
    <div className={styles.viewer}>
      {/* Player controls */}
      <div className={styles.controls}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {playerState === 'playing' ? '⏸ Pause' : '▶ Jouer'}
        </button>
        <button className={styles.stopBtn} onClick={stop}>⏹</button>
        <div className={styles.controlsRight}>
          <span className={styles.hint}>Tab générée automatiquement · modifiable bientôt</span>
        </div>
      </div>

      {/* AlphaTab render target */}
      <div className={styles.tabContainer}>
        <div ref={containerRef} className={styles.alphaTab} />
      </div>
    </div>
  )
}
