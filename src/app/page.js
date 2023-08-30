import Image from "next/image";
import NavItem from "./components/NavItem";
import Navbar from "./components/Navbar";
import pfp from "@/images/NickSq.jpg"
import LinkButton from "./components/LinkButton";
import Badge from "./components/Badge";
import Projects from "./components/Projects";
import Link from "next/link";
import ProjectItem from "./components/ProjectItem";

/* Opening PDFs in new tab: https://github.com/vercel/next.js/discussions/25981#discussioncomment-1039648 */
export default function Landing() {
  return (
    
    <main className="min-h-full">
      <div className="bg-slate-100 relative">
        <Navbar>
          <NavItem href="#home" isActive={true}>Home</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#skills">Skills</NavItem>
        </Navbar>
        <div className="fixed flex left-0 top-0 mx-6">
        <LinkButton override="" href="#home" target="">
          <div className="fixed flex">
            <Image src="/icons/N.png" alt="nswagg.com" height={32} width={32}/>
            <p className="hidden md:block px-4 pt-1 font-semibold font-serif">Nick Waggoner</p>
          </div>
        </LinkButton>
        </div>
        <div className="fixed flex right-0 top-0 m-6 space-x-4 lg:space-x-6">
          <LinkButton override="" href="https://github.com/nswagg" target="_blank">
              <Image className="hover:invert hover:brightness-200" title="GitHub" src="/icons/github-mark.png" alt="Nick Waggoner's GitHub Profile" width="28" height="28"/>  
          </LinkButton>
          <LinkButton override="" href="https://www.linkedin.com/in/nswagg/" target="_blank">
              <Image className="hover:invert hover:saturate-0" title="LinkedIn" src="/icons/linkedIn.png" alt="Nick Waggoner's LinkedIn® Profile" width="28" height="28"/>
          </LinkButton>
        </div>
        <div id="home" className="md:container mx-auto flex h-screen ">
          <div className="justify-center m-auto bg-slate-700 bg-opacity-20 py-12 md:px-20 md:rounded-xl shadow-lg">
            <div className="flex flex-wrap justify-center lg:flex-nowrap lg:justify-normal">
              <div className=" mx-auto content-center p-10 px-8 lg:mt-8 lg:pt-36 lg:pb-24  ">
                <h1 className="text-5xl font-bold">Nick Waggoner</h1>
                <p className="m-4 font-semibold">Software Engineering<br/>Data Visualisation<br/>Web Design</p>
                <div className="lg:space-x-3 lg:py-3 flex flex-wrap pointer-events-auto">
                  <LinkButton href="/docs/WaggonerResume8_22_23.pdf">View Resume</LinkButton>
                  <LinkButton href="/docs/WaggonerCVFull8_22_23.pdf">View Curriculum Vita</LinkButton>
                </div>
              </div>
              <div className="items-center justify-center lg:justify-normal text-center order-first">
                <Image src={pfp} alt={"Nick Waggoner Portrait"} className="select-none mx-auto my-4 w-40 lg:w-80 aspect-square rounded-full  shadow-lg "/>
                <p className="font-semibold">University of Colorado Colorado Springs</p> {/** TODO: Modal for BI Explanation? Maybe alert */}
                <p className="italic">Bachelor of Innovation in Computer Science<br/>Collateral: Creative Communication</p>
              </div>
              </div>
            <div className="px-14 m-4 italic md:text-2xl font-semibold justify-center">
              <h2 className=" font-bold text-3xl">Innovation</h2>
              <p className="flex xl:indent-6 justify-center">in·​no·​va·​tion (noun): The process of transforming ideas into impact</p>
            </div>
          </div>
        </div>
        <div id="projects" className="bg-slate-700 bg-opacity-20 py-20">
          <Projects>
            <ProjectItem title="Particle Swarm Optimization with Dynamic Targets" href="https://github.com/nswagg/psoMT" image="/images/ants.png"description="Particle Swarm Optimization algorithm experiment with moving/degrading target Was initially designed to implement Ant Colony Optimization, but has been refactored for particle swarm with targets decaying on convergence (inversely proportional to swarm velocity). Decay rate defined as carry_capacity of particles defines the number of particles required to be in proximity to target for it to decay self.particles_for_decay = self.NumParticles * (1 - self.w) if 0 < w <= 1 else self.NumParticles"/>
            <ProjectItem title="CFA GIS Delivery Zone Optimization" description="Mapbox GIS visualization using historic delivery data to inform delivery zone optimization through speed of service"/>
            <ProjectItem title="NASA Landslide Data Visualization" href="/nasa" image="/images/map.png" description="Includes public NASA landslide data from 1988-2017 Visualizes landslide dataset on a GIS tileset using the Mapbox tool."/>
            <ProjectItem title="Outrunning Digital Realism" href="https://sway.office.com/n9kebLBZB7MCPqgF?ref=Link" description="As reality virtualization becomes more prevalent, virtual reality threatens both physical interaction and the instigation of severe social dilemmas revolving around escapism."/>
            <ProjectItem title="REAL-WORLD CYBORGS | Human Augmentation Video Essay - Deus Ex: Human Revolution" description="Discussion of current technology, technological development tracjectory, and social and ethical topics relating to replacing, supplementing, and superseding human abilities through use of tools and augmentation."/>
            <ProjectItem title="Healthcare Robotics Lecture: Autonomous Agents and Human Augmentation" href="https://www.youtube.com/watch?v=-ppYXPCEHqY" description="Short Lecture on current healthcare robotics systems, artificial intelligence, and ethics of robotics in relation to the benefit brought about by these technologies."/>
          </Projects> 
        </div>
        <div id="skills">
          <div className=" bg-slate-700 bg-opacity-30">
            <div className="flex container mx-auto">
              <div id="programming_languages" className="m-auto grid grid-flow-dense auto-rows-max">
                <h2 className="text-center font-semibold text-xl mt-4">Programming Languages</h2>
                <div className="flex flex-wrap auto-cols-justify-around select-none">
                  <Badge icon="/icons/python-icon.svg" alt="Python">Python</Badge>
                  <Badge icon="/icons/java-icon.svg" alt="Java">Java</Badge>
                  <Badge icon="/icons/javascript-icon.svg" alt="JavaScript">JavaScript</Badge>
                  <Badge icon="/icons/golang-icon.svg" alt="Golang">Golang</Badge>
                  <Badge icon="/icons/c++-icon2.svg" alt="C++" iconClass="mt-1.5">C++</Badge>
                  <Badge icon="/icons/c-icon.svg" alt="Objective C">Objective C</Badge>
                  <Badge icon="/icons/html5-icon.svg" alt="HTML">HTML</Badge>
                  <Badge icon="/icons/css-icon.svg" alt="CSS">CSS</Badge>
                  <Badge icon="/icons/ruby-icon.svg" alt="Ruby on Rails">Ruby on Rails</Badge>
                  <Badge icon="/icons/linux-icon.svg" alt="Linux" size={40}>Linux</Badge>
                </div>
              </div>
              <div id="tools" className="container m-auto">
                <h2 className="justify-center font-semibold">Programming Languages</h2>
                <div>
                  
                </div>
              </div>
              <div>
              <div id="other" className="container">
                <h2>Programming Languages</h2>
                <div>
                  
                </div>
              </div>
              </div>
            </div>
          </div>
          {/** Contact info, take me to top button, copyright, etc.*/}

        </div>
      </div>
      <footer className="pointer-events-auto pt-10 pb-32 text-center border-none outline-none bg-slate-900 text-slate-500">
        Copyright © Nick Waggoner 2023. All rights reserved.<br/>
        <a href="https://tailwindcss.com/" rel="noopener" target="_blank "className="underline">View this project template on GitHub</a>
      </footer>
    </main>
  )
}
