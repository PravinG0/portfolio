"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiX, FiMail, FiCheckCircle } from "react-icons/fi";

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const hasSubscribed = localStorage.getItem("newsletter_subscribed");
    const hasSeen = localStorage.getItem("newsletter_seen");
    if (!hasSubscribed && !hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter_seen", "true");
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message || "Subscribed successfully!");
      localStorage.setItem("newsletter_subscribed", "true");
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (pathname?.startsWith("/admin") || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 bg-orange-100 text-[#ff6b1a] rounded-xl flex items-center justify-center mb-4">
            <FiMail size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Join the Newsletter</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Get notified whenever I publish new cinematic portfolios, web development tips, or creative design resources.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-600">
            <FiCheckCircle size={20} />
            <span className="font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6b1a] focus:bg-white transition-colors"
              />
            </div>
            
            {status === "error" && (
              <p className="text-red-500 text-xs">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-[#ff6b1a] text-white font-bold rounded-xl hover:bg-slate-900 shadow-md shadow-orange-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
        )}
        
        <p className="text-[10px] text-slate-400 mt-4 text-center">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
