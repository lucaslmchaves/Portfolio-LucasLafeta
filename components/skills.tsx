interface SkillsProps {
  data: {
    skills: Array<{
      name: string
      level: string
    }>
  }
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" id="habilidades">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center overflow-x-auto">
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm font-bold whitespace-pre">║                  HABILIDADES                   ║</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border bg-card p-4 sm:p-6 md:p-8 hover:border-accent transition-colors duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {data.skills?.map((skill, index) => (
              <div key={index} className="font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-accent">▸</span>
                  <span className="text-foreground break-words">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
