interface ExperienceProps {
  data: {
    work: Array<{
      company: string
      title: string
      years: string
      description?: string
    }>
  }
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" id="experiencia">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center overflow-x-auto">
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm font-bold whitespace-pre">║                  EXPERIÊNCIA                   ║</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="space-y-4">
          {data.work?.map((job, index) => (
            <div
              key={index}
              className="border border-border bg-card hover:border-accent transition-colors duration-300"
            >
              <div className="font-mono text-xs sm:text-sm p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="text-accent mb-1 truncate">╔═══ {job.company}</div>
                    <div className="text-foreground font-semibold pl-4 break-words">║ {job.title}</div>
                    <div className="text-muted-foreground pl-4 mt-1">╚═══ {job.years}</div>
                    {job.description && (
                      <div className="text-muted-foreground text-xs leading-relaxed mt-3 pl-4 break-words">
                        {job.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
