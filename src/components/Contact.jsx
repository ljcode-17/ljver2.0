import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Replace these with your actual EmailJS credentials
    // Service ID: service_xxxxxx
    // Template ID: template_xxxxxx
    // Public Key: xxxxxxxxxxxxxxxx
    
    emailjs.sendForm(
      'service_7p7z07o', // Default placeholder service ID
      'template_y8t8k88', // Default placeholder template ID
      form.current,
      'user_placeholder_key' // Replace with your Public Key
    )
    .then((result) => {
        console.log(result.text);
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
    }, (error) => {
        console.log(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
    });
  };

  return (
    <section id="contact" style={{ padding: '120px 5%', background: 'var(--bg-subtle)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            06 / CONNECT
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Let's Build <span style={{ color: 'var(--accent)' }}>Together</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Currently open for junior opportunities, frontend roles, or UI/UX design collaboration. Reach out anytime!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'var(--accent-light)', padding: '12px', borderRadius: '12px', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</div>
                  <a href="mailto:ljcloterina1726@gmail.com" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>ljcloterina1726@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'var(--accent-light)', padding: '12px', borderRadius: '12px', color: 'var(--accent)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone</div>
                  <a href="tel:+639163877045" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>+63 916-387-7045</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'var(--accent-light)', padding: '12px', borderRadius: '12px', color: 'var(--accent)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.1rem' }}>Quezon, Philippines</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <motion.a 
                whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)' }}
                href="https://www.linkedin.com/in/lloyd-jernell-loterina" 
                target="_blank"
                style={{ background: 'var(--bg-subtle)', color: 'var(--text)', padding: '12px', borderRadius: '12px', transition: '0.3s', border: '1px solid var(--border)' }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)' }}
                href="https://github.com/ljcode-17" 
                target="_blank"
                style={{ background: 'var(--bg-subtle)', color: 'var(--text)', padding: '12px', borderRadius: '12px', transition: '0.3s', border: '1px solid var(--border)' }}
              >
                <Github size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ 
              background: 'var(--card-bg)', 
              padding: '2.5rem', 
              borderRadius: '24px', 
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <form ref={form} onSubmit={sendEmail}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Your Name</label>
                <input 
                  type="text" 
                  name="user_name"
                  required
                  placeholder="John Doe" 
                  style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} 
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
                <input 
                  type="email" 
                  name="user_email"
                  required
                  placeholder="john@example.com" 
                  style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} 
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4" 
                  placeholder="How can I help you?" 
                  style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none', resize: 'none' }} 
                ></textarea>
              </div>
              <motion.button
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: 'var(--accent)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: 600, 
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  opacity: status === 'sending' ? 0.7 : 1
                }}
              >
                {status === 'sending' ? (
                  <><Loader2 className="animate-spin" size={20} /> Sending...</>
                ) : (
                  <><Send size={20} /> Send Message</>
                )}
              </motion.button>
            </form>

            {/* Success/Error Overlays */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--card-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    zIndex: 10
                  }}
                >
                  <CheckCircle2 size={64} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--card-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    zIndex: 10
                  }}
                >
                  <AlertCircle size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Send Failed</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Something went wrong. Please try again or email me directly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    style={{ marginTop: '1rem', background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{ marginTop: '5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}
        >
          &copy; {new Date().getFullYear()} Lloyd Jernell Loteriña. Cinematic Web Portfolio.
        </motion.div>
      </div>
      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
