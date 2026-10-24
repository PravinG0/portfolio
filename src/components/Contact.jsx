"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION, COUNTRIES as COUNTRY_LIST } from "@/app/contact/content";

gsap.registerPlugin(ScrollTrigger);

const boxInput =
  "contact-field w-full bg-white/80 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6b1a] transition-colors duration-300 text-sm shadow-sm";

export default function Contact({ standalone = false }) {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', contact: '', reason: '' });
  const [contactType, setContactType] = useState('email'); // 'email' | 'phone'
  const [selectedCC, setSelectedCC] = useState(COUNTRY_LIST[0]); // default India
  const [showCCPicker, setShowCCPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('idle');

  // Determine if the contact field looks like an email or a phone
  const handleContactChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, contact: val });
    // If it has @ it's email, else treat as email too unless user picks phone tab
    setContactType((val.includes('@') || !val) ? 'email' : 'email');
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // digits only
    setPhoneNumber(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contactType === 'phone') {
      const fullNumber = selectedCC.code + phoneNumber;
      const myNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919944709748';
      const msg = encodeURIComponent(
        `Hi Pravin! My name is ${form.name}.\n\nReason: ${form.reason}\n\nMy number: +${fullNumber}`
      );
      window.open(`https://wa.me/${myNumber}?text=${msg}`, '_blank');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.contact, message: form.reason }),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) { setForm({ name: '', contact: '', reason: '' }); setPhoneNumber(''); }
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (standalone) {
        gsap.from(".contact-label", { y: 25, opacity: 0, duration: 0.5, delay: 0.4 });
        gsap.from(".contact-h",     { y: 70, opacity: 0, duration: 0.9, ease: "power4.out", delay: 0.6 });
        gsap.from(".contact-field", { y: 35, opacity: 0, stagger: 0.12, duration: 0.65, delay: 0.8 });
        gsap.from(".contact-btn",   { y: 20, opacity: 0, duration: 0.5, delay: 1.2 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.from(".contact-label", { y: 14, opacity: 0, duration: 0.3, ease: "power3.out" })
        .from(".contact-h",     { y: 35, opacity: 0, duration: 0.4, ease: "power4.out" }, 0.05)
        .from(".contact-divider", { scaleY: 0, opacity: 0, duration: 0.5, ease: "power3.out" }, 0.1)
        .from(".contact-field", { y: 25, opacity: 0, stagger: 0.08, duration: 0.35, ease: "power3.out" }, 0.18)
        .from(".contact-btn",   { y: 15, opacity: 0, duration: 0.3, ease: "power2.out" }, 0.45);

      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, ref);
    return () => ctx.revert();
  }, [standalone]);

  return (
    <section
      id="contact-section"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-10 md:px-20 pt-24 md:pt-20 pb-24"
    >
      <p className="contact-label text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-12 font-medium">
        {SECTION.label}
      </p>

      <div className="flex flex-col md:flex-row items-stretch gap-0 w-full max-w-7xl min-h-[65vh]">

        {/* LEFT — Form */}
        <div className="w-full md:w-[42%] pr-0 md:pr-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            aria-label="Contact form"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 tracking-[0.3em] uppercase font-medium">Name</span>
              <input
                suppressHydrationWarning
                className={boxInput}
                type="text"
                placeholder="Your full name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Toggle: Email or Phone */}
            <div className="flex gap-2">
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setContactType('email')}
                className={`flex-1 py-2 rounded-lg text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-200 ${
                  contactType === 'email'
                    ? 'bg-[#ff6b1a] text-white shadow-sm'
                    : 'bg-slate-200/70 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Email
              </button>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setContactType('phone')}
                className={`flex-1 py-2 rounded-lg text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-200 ${
                  contactType === 'phone'
                    ? 'bg-[#25D366] text-white shadow-sm'
                    : 'bg-slate-200/70 text-slate-600 hover:bg-slate-200'
                }`}
              >
                WhatsApp
              </button>
            </div>

            {/* Email Field */}
            {contactType === 'email' && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-slate-500 tracking-[0.3em] uppercase font-medium">Email</span>
                <input
                  suppressHydrationWarning
                  className={boxInput}
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={form.contact}
                  onChange={handleContactChange}
                />
              </div>
            )}

            {/* Phone Field with Country Code Picker */}
            {contactType === 'phone' && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#25D366] tracking-[0.3em] uppercase font-medium">Phone (WhatsApp)</span>
                <div className="flex gap-2">
                  {/* Country code picker */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCCPicker(!showCCPicker)}
                      className="flex items-center gap-1.5 h-full bg-white/80 border border-slate-300 rounded-xl px-3 py-3 text-sm text-slate-900 hover:border-[#25D366]/60 transition-colors duration-200 whitespace-nowrap shadow-sm"
                    >
                      <span>{selectedCC.flag}</span>
                      <span className="text-slate-700">+{selectedCC.code}</span>
                      <span className="text-slate-400 text-xs">›</span>
                    </button>
                    {showCCPicker && (
                      <div className="absolute z-50 top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl overflow-y-auto max-h-56 shadow-2xl custom-scroll">
                        {COUNTRY_LIST.map((c) => (
                          <button
                            key={c.code + c.name}
                            type="button"
                            onClick={() => { setSelectedCC(c); setShowCCPicker(false); }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-100 transition-colors text-left ${
                              selectedCC.code === c.code && selectedCC.name === c.name ? 'text-[#25D366] font-bold' : 'text-slate-700'
                            }`}
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1">{c.name}</span>
                            <span className="text-slate-400 text-xs">+{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Phone number input */}
                  <input
                    suppressHydrationWarning
                    className={boxInput}
                    type="tel"
                    placeholder="98765 43210"
                    required={contactType === 'phone'}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
            )}

            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 tracking-[0.3em] uppercase font-medium">Reason</span>
              <textarea
                suppressHydrationWarning
                className={boxInput + " resize-none"}
                rows={4}
                placeholder="Tell me what you're working on…"
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}

            {status === 'sent' ? (
              <p className="contact-btn text-[#ff6b1a] text-sm uppercase tracking-widest font-bold">
                Message sent — I'll be in touch!
              </p>
            ) : (
              <button
                suppressHydrationWarning
                type="submit"
                disabled={status === 'sending'}
                className={`contact-btn w-full font-bold py-4 rounded-full text-sm uppercase tracking-widest transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md ${
                  contactType === 'phone'
                    ? 'bg-[#25D366] text-white hover:bg-[#1ebe5d]'
                    : 'bg-[#ff6b1a] text-white hover:bg-slate-900'
                }`}
              >
                {status === 'sending' ? 'Sending…' : contactType === 'phone' ? 'Open WhatsApp →' : 'Send Message'}
              </button>
            )}
          </form>
        </div>

        {/* DIVIDER */}
        <div className="contact-divider hidden md:block w-px self-stretch bg-slate-200 mx-8 origin-top" />

        {/* RIGHT — heading pinned to BOTTOM-RIGHT */}
        <div className="w-full md:w-[58%] pl-0 md:pl-6 mt-16 md:mt-0 flex flex-col justify-end text-right">
          <h2
            className="contact-h font-black tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 6.5rem)" }}
          >
            <span className="block text-slate-900">Let's build</span>
            <span className="block text-slate-900">something</span>
            <span className="block ghost-orange">extraordinary.</span>
          </h2>
          <p className="contact-label mt-6 text-slate-600 text-sm font-normal leading-relaxed text-right">
            Have a project or technical role in mind?<br />Reach out directly via form, email, or WhatsApp.
          </p>

          <div className="contact-label mt-8 flex flex-col items-end gap-2 text-xs">
            <a href="mailto:pravin87ec@gmail.com" className="text-slate-800 hover:text-[#ff6b1a] transition-colors font-medium">
              ✉️ pravin87ec@gmail.com
            </a>
            <a href="tel:+919944709748" className="text-slate-800 hover:text-[#25D366] transition-colors font-medium">
              📞 +91 9944709748
            </a>
            <span className="text-slate-400 text-[10px] tracking-widest uppercase">
              📍 Coimbatore, Tamil Nadu, India
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
