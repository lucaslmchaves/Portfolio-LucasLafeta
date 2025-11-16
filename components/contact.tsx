interface ContactProps {
  data: {
    contactmessage: string
    email: string
    address: {
      city: string
      state: string
    }
  }
}

export default function Contact({ data }: ContactProps) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" id="contato">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center overflow-x-auto">
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm font-bold whitespace-pre">║                    CONTATO                     ║</pre>
          <pre className="text-[10px] sm:text-xs md:text-sm whitespace-pre">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border bg-card p-4 sm:p-6 md:p-8 text-center hover:border-accent transition-colors duration-300">
          <div className="font-mono text-xs sm:text-sm space-y-4">
            <p className="text-muted-foreground leading-relaxed break-words px-2">{data.contactmessage}</p>

            <div className="pt-4 border-t border-border">
              <div className="text-accent mb-2 text-[10px] sm:text-xs">┌───────────────────────┐</div>
              <a
                href={`mailto:${data.email}`}
                className="text-foreground hover:text-accent transition-colors underline break-all"
              >
                {data.email}
              </a>
              <div className="text-accent mt-2 text-[10px] sm:text-xs">└───────────────────────┘</div>
            </div>

            <div className="text-muted-foreground text-xs">
              {data.address.city}, {data.address.state}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
