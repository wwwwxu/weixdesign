import DeckContainer from '@/components/deck/DeckContainer'
import HeroCard from '@/components/deck/HeroCard'
import ProjectCard from '@/components/deck/ProjectCard'
import StickerCard from '@/components/deck/StickerCard'
import TreeShadow from '@/components/layout/TreeShadow'

const PROJECTS = [
  {
    slug: 'upfront',
    title: 'Upfront',
    subtitle: 'Scaling a FMCG brand from scrappy startup to 600% growth through design.',
    tags: ['Website Design', 'Web'],
    year: '2024',
    cardNumber: '02 / 04',
    videoSrc: '/work/upfront/v2/V2_Site_flow.webm',
    href: '/work/upfront',
    logoSrc: '/logo-upfront.png',
  },
  {
    slug: 'visitor-system',
    title: 'Visitor System',
    subtitle: 'An all-in-one platform replacing paper-based chaos for 4,800+ annual visitors across 4 locations.',
    tags: ['Product Design', '0→1'],
    year: '2021',
    cardNumber: '03 / 04',
    imageSrc: '/cover-visitor-system.jpg',
    imageBg: '#F2F2F2',
    href: '/work/visitor-system',
    logoSrc: '/logo-visitor-system.png',
  },
  {
    slug: 'suggestion-system',
    title: 'Suggestion System',
    subtitle: 'A 0-to-1 internal platform that turns employee improvement ideas into tracked, implemented action.',
    tags: ['Product Design', '0→1'],
    year: '2022',
    cardNumber: '04 / 04',
    href: '/work/suggestion-system',
    logoSrc: '/logo-suggestion-system.png',
    imageSrc: '/cover-suggestion.png',
    imageBg: '#EEEDF8',
  },
]

export default function Home() {
  return (
    <>
      <TreeShadow />

      {/* Social icons — homepage only */}
      <div
        className="max-sm:hidden flex flex-col items-center gap-3"
        style={{
          position: 'fixed',
          right: '40px',
          bottom: '40px',
          zIndex: 50,
        }}
      >
        <a href="https://www.linkedin.com/in/weixu95/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/linkedin.svg" width={28} height={28} alt="LinkedIn" />
        </a>
        <a href="https://www.behance.net/vivixu95" target="_blank" rel="noopener noreferrer" aria-label="Behance">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/behance.svg" width={28} height={28} alt="Behance" />
        </a>
        <a href="mailto:weixu8@asu.edu" aria-label="Email">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/mail.svg" width={28} height={28} alt="Email" />
        </a>
      </div>

      <DeckContainer>
      <HeroCard />
      {PROJECTS.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
      <StickerCard />
    </DeckContainer>
    </>
  )
}
