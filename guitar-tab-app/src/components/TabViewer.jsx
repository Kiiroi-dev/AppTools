import { useEffect, useRef, useState } from 'react'
import * as alphaTab from '@coderline/alphatab'
import styles from './TabViewer.module.css'

// Demo alphaTex — notation + tab synced
const DEMO_TEX = `
\\title "Tab générée"
\\tempo 120
\\tuning E4 B3 G3 D3 A2 E2
\\instrument 25
\\staff{score}
.
:4 (0.1 0.2 1.3 2.4 2.5) (0.1 1.2 0.3 2.4 3.5) (1.1 0.2 2.3 3.4 3.5) (0.1 2.2 2.3 1.4 0.5) |
(0.1 0.2 1.3 2.4 2.5) (0.1 1.2 0.3 2.4 3.5) (1.1 0.2 2.3 3.4 3.5) (0.1 2.2 2.3 1.4 0.5) |
:8 0.1 2.1 3.1 5.1 7.1 8.1 7.1 5.1 | :4 (0.1 0.2 1.3 2.4 2.5){d 3} r
`

export default function TabViewer({ track }) {
  const containerRef = useRef(null)
  const apiRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // AlphaTab setup — notation + tablature rendering
  useEffect(() => {
    if (!containerRef.current) return

    const settings = new alphaTab.Settings()
    settings.core.tex = true
    settings.core.engine = 'html5'
    settings.display.layoutMode = alphaTab.LayoutMode.Page
    settings.display.scale = 1.0
    settings.display.staveProfile = alphaTab.StaveProfile.Default // Shows both notation + tab
    settings.notation.elements = new Map([
      [alphaTab.NotationElement.ScoreTitle, true],
      [alphaTab.NotationElement.ScoreSubTitle, false],
      [alphaTab.NotationElement.ScoreArtist, false],
      [alphaTab.NotationElement.ScoreAlbum, false],
      [alphaTab.NotationElement.ScoreWords, false],
      [alphaTab.NotationElement.ScoreMusic, false],
      [alphaTab.NotationElement.ScoreCopyright, false],
    ])

    // Disable synth player — we play original audio instead
    settings.player.enablePlayer = false
    settings.player.enableCursor = false

    const api = new alphaTab.AlphaTabApi(containerRef.current, settings)
    apiRef.current = api
    api.tex(DEMO_TEX)

    return () => api.destroy()
  }, [])

  // Original audio playback
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const stop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const formatTime = (t) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const onSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * duration
    setCurrentTime(pct * duration)
  }

  return (
    <div className={styles.viewer}>
      {/* Hidden audio for original track */}
      {track.audioUrl && (
        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0) }}
        />
      )}

      {/* Player controls — plays original audio */}
      <div className={styles.controls}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {isPlaying ? '⏸ Pause' : '▶ Jouer'}
        </button>
        <button className={styles.stopBtn} onClick={stop}>⏹</button>

        <div className={styles.timeInfo}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <div className={styles.seekBar} onClick={onSeek}>
            <div className={styles.seekFill} style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }} />
          </div>
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>

        <div className={styles.controlsRight}>
          <span className={styles.badge}>Audio original</span>
        </div>
      </div>

      {/* AlphaTab — shows notation + tablature synced */}
      <div className={styles.tabContainer}>
        <div ref={containerRef} className={styles.alphaTab} />
      </div>
    </div>
  )
}
