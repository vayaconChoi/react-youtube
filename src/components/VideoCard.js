export default function VideoCard({ video }) {
  return (
    <div className="cursor-pointer group">
      <img src={video.thumbnail} alt={video.title} className="rounded-xl w-full" />
      <div className="mt-2">
        <h3 className="text-sm font-semibold group-hover:text-red-500 line-clamp-2">{video.title}</h3>
        <p className="text-xs text-zinc-400 mt-1">{video.channel}</p>
        <p className="text-xs text-zinc-500">{video.views} • {video.timestamp}</p>
      </div>
    </div>
  )
}