interface ProjectsProps {
  data: {
    projects: Array<{
      title: string
      about: string
      url: string
      image?: string
    }>
  }
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" id="projetos">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center overflow-x-auto">
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm font-bold whitespace-pre">║                    PROJETOS                    ║</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.projects?.map((project, index) => (
            <div
              key={index}
              className="border-2 border-border bg-card hover:border-accent transition-all duration-300 group"
            >
              <div className="font-mono p-4 sm:p-6">
                <div className="text-accent text-[10px] sm:text-xs md:text-sm mb-2 overflow-x-auto">╔═════════════════════════════════╗</div>
                <h3 className="text-foreground font-bold text-sm md:text-base mb-2 pl-2 break-words">║ {project.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2 break-words">║ {project.about}</p>
                <div className="text-accent text-[10px] sm:text-xs md:text-sm mb-2 overflow-x-auto">╚═════════════════════════════════╝</div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-2 mt-2 hover:bg-accent/10"
                >
                  [ver projeto →]
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
