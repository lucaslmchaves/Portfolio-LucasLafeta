import type { PortfolioSection } from "../types"

export function ProjetosView({ data }: { data: PortfolioSection }) {
  return (
    <div className="content-block">
      <ol className="timeline">
        {data.projects.map((project) => (
          <li key={project.title} className="timeline__item">
            <span className="timeline__dot" />
            <div className="timeline__card">
              <div className="timeline__image">
                {project.image ? (
                  <img src={project.image} alt={`Captura de tela de ${project.title}`} />
                ) : (
                  <span className="timeline__image-placeholder">imagem em breve</span>
                )}
              </div>
              <h3>{project.title}</h3>
              <ul className="tech-tags">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <p>{project.about}</p>
              <a href={project.url} target="_blank" rel="noreferrer">
                repositório no GitHub ↗
              </a>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
