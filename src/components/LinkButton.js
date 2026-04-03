import Link from "next/link";

export default function LinkButton({href, children, className, override, target="_blank"}) {
/** target="_blank" to open in new tab*/
  return(
      <Link
        href={href}
        className={override ?? `${className} flex font-semibold h-10 mb-2 lg:mb-6 px-6 justify-center rounded-lg text-center text-slate-100 bg-slate-800 border border-slate-700 hover:bg-teal-400 hover:text-slate-950 hover:border-teal-300`}
        rel="noopener noreferrer"
        target={target}
      >
        <button>{children}</button>
      </Link>
  )
}
