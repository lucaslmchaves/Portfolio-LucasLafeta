import type { PortfolioSection } from "../types"

export function ProjetosView({ data }: { data: PortfolioSection }) {
  return (
    <div className="content-block">
      <ul className="project-list">
        {data.projects.map((project) => (
          <li key={project.title} className="project-list__item">
            <h3>{project.title}</h3>
            <p>{project.about}</p>
            <a href={project.url} target="_blank" rel="noreferrer">
              repositório no GitHub ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="content-block__note">
        Linha do tempo, tecnologias por projeto e imagens/GIFs entram na Sprint 2.
      </p>
    </div>
  )
}
