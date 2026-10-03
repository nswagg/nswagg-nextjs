export const profile = {
  name: 'Nick Waggoner',
  introduction: "I'm Nick Waggoner. I build software and games. Here are some projects, experiments, and videos I've worked on.",
  background: 'My professional work spans software, production debugging, automation, and data systems.',
  links: {
    linkedin: 'https://www.linkedin.com/in/nswagg/',
    github: 'https://github.com/nswagg',
    youtube: 'https://www.youtube.com/@SwaggyWaggy/videos',
    itch: 'https://nswagg.itch.io/',
  },
}

// Optional media and extra links let cards grow without changing their layout.
export const projects = [
  {
    id: 'rock-paper-planes',
    title: 'Rock Paper Planes',
    description: 'Dodge, dash, and slice through swarms of paper planes.',
    category: 'Featured game',
    status: 'Current browser demo',
    featured: true,
    coverStyle: 'planes',
    image: '/images/projects/rock-paper-planes-poster.jpg',
    imageAlt: 'Rock Paper Planes gameplay with paper enemies on a lined notebook page',
    previewVideo: '/videos/rock-paper-planes-highlight.mp4',
    links: [{ label: 'Play the demo', href: 'https://nswagg.itch.io/rock-paper-planes' }],
  },
  {
    id: 'polygon-drifter',
    title: 'Polygon Drifter',
    description: 'Hold longer drifts, use boost pads, and avoid the walls to keep your combo going.',
    category: 'Drifting',
    status: 'Browser demo',
    coverStyle: 'drifter',
    image: '/images/projects/polygon-drifter.png',
    imageAlt: 'Polygon Drifter gameplay with the drift loop and polygon obstacles',
    previewVideo: null,
    links: [{ label: 'Play the demo', href: 'https://nswagg.itch.io/polygon-drifter' }],
  },
  {
    id: 'parried',
    title: 'Parried',
    description: 'A visual novel about a sword looking for someone to wield it.',
    category: 'Visual novel',
    status: 'Game jam',
    image: '/images/projects/parried.png',
    imageAlt: 'Parried cover art with the game title and sword illustration',
    previewVideo: null,
    credit: 'Collaboration with Glacier15. Pirate Software Game Jam 16.',
    links: [{ label: 'Play on itch.io', href: 'https://glacier15.itch.io/parried' }],
  },
]

// Keep newest first. These are curated uploads, not a live publishing feed.
export const videos = [
  {
    id: 'gK-OBEcZZOE',
    title: "Let's Make a Game! | Airplane Game - Devlog #2",
    description: 'The second devlog for the airplane game.',
    category: 'Game devlog',
    duration: '2:20',
    href: 'https://www.youtube.com/watch?v=gK-OBEcZZOE',
    image: 'https://i.ytimg.com/vi/gK-OBEcZZOE/hqdefault.jpg',
  },
  {
    id: 'PIAZb91ZOR8',
    title: "Let's Make a Game! | Airplane Game - Devlog #1",
    description: 'The first devlog for the airplane game.',
    category: 'Game devlog',
    duration: '2:58',
    href: 'https://www.youtube.com/watch?v=PIAZb91ZOR8',
    image: 'https://i.ytimg.com/vi/PIAZb91ZOR8/hqdefault.jpg',
  },
  {
    id: '3kJDX4rASo0',
    title: 'Best VR Game or Best Physics Simulator? | Boneworks Pt. 1',
    description: 'An older video exploring Boneworks in VR.',
    category: 'From the archive',
    href: 'https://www.youtube.com/watch?v=3kJDX4rASo0',
    image: 'https://i.ytimg.com/vi/3kJDX4rASo0/hqdefault.jpg',
  },
]

export const writing = [
  {
    title: 'Outrunning Digital Realism',
    description: 'An essay on virtualization and its social implications.',
    href: 'https://sway.office.com/n9kebLBZB7MCPqgF?ref=Link',
  },
]
