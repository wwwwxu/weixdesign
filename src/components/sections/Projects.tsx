'use client'

import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const projects = [
  {
    id: '01',
    title: 'Horizon Brand System',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Identity', 'Print', 'Motion'],
    color: '#C8C4BC',
    span: 'col-span-7',
    aspect: 'aspect-[4/3]',
  },
  {
    id: '02',
    title: 'Temporal Flow',
    category: 'Motion Design',
    year: '2024',
    tags: ['Motion', 'AE'],
    color: '#2E2E2E',
    textLight: true,
    span: 'col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    id: '03',
    title: 'Echo Interface',
    category: 'Product Design',
    year: '2025',
    tags: ['UI/UX', 'Figma'],
    color: '#E8E4DC',
    span: 'col-span-5',
    aspect: 'aspect-[5/4]',
  },
  {
    id: '04',
    title: 'Meridian Editorial',
    category: 'Print / Editorial',
    year: '2025',
    tags: ['Print', 'Typography'],
    color: '#1A1A1A',
    textLight: true,
    span: 'col-span-7',
    aspect: 'aspect-[5/4]',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      className={`group ${project.span} cursor-pointer`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      {/* Image area */}
      <div
        className={`relative w-full ${project.aspect} overflow-hidden border border-[#2E2E2E]/20`}
        style={{ backgroundColor: project.color }}
      >
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/60 transition-all duration-500 flex items-center justify-center">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#F4F3EF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            View Project →
          </span>
        </div>

        {/* Corner label */}
        <div
          className={`absolute top-4 left-4 font-sans text-[10px] tracking-[0.25em] font-semibold ${project.textLight ? 'text-[#F4F3EF]/50' : 'text-[#1A1A1A]/40'}`}
        >
          {project.id}
        </div>

        {/* Category tag (bottom-right) */}
        <div
          className={`absolute bottom-4 right-4 font-sans text-[9px] tracking-[0.25em] uppercase ${project.textLight ? 'text-[#F4F3EF]/50' : 'text-[#1A1A1A]/40'}`}
        >
          {project.category}
        </div>
      </div>

      {/* Project info */}
      <div className="pt-4 pb-2 flex items-start justify-between">
        <div>
          <h3 className="font-sans text-[14px] font-semibold tracking-[-0.01em] text-[#1A1A1A] leading-tight">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#6B6B6B] border border-[#2E2E2E]/30 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="font-sans text-[11px] text-[#AFAFAF] mt-0.5">{project.year}</span>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="border-b-2 border-[#1A1A1A] py-20 px-10">

      {/* ── Section header ── */}
      <div className="flex items-start gap-8 mb-14">
        {/* Vertical Chinese header */}
        <motion.div
          className="writing-vertical font-serif-cn text-[15px] tracking-[0.5em] text-[#1A1A1A] leading-none pt-1"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          「作品集」
        </motion.div>

        <div className="flex-1 border-t-2 border-[#1A1A1A] pt-5">
          <motion.div
            className="flex items-baseline justify-between"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#1A1A1A] font-semibold">
              Selected Work
            </h2>
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#AFAFAF]">
              2023 – 2025
            </span>
          </motion.div>
          <motion.p
            className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed mt-2 max-w-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          >
            A curated selection of brand, motion, and digital work — each project a conversation between
            concept and craft.
          </motion.p>
        </div>
      </div>

      {/* ── Asymmetric Grid ── */}
      <div className="grid grid-cols-12 gap-px bg-[#2E2E2E]/10">
        {/* Row 1 */}
        <div className="col-span-7 bg-[#F4F3EF] p-4">
          <ProjectCard project={projects[0]} index={0} />
        </div>
        <div className="col-span-5 bg-[#F4F3EF] p-4">
          <ProjectCard project={projects[1]} index={1} />
        </div>
        {/* Row 2 — reversed proportions */}
        <div className="col-span-5 bg-[#F4F3EF] p-4">
          <ProjectCard project={projects[2]} index={2} />
        </div>
        <div className="col-span-7 bg-[#F4F3EF] p-4">
          <ProjectCard project={projects[3]} index={3} />
        </div>
      </div>

      {/* ── All works link ── */}
      <motion.div
        className="mt-12 flex justify-end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a
          href="#"
          className="group font-sans text-[11px] tracking-[0.25em] uppercase text-[#1A1A1A] flex items-center gap-3"
        >
          <span className="border-b border-[#1A1A1A] pb-0.5 group-hover:text-[#6B6B6B] group-hover:border-[#6B6B6B] transition-colors duration-200">
            View All Work
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </motion.div>
    </section>
  )
}
