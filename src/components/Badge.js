import Image from "next/image";

export default function Badge({alt, children, icon, size, iconClass}) {
  return (
    <div className="flex my-2 shrink-0 mx-2 px-4 justify-items-center rounded-lg outline-none bg-white h-10 shadow-md">
      {icon && <Image src={icon} title={alt} alt={alt} width={size ?? 24} height={size ?? 24} className={iconClass}/>}
      <div className={`font-semibold justify-center my-1.5 ${size ? "mx-1" : "mx-1.5"}`}>
        {children}
      </div>
      
    </div>
  )
}