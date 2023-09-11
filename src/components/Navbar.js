

export default function Navbar({children}) {
  return (
    <nav className="z-10 h-16 backdrop-blur-sm flex sm:opacity-100 bg-slate-100 bg-opacity-60 justify-center py-5 px-4 text-xl font-bold fixed top-0 left-0 right-0">
      <div className="hidden md:inline">
        <ul className="flex space-x-4 lg:space-x-10">
        {children}
      </ul>
      </div>
    </nav>
  )
}