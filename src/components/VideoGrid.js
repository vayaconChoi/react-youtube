import VideoCard from './VideoCard'

const mockVideos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Mock Video Title ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${(Math.random() * 1000).toFixed(0)}K views`,
  timestamp: `${Math.floor(Math.random() * 10) + 1} days ago`,
  thumbnail: `https://source.unsplash.com/random/640x360?sig=${i}`,
}))

export default function VideoGrid() {
  return (
    <main className="flex-1 p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {mockVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </main>
  )
}