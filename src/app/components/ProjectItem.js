import Image from "next/image";
import LinkButton from "./LinkButton";

export default function ProjectItem({title, description, attr, href="#", image="/images/hoodoo.jpg", children}) {
  return (
    <li className="max-w-sm rounded overflow-hidden shadow-lg mb-4 bg-white ">
      <Image src={image} title={attr ? `${title} | ${attr}` : title} alt={title} width={500} height={500} className=""/>
      <div className="m-2 font-bold text-xl line-clamp-1 md:line-clamp-2">{title}</div>
      <p className="mx-2 mb-4 text-gray-700 text-base md:line-clamp-2 line-clamp-1">{description}</p>
      <LinkButton className="mx-auto sm:px-1 w-36 " href={href}>Show Me</LinkButton>
      {children}
      {/*<div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div> */}

    </li>
  )
}