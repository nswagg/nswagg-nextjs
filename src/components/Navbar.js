

export default function Navbar({children}) {
  return (
    <nav className="z-10 h-16 backdrop-blur-xl flex sm:opacity-100 bg-slate-950/70 border-b border-slate-800 justify-center py-5 px-4 text-xl font-bold fixed top-0 left-0 right-0 text-slate-100">
      <div className="hidden md:inline">
        <ul className="flex space-x-4 lg:space-x-10">
        {children}
      </ul>
      </div>
    </nav>
  )
}
