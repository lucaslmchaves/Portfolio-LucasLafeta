interface HeroProps {
  data: {
    name: string
    occupation: string
  }
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 pt-20 md:pt-24">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        <div className="font-mono leading-tight w-full flex justify-center">
          <pre className="text-[6px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base text-accent whitespace-pre">
            {`
██╗     ██╗   ██╗ ██████╗ █████╗ ███████╗    ██╗      █████╗ ███████╗███████╗████████╗ █████╗ 
██║     ██║   ██║██╔════╝██╔══██╗██╔════╝    ██║     ██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗
██║     ██║   ██║██║     ███████║███████╗    ██║     ███████║█████╗  █████╗     ██║   ███████║
██║     ██║   ██║██║     ██╔══██║╚════██║    ██║     ██╔══██║██╔══╝  ██╔══╝     ██║   ██╔══██║
███████╗╚██████╔╝╚██████╗██║  ██║███████║    ███████╗██║  ██║██║     ███████╗   ██║   ██║  ██║
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝   ╚═╝  ╚═╝
`}
          </pre>
        </div>

        <div className="text-center space-y-3 md:space-y-4 px-4 w-full">
          <h1 className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{data.name}</h1>
          <div className="font-mono text-xs sm:text-sm md:text-base text-muted-foreground border-t-2 border-b-2 border-accent/30 py-2 px-4 w-full">
            <span className="text-accent">{">"}</span> {data.occupation}
          </div>
        </div>
      </div>

      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-accent/30 font-mono text-xs md:text-sm">╔═══</div>
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-accent/30 font-mono text-xs md:text-sm">═══╗</div>
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-accent/30 font-mono text-xs md:text-sm">╚═══</div>
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-accent/30 font-mono text-xs md:text-sm">═══╝</div>
    </section>
  )
}
