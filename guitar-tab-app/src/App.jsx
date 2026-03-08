import { useState, useCallback } from 'react'
import Header from './components/Header'
import UploadZone from './components/UploadZone'
import WorkspaceLayout from './components/WorkspaceLayout'
import './App.css'

export default function App() {
  const [track, setTrack] = useState(null)

  const updateTrack = useCallback((updates) => {
    setTrack(prev => prev ? { ...prev, ...updates } : prev)
  }, [])

  return (
    <div className="app">
      <Header />
      {!track ? (
        <UploadZone onTrackReady={setTrack} />
      ) : (
        <WorkspaceLayout track={track} updateTrack={updateTrack} onBack={() => setTrack(null)} />
      )}
    </div>
  )
}
