import Link from "next/link";

/** For navigable links to pages/within pages. Default behavior to replace URL history state */
export default function NavItem({href, isActive, children, target, className, replace=true}) {
  return (
    <li>
      <Link
        href={href}
        rel="noopener"
        target={target}
        className= {`${className} pointer-events-auto rounded-md hover:bg-slate-200 pl-2 pr-3 py-2 hover:shadow-md ${isActive ? "" : ""}`}
        replace={replace}
      >
        {children}
      </Link>
    </li>
  )
} 