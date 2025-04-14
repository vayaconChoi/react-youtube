const items = ['Home', 'Shorts', 'Subscriptions', 'Library', 'History']

export default function Sidebar() {
  return (
    <aside className="w-48 hidden sm:block bg-zinc-900 border-r border-zinc-800 py-4">
      <ul className="flex flex-col space-y-2">
        {items.map((item, i) => (
          <li key={i} className="hover:bg-zinc-800 px-4 py-2 text-sm text-white cursor-pointer rounded-lg">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}