import styles from './WorkspaceLayout.module.css'
import AnalysisPanel from './AnalysisPanel'
import TabViewer from './TabViewer'
import FretboardPanel from './FretboardPanel'

export default function WorkspaceLayout({ track, onBack }) {
  return (
    <div className={styles.workspace}>
      {/* Top bar */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Retour</button>
        <div className={styles.trackInfo}>
          <span className={styles.trackName}>{track.name}</span>
          <span className={styles.trackMeta}>{track.key} · {track.bpm} BPM · {track.timeSignature}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionBtn}>Exporter tab</button>
        </div>
      </div>

      {/* Main layout: 3 columns */}
      <div className={styles.main}>
        <AnalysisPanel track={track} />
        <TabViewer track={track} />
        <FretboardPanel track={track} />
      </div>
    </div>
  )
}
