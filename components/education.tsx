interface EducationProps {
  data: {
    education: Array<{
      school: string
      degree: string
      graduated: string
      description: string
    }>
  }
}

export default function Education({ data }: EducationProps) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" id="educacao">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center overflow-x-auto">
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm font-bold whitespace-pre">║                    EDUCAÇÃO                    ║</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="space-y-4">
          {data.education?.map((edu, index) => (
            <div
              key={index}
              className="border-2 border-border bg-card p-4 sm:p-6 md:p-8 hover:border-accent transition-colors duration-300"
            >
              <div className="font-mono text-xs sm:text-sm space-y-2">
                <div className="text-accent overflow-x-auto whitespace-nowrap">┌─ INSTITUIÇÃO ────────────────────┐</div>
                <div className="text-foreground font-bold pl-2 break-words">{edu.school}</div>
                <div className="text-accent overflow-x-auto whitespace-nowrap">├─ CURSO ─────────────────────────┤</div>
                <div className="text-foreground pl-2 break-words">{edu.degree}</div>
                <div className="text-accent overflow-x-auto whitespace-nowrap">├─ PERÍODO ───────────────────────┤</div>
                <div className="text-muted-foreground pl-2">{edu.graduated}</div>
                <div className="text-accent overflow-x-auto whitespace-nowrap">└──────────────────────────────────┘</div>
                {edu.description && (
                  <div className="text-muted-foreground text-xs mt-2 pl-2 break-words">{edu.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
