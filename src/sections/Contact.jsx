import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "../data/profile.json";
import { Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Mari Terhubung</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text">
            Punya Ide Proyek atau Ingin Berkolaborasi?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text/70">
            Kirimkan pesan melalui formulir di bawah ini atau hubungi langsung via email dan media sosial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-8 rounded-3xl bg-primary/5 border border-primary/15 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-text mb-4">Informasi Kontak</h3>
              <p className="text-sm text-text/80 leading-relaxed mb-8">
                Saya selalu antusias menyambut obrolan baru seputar frontend & backend development,
                desain antarmuka, ataupun peluang kerja dan kolaborasi proyek.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.socials.email}`}
                  className="flex items-center gap-3 text-sm text-text/80 hover:text-accent transition-colors p-3 rounded-xl bg-background/60 border border-primary/10 hover:border-accent/40"
                >
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span className="truncate">{profileData.socials.email}</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-text/80 p-3 rounded-xl bg-background/60 border border-primary/10">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 pt-6 border-t border-primary/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-3">
                Media Sosial
              </span>
              <div className="flex items-center gap-3">
                {profileData.socials.github && (
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-primary/20 bg-background/80 hover:border-accent hover:text-accent hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {profileData.socials.linkedin && (
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-primary/20 bg-background/80 hover:border-accent hover:text-accent hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 p-8 rounded-3xl bg-primary/5 border border-primary/15"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <CheckCircle className="w-12 h-12 text-accent mb-3 animate-bounce" />
                  <h4 className="text-xl font-bold text-text">Pesan Berhasil Terkirim!</h4>
                  <p className="mt-2 text-sm text-text/70">
                    Terima kasih sudah menyapa. Saya akan merespons pesan Anda secepatnya.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-text/90 uppercase tracking-wider mb-2">
                      Nama Anda
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-background/80 border border-primary/20 text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-text/90 uppercase tracking-wider mb-2">
                      Alamat Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-background/80 border border-primary/20 text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-text/90 uppercase tracking-wider mb-2">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Ceritakan proyek atau ide Anda..."
                      className="w-full px-4 py-3 rounded-xl bg-background/80 border border-primary/20 text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-background font-semibold text-sm hover:bg-accent hover:shadow-lg active:scale-95 transition-all duration-200 mt-2"
                  >
                    <span>Kirim Pesan</span>
                    <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
