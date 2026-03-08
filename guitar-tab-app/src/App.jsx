import { useState } from 'react'
import Header from './components/Header'
import UploadZone from './components/UploadZone'
import WorkspaceLayout from './components/WorkspaceLayout'
import './App.css'

export default function App() {
  const [track, setTrack] = useState(null) // { name, analysis } — null = show upload screen

  return (
    <div className="app">
      <Header />
      {!track ? (
        <UploadZone onTrackReady={setTrack} />
      ) : (
        <WorkspaceLayout track={track} onBack={() => setTrack(null)} />
      )}
    </div>
  )
}
