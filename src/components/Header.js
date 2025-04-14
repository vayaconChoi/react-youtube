import { Menu, Search, Video, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6" />
        <span className="font-bold text-lg">YouMock</span>
      </div>
      <div className="flex-1 max-w-2xl mx-6">
        <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm flex-1 text-white"
          />
          <Search className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Video className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <User className="w-6 h-6" />
      </div>
    </header>
  )
}