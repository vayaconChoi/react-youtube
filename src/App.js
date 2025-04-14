import { useEffect, useState } from 'react'
import { Menu, Search, User, Youtube } from 'lucide-react'
import './App.css'
import { fetchAllrightVideos, searchYoutubeVideos } from './api/youtube'

export default function App() {
  const [videos, setVideos] = useState([])
  const [theme, setTheme] = useState('dark')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [keywords, setKeywords] = useState(['All'])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.body.setAttribute('data-theme', next)
  }

  const extractKeywords = (videos) => {
    const tags = new Set()
    videos.forEach((video) => {
      const words = video.snippet.title.split(/\s+/)
      words.forEach((word) => {
        const clean = word.replace(/[^\w]/g, '')
        if (clean.length > 2) tags.add(clean)
      })
    })
    return ['All', ...Array.from(tags).slice(0, 10)]
  }

  const loadHome = async () => {
    const homeVideos = await fetchAllrightVideos()
    setVideos(homeVideos)
    setQuery('')
    setFilter('All')
    setKeywords(extractKeywords(homeVideos))
  }

  useEffect(() => {
    loadHome()
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (query.trim() === '') return
    const results = await searchYoutubeVideos(query)
    setVideos(results)
    setFilter('All')
    setKeywords(extractKeywords(results))
  }

  const filteredVideos = videos.filter((video) => {
    if (filter === 'All') return true
    return video.snippet.title.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="app-container">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        filter={filter}
        setFilter={setFilter}
        keywords={keywords}
      />
      <div className="main-section">
        <Sidebar onHomeClick={loadHome} />
        <main className="content">
          {filteredVideos.length === 0 ? (
            <p className="text-white text-center mt-12">🔍 No videos found or still loading...</p>
          ) : (
            filteredVideos.map((video) => (
              <VideoCard
                key={video.id.videoId || video.id}
                videoId={video.id.videoId || video.id}
                title={video.snippet.title}
                channel={video.snippet.channelTitle}
                views={''}
                timestamp={new Date(video.snippet.publishedAt).toLocaleDateString()}
                thumbnail={video.snippet.thumbnails.medium.url}
              />
            ))
          )}
        </main>
      </div>
    </div>
  )
}

function Header({ theme, toggleTheme, query, setQuery, handleSearch, filter, setFilter, keywords }) {
  return (
    <header className="header">
      <div className="header-left">
        <Menu className="icon" />
        <div className="logo-group">
          <Youtube className="logo-icon" color="#FF0000" />
          <span className="logo-text">BeomTube</span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <form className="header-search" onSubmit={handleSearch}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <Search className="icon" />
          </button>
        </div>
      </form>
      <User className="icon" />
      <div className="filters">
        {keywords.map((label) => (
          <button
            key={label}
            className={filter === label ? 'active' : ''}
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  )
}

function Sidebar({ onHomeClick }) {
  return (
    <aside className="sidebar">
      <button className="sidebar-btn" onClick={onHomeClick}>
        <img src="/icons/home.png" alt="home" className="icon-img" />
        <span>Home</span>
      </button>
      <button className="sidebar-btn">
        <img src="/icons/explore.png" alt="explore" className="icon-img" />
        <span>Explore</span>
      </button>
      <button className="sidebar-btn">
        <img src="/icons/subscribe.png" alt="subs" className="icon-img" />
        <span>Subs</span>
      </button>
    </aside>
  )
}

function VideoCard({ title, channel, views, timestamp, thumbnail, videoId }) {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <a className="video-card" href={videoUrl} target="_blank" rel="noopener noreferrer">
      <div className="video-thumb-wrapper">
        <img src={thumbnail} alt={title} className="thumbnail" />
      </div>
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
        <p className="channel-name">{channel}</p>
        <p className="video-meta">{views} • {timestamp}</p>
      </div>
    </a>
  )
}