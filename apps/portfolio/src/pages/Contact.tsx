import '@/styles/contact.css'
import { useState, type FormEvent } from 'react'
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'

export function Contact() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')

  const submit = (event:FormEvent) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'visitor'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:jagzao@gmail.com?subject=${subject}&body=${body}`
  }

  return <div className="section-shell pt-32">
    <p className="section-kicker">Contact</p>
    <h1 className="section-title">Let’s talk about the difficult part of your system.</h1>
    <p className="mt-4 max-w-2xl text-[#B9B9B4]">Open to Senior Software Engineer / Senior Backend / Senior Full-Stack / Applied AI opportunities, especially remote US/LATAM teams.</p>

    <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <aside className="premium-panel p-6">
        <h2 className="text-left text-xl font-bold text-white">Direct channels</h2>
        <div className="mt-6 space-y-3">
          <a href="mailto:jagzao@gmail.com" className="contact-row"><Mail className="h-5 w-5 text-[#F2C94C]"/><span><strong>Email</strong><small>jagzao@gmail.com</small></span></a>
          <a href="https://www.linkedin.com/in/jagzao/" target="_blank" rel="noreferrer" className="contact-row"><Linkedin className="h-5 w-5 text-[#F2C94C]"/><span><strong>LinkedIn</strong><small>linkedin.com/in/jagzao</small></span></a>
          <a href="https://github.com/jagzao" target="_blank" rel="noreferrer" className="contact-row"><Github className="h-5 w-5 text-[#F2C94C]"/><span><strong>GitHub</strong><small>github.com/jagzao</small></span></a>
          <div className="contact-row"><MapPin className="h-5 w-5 text-[#D01920]"/><span><strong>Location</strong><small>Mexico · Remote US/LATAM</small></span></div>
        </div>
      </aside>

      <form onSubmit={submit} className="premium-panel p-6">
        <h2 className="text-left text-xl font-bold text-white">Send a message</h2>
        <p className="mt-2 text-sm text-[#7E7E78]">This opens your email client; the portfolio does not fake or store form submissions.</p>
        <div className="mt-6 grid gap-4">
          <label><span className="mb-2 block text-xs uppercase tracking-[.16em] text-[#D4AF37]">Name</span><input required minLength={2} value={name} onChange={e=>setName(e.target.value)} className="lab-input"/></label>
          <label><span className="mb-2 block text-xs uppercase tracking-[.16em] text-[#D4AF37]">Email</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="lab-input"/></label>
          <label><span className="mb-2 block text-xs uppercase tracking-[.16em] text-[#D4AF37]">Message</span><textarea required minLength={10} rows={7} value={message} onChange={e=>setMessage(e.target.value)} className="lab-input resize-y"/></label>
          <button type="submit" className="btn-gold justify-self-start"><Send className="h-4 w-4"/> Open email</button>
        </div>
      </form>
    </div>
  </div>
}
