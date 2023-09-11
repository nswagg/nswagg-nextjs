import Image from "next/image";
import LinkButton from "./LinkButton";
import hoodoo from "@/images/hoodoo.jpg"

export default function ProjectItem({title, description, attr, href="#", image, children}) {
  return (
    <li className="max-w-sm rounded overflow-hidden shadow-lg mb-4 bg-white relative">
      <Image src={image ?? hoodoo} title={attr ? `${title} | ${attr}` : title} alt={title} width={500} height={500} className=""/>
      <div className="m-2 font-bold text-xl line-clamp-1 md:line-clamp-2">{title}</div>
      <p className="mx-2 mb-20 text-gray-700 text-base md:line-clamp-2 line-clamp-1">{description}</p>
      <LinkButton className="absolute mb-4 mx-auto w-36 bottom-0 left-0 right-0" href={href}>Show Me</LinkButton>
      {children}
    </li>
  )
}