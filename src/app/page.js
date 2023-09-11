import Badge from "../components/Badge";
import Image from "next/image";
import LinkButton from "../components/LinkButton";
import NavItem from "../components/NavItem";
import Navbar from "../components/Navbar";
import ProjectItem from "../components/ProjectItem";
import Projects from "../components/Projects";
import ants from "@/images/ants3x2.png"
import cyborg from "@/images/cyborg3x2.jpg"
import map from "@/images/map3x2.png"
import pfp from "@/images/NickSq.jpg"
import robot from "@/images/robot3x2.jpg"
import xr from "@/images/xr3x2.jpg"

/* Opening PDFs in new tab: https://github.com/vercel/next.js/discussions/25981#discussioncomment-1039648 */
export default function Landing() {
  return (
    
    <main className="min-h-full relative">
      <div className="bg-slate-100 overflow-hidden">
        <div id="navbar">
          <Navbar>
            <NavItem href="#home" isActive={true}>Home</NavItem>
            <NavItem href="#projects">Projects</NavItem>
            <NavItem href="#skills">Skills</NavItem>
          </Navbar>
          <div className="fixed flex left-0 top-0 mx-6 z-20">
            <LinkButton override="" href="#home" target="">
              <div className="fixed flex">
                <Image src="/icons/N.png" alt="nswagg.com" height={32} width={32}/>
                <p className="px-4 pt-1 font-semibold font-serif">Nick Waggoner</p>
              </div>
            </LinkButton>
          </div>
          <div className="fixed flex right-0 top-0 m-5 space-x-4 lg:space-x-6 z-20">
            {/* <LinkButton override="" href="https://github.com/nswagg" target="_blank">
                <Image className="hover:invert hover:brightness-200" title="GitHub" src="/icons/github-mark.png" alt="Nick Waggoner's GitHub Profile" width="28" height="28"/>  
            </LinkButton> */}
            <LinkButton override="" href="https://github.com/nswagg" target="_blank">
                <Image className="hover:invert hover:brightness-200" title="GitHub" src="/icons/github-mark.png" alt="Nick Waggoner's GitHub Profile" width="28" height="28"/>  
            </LinkButton>
            <LinkButton override="" href="https://www.linkedin.com/in/nswagg/" target="_blank">
                <Image className="hover:invert hover:saturate-0" title="LinkedIn" src="/icons/linkedIn.png" alt="Nick Waggoner's LinkedIn® Profile" width="28" height="28"/>
            </LinkButton>
          </div>
        </div>
        
        <div id="home" className="md:container m-auto flex">
          <div className="justify-center min-h-screen lg:min-h-0 lg:h-auto mx-auto bg-slate-700 bg-opacity-20 my-20 py-6 sm:px-16 lg:rounded-xl shadow-lg">
            <div className="flex flex-wrap justify-center lg:flex-nowrap lg:justify-normal">
              <div className="mx-auto content-center p-8 px-6 lg:mt-6 lg:pt-36 lg:pb-24">
                <h1 className="text-5xl font-bold">Nick Waggoner</h1>
                <p className="m-4 font-semibold">Software Engineering<br/>Data Visualisation<br/>Web Design</p>
                <div className="lg:space-x-3 lg:py-3 flex flex-wrap pointer-events-auto">
                  <LinkButton href="/docs/WaggonerResume8_22_23.pdf">View Resume</LinkButton>
                  <LinkButton href="/docs/WaggonerCVFull8_22_23.pdf">View Curriculum Vita</LinkButton>
                </div>
              </div>
              <div className="items-center justify-center lg:justify-normal text-center order-first">
                <Image src={pfp} alt={"Nick Waggoner Portrait"} className="select-none mx-auto my-6 w-40 lg:w-80 aspect-square rounded-full shadow-lg "/>
                <p className="font-semibold">University of Colorado Colorado Springs</p>
                <p className="italic">Bachelor of Innovation in Computer Science<br/>Collateral: Creative Communication</p>
              </div>
            </div>
            <div className="px-14 my-4 italic md:text-2xl font-semibold justify-items-center">
              <h2 className=" font-bold text-3xl">Innovation</h2>
              <p className="flex xl:indent-6">in·​no·​va·​tion (noun): The process of transforming ideas into impact</p>
            </div>
          </div>
        </div>

        <div id="projects" className="pt-0 md:pt-32 pb-12 bg-gradient-to-b from-slate-100 to-slate-400">
          <Projects>
            <ProjectItem title="Particle Swarm Optimization with Dynamic Targets" href="https://github.com/nswagg/psoMT" image={ants} description="Particle Swarm Optimization algorithm experiment with moving/degrading target was initially designed to implement Ant Colony Optimization, but has been refactored for particle swarm with targets decaying on convergence (inversely proportional to swarm velocity). Decay rate defined as carry_capacity of particles defines the number of particles required to be in proximity to target for it to decay self.particles_for_decay = self.NumParticles * (1 - self.w) if 0 < w <= 1 else self.NumParticles"/>
            <ProjectItem title="CFA GIS Delivery Zone Optimization" description="Mapbox GIS visualization using historic delivery data to inform delivery zone optimization through speed of service"/>
            <ProjectItem title="NASA Landslide Data Visualization" href="/nasa" image={map} description="Includes public NASA landslide data from 1988-2017 Visualizes landslide dataset on a GIS tileset using the Mapbox tool."/>
            <ProjectItem title="Article: Outrunning Digital Realism" href="https://sway.office.com/n9kebLBZB7MCPqgF?ref=Link" image={xr} attr="Photo by XR Expo on Unsplash" description="As reality virtualization becomes more prevalent, virtual reality threatens both physical interaction and the instigation of severe social dilemmas revolving around escapism."/>
            <ProjectItem title="REAL-WORLD CYBORGS | Human Augmentation Video Essay - Deus Ex: Human Revolution" image={cyborg} href="https://youtu.be/UTURHopCHYs" description="Discussion of current technology, technological development tracjectory, and social and ethical topics relating to replacing, supplementing, and superseding human abilities through use of tools and augmentation."/>
            <ProjectItem title="Healthcare Robotics Lecture: Autonomous Agents and Human Augmentation" image={robot} href="https://youtu.be/-ppYXPCEHqY" attr="Photo by Possessed Photography on Unsplash" description="Short Lecture on current healthcare robotics systems, artificial intelligence, and ethics of robotics in relation to the benefit brought about by these technologies."/>
          </Projects> 
        </div>
        <div id="skills">
          <div className="py-20 px-16 bg-slate-500">
            <div className="flex flex-wrap md:flex-nowrap container mx-auto">
              <div id="programming_languages" className="max-w-3xl m-auto grid grid-flow-dense auto-rows-max pt-6 pb-10">
                <h2 className="text-center font-bold text-2xl mt-4 text-slate-100 p-4">Programming Languages</h2>
                <div className="flex flex-wrap 2xl:justify-start justify-center select-none">
                  <Badge icon={"/icons/python-icon.svg"} alt="Python">Python</Badge>
                  <Badge icon="/icons/java-icon.svg" alt="Java">Java</Badge>
                  <Badge icon="/icons/javascript-icon.svg" alt="JavaScript">JavaScript</Badge>
                  <Badge icon="/icons/golang-icon.svg" alt="Golang">Golang</Badge>
                  <Badge icon="/icons/c++-icon2.svg" alt="C++" iconClass="mt-1.5">C++</Badge>
                  <Badge icon="/icons/c-icon.svg" alt="Objective C">Objective C</Badge>
                  <Badge icon="/icons/html5-icon.svg" alt="HTML">HTML</Badge>
                  <Badge icon="/icons/css-icon.svg" alt="CSS">CSS</Badge>
                  <Badge icon="/icons/ruby-icon.svg" alt="Ruby on Rails">Ruby on Rails</Badge>
                </div>
              </div>
              <div id="tools_and_frameworks" className="max-w-3xl m-auto grid grid-flow-dense auto-rows-max pt-6 pb-10">
                <h2 className="text-center font-bold text-2xl mt-4 text-slate-100 p-4">Tools and Frameworks</h2>
                <div className="flex flex-wrap 2xl:justify-end justify-center select-none">
                  <Badge icon="/icons/reactjs-icon.svg" alt="React.js">React.js</Badge>
                  <Badge icon="/icons/next.svg" alt="Next.js">Next.js</Badge>
                  <Badge icon="/icons/GraphQL Logo (Rhodamine).svg"alt="GraphQL" className="flex">GraphQL</Badge>
                  <Badge icon="/icons/docker-icon.svg" alt="Docker" iconClass="mt-1.5">Docker</Badge>
                  <Badge icon="/icons/git-icon.svg" alt="Git">Git</Badge>
                  <Badge icon="/icons/tailwindcss-icon.svg" alt="Tailwind CSS">Tailwind CSS</Badge>
                  <Badge icon="/icons/adobe-cc-icon.svg" iconClass="py-2" alt="Adobe">Adobe Creative Suite</Badge>
                  <Badge alt="Mapbox GL JS">Mapbox</Badge>
                </div>
              </div>
            </div>
            <div id="tools_and_frameworks" className="max-w-3xl m-auto grid grid-flow-dense auto-rows-max pt-6 pb-10">
                <h2 className="text-center font-bold text-2xl mt-4 text-slate-100 p-4">Concepts and Professional Skills</h2>
                <div className="flex flex-wrap justify-center">
                  <Badge alt="Python">Object-Oriented Programming</Badge>
                  <Badge alt="Java">Data Visualisation</Badge>
                  <Badge alt="JavaScript">SaaS</Badge>
                  <Badge alt="Golang">Test-Driven Design</Badge>
                  <Badge alt="C++" iconClass="mt-1.5">Technical Writing</Badge>
                  <Badge alt="Objective C">Patent Drafting</Badge>
                </div>
              </div>
          </div>
          {/** Contact info, take me to top button, copyright, etc.*/}
          {/* <Contact /> */}

        </div>
      </div>
      <footer className="pointer-events-auto pt-10 pb-32 text-center border-none outline-none bg-slate-900 text-slate-500">
        Copyright © Nick Waggoner 2023. All rights reserved.<br/>
        Built with&nbsp;
        <a href="https://nextjs.org/" rel="noreferer noopener" target="_target" className="hover:underline">Next.js</a>,&nbsp;
        <a href="https://tailwindcss.com/" rel="noreferer noopener" target="_target" className="hover:underline">Tailwind CSS</a>, 
        and deployed with&nbsp;
        <a href="https://vercel.com" rel="noreferer noopener"target="_target" className="hover:underline">Vercel</a>
{/*         <a href="https://tailwindcss.com/" rel="noopener" target="_blank "className="underline">View this project template on GitHub</a> */}
      </footer>
    </main>
  )
}
