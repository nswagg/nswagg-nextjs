'use client'

export default function Projects({children}) {

  return (
    <div className="container m-auto pb-10">
      <ul className="flex md:grid md:grid-flow-dense md:justify-items-center justify-center md:grid-cols-3 md:gap-x-4 md:gap-y-8 flex-wrap">
        {children}
      </ul>
    </div>
  )
}