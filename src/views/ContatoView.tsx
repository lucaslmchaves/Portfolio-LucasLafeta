import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import type { MainData } from "../types"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  nome: string
  email: string
  mensagem: string
}

interface FormErrors {
  nome?: string
  email?: string
  mensagem?: string
}

export function ContatoView({ data }: { data: MainData }) {
  const [form, setForm] = useState<FormState>({ nome: "", email: "", mensagem: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {}
    if (!values.nome.trim()) next.nome = "Diz seu nome pra eu saber com quem falo :)"
    if (!values.email.trim()) next.email = "Precisa de um e-mail pra eu poder responder."
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "Esse e-mail não parece válido."
    if (!values.mensagem.trim()) next.mensagem = "Escreve sua mensagem aqui."
    return next
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setSent(false)
      return
    }

    const subject = encodeURIComponent(`Contato pelo portfólio — ${form.nome}`)
    const body = encodeURIComponent(`${form.mensagem}\n\n— ${form.nome} (${form.email})`)
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  function handleChange(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

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

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label>
          Nome
          <input type="text" value={form.nome} onChange={handleChange("nome")} />
          {errors.nome && <span className="contact-form__error">{errors.nome}</span>}
        </label>

        <label>
          E-mail
          <input type="email" value={form.email} onChange={handleChange("email")} />
          {errors.email && <span className="contact-form__error">{errors.email}</span>}
        </label>

        <label>
          Mensagem
          <textarea rows={4} value={form.mensagem} onChange={handleChange("mensagem")} />
          {errors.mensagem && <span className="contact-form__error">{errors.mensagem}</span>}
        </label>

        <button type="submit" className="pixel-button">
          Enviar
        </button>

        {sent && (
          <p className="content-block__note">
            Deve abrir seu programa de e-mail com a mensagem pronta pra enviar.
          </p>
        )}
      </form>
    </div>
  )
}
