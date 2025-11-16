interface AboutProps {
  data: {
    bio: string
    email: string
    phone: string
    social: Array<{
      name: string
      url: string
      className: string
    }>
    profiles?: Array<{
      name: string
      url: string
      className: string
    }>
  }
}

export default function About({ data }: AboutProps) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" id="sobre">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center overflow-x-auto">
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm font-bold whitespace-pre">║                    SOBRE MIM                   ║</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border p-4 sm:p-6 md:p-8 bg-card hover:border-accent transition-colors duration-300">
          <div className="font-mono text-xs sm:text-sm leading-relaxed space-y-4">
            <p className="text-foreground">
              <span className="text-accent">{">> "}</span>
              {data.bio}
            </p>
          </div>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 font-mono text-xs sm:text-sm">
              <div className="break-all">
                <span className="text-accent">email:</span>{" "}
                <a
                  href={`mailto:${data.email}`}
                  className="text-muted-foreground hover:text-accent transition-colors underline"
                >
                  {data.email}
                </a>
              </div>
              <div>
                <span className="text-accent">telefone:</span> <span className="text-muted-foreground">{data.phone}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-4">
              {data.social?.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-2 hover:bg-accent/10"
                >
                  [{social.name}]
                </a>
              ))}
              {data.profiles?.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-2 hover:bg-accent/10"
                >
                  [{profile.name}]
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
