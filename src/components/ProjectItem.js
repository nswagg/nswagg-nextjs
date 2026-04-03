import Image from "next/image";
import LinkButton from "./LinkButton";
import hoodoo from "@/images/hoodoo.jpg"

export default function ProjectItem({title, description, attr, href="#", image, children}) {
  return (
    <li className="max-w-sm rounded-2xl overflow-hidden shadow-xl mb-4 bg-slate-900/90 border border-slate-800 relative">
      <Image src={image ?? hoodoo} title={attr ? `${title} | ${attr}` : title} alt={title} width={500} height={500} className=""/>
      <div className="m-3 font-bold text-xl text-slate-100 line-clamp-1 md:line-clamp-2">{title}</div>
      <p className="mx-3 mb-20 text-slate-300 text-base md:line-clamp-2 line-clamp-1">{description}</p>
      <LinkButton className="absolute mb-4 mx-auto w-36 bottom-0 left-0 right-0" href={href}>Show Me</LinkButton>
      {children}
    </li>
  )
}
