// src/pages/Home.jsx
import VideoCard from '../components/VideoCard'

export default function Home({ videos }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
      {videos.map((video) => (
        <VideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  )
}