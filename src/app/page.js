import Badge from "../components/Badge";
import Image from "next/image";
import LinkButton from "../components/LinkButton";
import NavItem from "../components/NavItem";
import Navbar from "../components/Navbar";
import ProjectItem from "../components/ProjectItem";
import Projects from "../components/Projects";
import ants from "@/images/ants3x2.png";
import cyborg from "@/images/cyborg3x2.jpg";
import map from "@/images/map3x2.png";
import robot from "@/images/robot3x2.jpg";
import xr from "@/images/xr3x2.jpg";

/* Opening PDFs in new tab: https://github.com/vercel/next.js/discussions/25981#discussioncomment-1039648 */
export default function Landing() {
  return (
    <main className="min-h-full relative text-slate-100">
      <div className="overflow-hidden">
        <div id="navbar">
          <Navbar>
            <NavItem href="#home" isActive={true}>Home</NavItem>
            <NavItem href="#projects">Projects</NavItem>
            <NavItem href="#skills">Skills</NavItem>
          </Navbar>
          <div className="fixed flex left-0 top-0 mx-6 z-20 text-slate-100">
            <LinkButton override="" href="#home" target="">
              <div className="fixed flex items-center">
                <Image src="/icons/N.png" alt="nswagg.com" height={32} width={32} />
                <p className="px-4 pt-1 font-semibold tracking-wide">Nick Waggoner</p>
              </div>
            </LinkButton>
          </div>
          <div className="fixed flex right-0 top-0 m-5 space-x-4 lg:space-x-6 z-20">
            <LinkButton override="" href="https://github.com/nswagg" target="_blank">
              <Image className="hover:invert hover:brightness-50" title="GitHub" src="/icons/GitHub_Invertocat_White.png" alt="Nick Waggoner GitHub Profile" width="28" height="28" />
            </LinkButton>
            <LinkButton override="" href="https://www.linkedin.com/in/nswagg/" target="_blank">
              <Image className="hover:invert hover:saturate-0" title="LinkedIn" src="/icons/linkedIn.png" alt="Nick Waggoner LinkedIn Profile" width="28" height="28" />
            </LinkButton>
          </div>
        </div>

        <section id="home" className="md:container m-auto flex pt-20">
          <div className="justify-center min-h-screen lg:min-h-0 lg:h-auto mx-auto bg-slate-900/70 my-16 py-8 px-6 sm:px-14 lg:rounded-2xl shadow-2xl border border-slate-800">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="content-center lg:py-14">
                <p className="inline-block rounded-full border border-teal-400/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-teal-300 mb-5">Software Engineer</p>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">Nick Waggoner</h1>
                <p className="mt-5 text-lg text-slate-300 leading-relaxed">Software engineer focused on production-ready web applications, data-rich interfaces, and clear product execution.</p>
                <div className="mt-8 lg:space-x-3 lg:py-3 flex flex-wrap pointer-events-auto">
                  <LinkButton href="/docs/waggoner_resume26.pdf">Download Resume</LinkButton>
                  <LinkButton href="https://www.linkedin.com/in/nswagg/" target="_blank">Connect on LinkedIn</LinkButton>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-8 shadow-xl">
                <h2 className="font-bold text-2xl">Professional Focus</h2>
                <p className="mt-3 text-slate-300">Building maintainable software that balances performance, usability, and practical business outcomes.</p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">Frontend engineering with React and Next.js</div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">Data visualization and geospatial experiences</div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">API integration, delivery, and iteration in production</div>
                </div>
                <p className="mt-6 font-semibold text-teal-300">Open to software engineering opportunities</p>
                <p className="text-slate-400">Project, contract, and full-time collaboration</p>
              </div>
            </div>
            <div className="px-2 md:px-4 mt-12 italic md:text-xl font-semibold">
              <h2 className="font-bold text-3xl text-teal-300">Innovation</h2>
              <p className="mt-2 text-slate-300">Turning ideas into reliable products that people actually use.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="pt-0 md:pt-20 pb-14 bg-gradient-to-b from-transparent to-slate-900/60">
          <Projects>
            <ProjectItem title="Particle Swarm Optimization with Dynamic Targets" href="https://github.com/nswagg/psoMT" image={ants} description="Particle swarm optimization experiment with moving and degrading targets. The project evolved from ant-colony concepts into a swarm model with velocity-aware convergence behavior." />
            <ProjectItem title="NASA Landslide Data Visualization" href="/nasa" image={map} description="Interactive mapping of public NASA landslide records from 1988-2017 using GIS tile layers and event filtering." />
            <ProjectItem title="Article: Outrunning Digital Realism" href="https://sway.office.com/n9kebLBZB7MCPqgF?ref=Link" image={xr} attr="Photo by XR Expo on Unsplash" description="A discussion on escalating virtualization and social implications tied to immersion, behavior, and identity." />
            <ProjectItem title="Real-World Cyborgs Video Essay" image={cyborg} href="https://youtu.be/UTURHopCHYs" description="Analysis of current augmentation technology and ethical questions around replacing, supplementing, and extending human capabilities." />
            <ProjectItem title="Healthcare Robotics Lecture" image={robot} href="https://youtu.be/-ppYXPCEHqY" attr="Photo by Possessed Photography on Unsplash" description="Short lecture on healthcare robotics, autonomy, and responsible AI adoption in human-centered systems." />
          </Projects>
        </section>

        <section id="skills">
          <div className="py-20 px-6 md:px-16 bg-slate-950/50 border-y border-slate-800">
            <div className="flex flex-wrap md:flex-nowrap container mx-auto">
              <div id="programming_languages" className="max-w-3xl m-auto grid grid-flow-dense auto-rows-max pt-6 pb-10">
                <h2 className="text-center font-bold text-2xl mt-4 text-slate-100 p-4">Programming Languages</h2>
                <div className="flex flex-wrap 2xl:justify-start justify-center select-none">
                  <Badge icon="/icons/python-icon.svg" alt="Python">Python</Badge>
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
                  <Badge icon="/icons/GraphQL Logo (Rhodamine).svg" alt="GraphQL" className="flex">GraphQL</Badge>
                  <Badge icon="/icons/docker-icon.svg" alt="Docker" iconClass="mt-1.5">Docker</Badge>
                  <Badge icon="/icons/git-icon.svg" alt="Git">Git</Badge>
                  <Badge icon="/icons/tailwindcss-icon.svg" alt="Tailwind CSS">Tailwind CSS</Badge>
                  <Badge icon="/icons/adobe-cc-icon.svg" iconClass="py-2" alt="Adobe">Adobe Creative Suite</Badge>
                  <Badge alt="Mapbox GL JS">Mapbox</Badge>
                </div>
              </div>
            </div>
            <div className="max-w-3xl m-auto grid grid-flow-dense auto-rows-max pt-6 pb-10">
              <h2 className="text-center font-bold text-2xl mt-4 text-slate-100 p-4">Concepts and Professional Skills</h2>
              <div className="flex flex-wrap justify-center">
                <Badge alt="Object-Oriented Programming">Object-Oriented Programming</Badge>
                <Badge alt="Data Visualization">Data Visualization</Badge>
                <Badge alt="SaaS">SaaS</Badge>
                <Badge alt="Test-Driven Design">Test-Driven Design</Badge>
                <Badge alt="Technical Writing">Technical Writing</Badge>
                <Badge alt="Patent Drafting">Patent Drafting</Badge>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="pointer-events-auto pt-10 pb-20 text-center border-none outline-none bg-slate-950 text-slate-400 text-sm">
        Copyright (c) Nick Waggoner 2023. All rights reserved.
        <br />
        Built with <a href="https://nextjs.org/" rel="noreferer noopener" target="_target" className="hover:underline text-teal-300">Next.js</a>, <a href="https://tailwindcss.com/" rel="noreferer noopener" target="_target" className="hover:underline text-teal-300">Tailwind CSS</a>, and deployed with <a href="https://vercel.com" rel="noreferer noopener" target="_target" className="hover:underline text-teal-300">Vercel</a>.
      </footer>
    </main>
  );
}
