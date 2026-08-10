import React, { useRef, useState } from 'react';
import DecodeText from '../components/site/DecodeText';
import GiantFooter from '../components/site/sections/GiantFooter';
import { site, statusWords } from '../mock';
import { useSectionStatus } from '../lib/statusBus';
import { useToast } from '../hooks/use-toast';

export default function Contact() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.contact);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: 'INCOMPLETE', description: 'Name, email and message are all required.' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('send failed');
      setForm({ name: '', email: '', message: '' });
      toast({ title: 'MESSAGE SENT', description: 'Thanks — your message is on its way. I usually reply within a day.' });
    } catch {
      toast({ title: 'TRANSMISSION FAILED', description: 'Could not send right now. Please try again or email me directly.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <main data-testid="contact-page">
      <section ref={secRef} className="x-sec-dark min-h-screen">
        <div className="x-pad pt-32 max-w-[1440px] mx-auto">
          <DecodeText text="Contact" as="h1" className="xh-giant mb-20 text-[#e2e2dc]" speed={44} testId="contact-heading" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6">
              <div className="x-label text-[#8f8f8a] mb-3">New business / Collaborations</div>
              <a
                href={site.emailHref}
                className="x-grot text-2xl md:text-4xl font-medium x-underline inline-block mb-14"
                data-testid="contact-email"
              >
                {site.email}
              </a>

              <div className="grid grid-cols-2 gap-8 max-w-md">
                <div>
                  <div className="x-label text-[#8f8f8a] mb-2">Based in</div>
                  <div className="x-label">Surabaya (ID)</div>
                  <div className="x-label">Available worldwide</div>
                </div>
                <div>
                  <div className="x-label text-[#8f8f8a] mb-2">Work</div>
                  <div className="x-label">Freelance</div>
                  <div className="x-label">Remote / On-site</div>
                </div>
              </div>

              <div className="mt-14 flex gap-6">
                <a href="https://github.com/pancamaulana09" target="_blank" rel="noreferrer" className="x-label x-underline">GitHub</a>
                <a href={site.emailHref} className="x-label x-underline">Email</a>
              </div>
            </div>

            <form className="lg:col-span-5 lg:col-start-8 space-y-5" onSubmit={submit} data-testid="contact-form">
              <div>
                <label className="x-label text-[#8f8f8a] block mb-2" htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  className="x-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="x-label text-[#8f8f8a] block mb-2" htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  type="email"
                  className="x-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="x-label text-[#8f8f8a] block mb-2" htmlFor="c-msg">Message</label>
                <textarea
                  id="c-msg"
                  rows={6}
                  className="x-input resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  data-testid="contact-message-input"
                />
              </div>
              <button type="submit" className="x-ghostbtn" disabled={sending} data-testid="contact-submit">
                {sending ? 'Transmitting…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <GiantFooter tone="dark" />
    </main>
  );
}
