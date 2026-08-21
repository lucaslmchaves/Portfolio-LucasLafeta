import type { MainData } from "../types"

export function ContatoView({ data }: { data: MainData }) {
  return (
    <div className="content-block">
      <div className="contact-icons">
        <a href={`mailto:${data.email}`}>E-mail</a>
        <a
          href={`https://wa.me/55${data.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        {data.social.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
            {s.name}
          </a>
        ))}
      </div>
      <p className="content-block__note">
        Formulário de contato com envio por e-mail chega na Sprint 2.
      </p>
    </div>
  )
}
