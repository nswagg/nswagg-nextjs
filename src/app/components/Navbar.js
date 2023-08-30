

export default function Navbar({children}) {
  return (
    <nav className="opacity-0 sm:opacity-100 bg-slate-100 bg-opacity-60 flex justify-center py-6 px-4 text-xl font-bold fixed top-0 left-0 right-0">
      <ul className="flex space-x-4 lg:space-x-10">
        {children}
      </ul>
    </nav>
  )
}