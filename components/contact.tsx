'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-2xl px-4 pt-32 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_15%_50%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]"
        />
        <div className="flex flex-col gap-10">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl">
              Bringing your ideas to life.
              <br />
              Let&apos;s turn your vision into reality
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Have a project in mind or just want to chat? Let&apos;s connect!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-semibold">Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="contact@example.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-semibold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={status === 'sending'}>
                  <Send className="size-4" />
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : 'Send'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
