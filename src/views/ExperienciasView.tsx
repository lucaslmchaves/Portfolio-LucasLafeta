import type { ResumeSection } from "../types"

export function ExperienciasView({ data }: { data: ResumeSection }) {
  return (
    <div className="content-block">
      <ul className="project-list">
        {data.work.map((job) => (
          <li key={job.company} className="project-list__item">
            <h3>
              {job.title} · {job.company}
            </h3>
            <p className="content-block__lead">{job.years}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
