import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle, Loader2, KeyRound, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  // Dynamic credentials with fallback to localStorage
  const [serviceId, setServiceId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [publicKey, setPublicKey] = useState('');

  // Key input in modal
  const [inputPublicKey, setInputPublicKey] = useState('');
  const [inputServiceId, setInputServiceId] = useState('');
  const [inputTemplateId, setInputTemplateId] = useState('');

  // status can be: 'idle', 'sending', 'success', 'error', 'config_error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const envService = import.meta.env.VITE_EMAILJS_SERVICE_ID || localStorage.getItem('EMAILJS_SERVICE_ID') || 'service_5r1yv0b';
    const envTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || localStorage.getItem('EMAILJS_TEMPLATE_ID') || 'template_n2f3h6l';
    const envKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || localStorage.getItem('EMAILJS_PUBLIC_KEY') || 'dwS2LmdsnZ5bECIGA';

    setServiceId(envService);
    setTemplateId(envTemplate);
    setPublicKey(envKey);

    setInputServiceId(envService);
    setInputTemplateId(envTemplate);
    setInputPublicKey(envKey);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { user_name: '', user_email: '', message: '' };

    // Validate Name
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Please enter your name.';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Please enter your email address.';
      isValid = false;
    } else if (!emailRegex.test(formData.user_email.trim())) {
      newErrors.user_email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Message
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for field being typed in
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveCredentialsAndSend = (e) => {
    e.preventDefault();
    if (!inputPublicKey.trim()) return;

    localStorage.setItem('EMAILJS_PUBLIC_KEY', inputPublicKey.trim());
    if (inputServiceId.trim()) localStorage.setItem('EMAILJS_SERVICE_ID', inputServiceId.trim());
    if (inputTemplateId.trim()) localStorage.setItem('EMAILJS_TEMPLATE_ID', inputTemplateId.trim());

    const activeKey = inputPublicKey.trim();
    const activeService = inputServiceId.trim() || serviceId;
    const activeTemplate = inputTemplateId.trim() || templateId;

    setPublicKey(activeKey);
    setServiceId(activeService);
    setTemplateId(activeTemplate);

    executeSend(activeService, activeTemplate, activeKey);
  };

  const executeSend = (activeService, activeTemplate, activeKey) => {
    setStatus('sending');
    setErrorMessage('');

    const templateParams = {
      from_name: formData.user_name.trim(),
      from_email: formData.user_email.trim(),
      reply_to: formData.user_email.trim(),
      message: formData.message.trim(),
      submission_date: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      }),
      to_name: 'Lloyd Jernell Loteriña'
    };

    emailjs.send(activeService, activeTemplate, templateParams, activeKey)
      .then((result) => {
        console.log('EmailJS Success:', result.text);
        setStatus('success');
        setFormData({ user_name: '', user_email: '', message: '' });
        setErrors({ user_name: '', user_email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setErrorMessage(
          error?.text || error?.message || 'Failed to send email. Please verify your EmailJS credentials in dashboard.emailjs.com.'
        );
        setStatus('error');
      });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (status === 'sending') return;

    if (!validateForm()) {
      return;
    }

    const currentKey = publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || localStorage.getItem('EMAILJS_PUBLIC_KEY');
    const currentService = serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID || localStorage.getItem('EMAILJS_SERVICE_ID');
    const currentTemplate = templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || localStorage.getItem('EMAILJS_TEMPLATE_ID');

    // Check if Public Key is provided
    if (!currentKey || currentKey === 'your_public_key' || currentKey === 'user_placeholder_key') {
      setErrorMessage('Your EmailJS Public Key is required to send emails directly to your Gmail.');
      setStatus('config_error');
      return;
    }

    executeSend(currentService, currentTemplate, currentKey);
  };

  return (
    <section id="contact" style={{ padding: '120px 5%', background: 'var(--bg-subtle)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
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
                whileHover={{ scale: 1.1, y: -2, backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2 }}
                href="https://www.linkedin.com/in/lloyd-jernell-loterina" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                style={{ background: 'var(--card-bg)', color: 'var(--text)', padding: '12px', borderRadius: '12px', transition: 'background 0.3s, color 0.3s', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2, backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2 }}
                href="https://github.com/ljcode-17" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                style={{ background: 'var(--card-bg)', color: 'var(--text)', padding: '12px', borderRadius: '12px', transition: 'background 0.3s, color 0.3s', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Github size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ 
              background: 'var(--card-bg)', 
              padding: '2.5rem', 
              borderRadius: '24px', 
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <form ref={form} onSubmit={sendEmail} noValidate>
              {/* Name Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Your Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  placeholder="John Doe" 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: 'var(--bg)', 
                    border: errors.user_name ? '1px solid #ef4444' : '1px solid var(--border)', 
                    borderRadius: '8px', 
                    color: 'var(--text)', 
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    opacity: status === 'sending' ? 0.7 : 1
                  }} 
                />
                {errors.user_name && (
                  <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.8rem', color: '#ef4444' }}>
                    {errors.user_name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="email" 
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  placeholder="john@example.com" 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: 'var(--bg)', 
                    border: errors.user_email ? '1px solid #ef4444' : '1px solid var(--border)', 
                    borderRadius: '8px', 
                    color: 'var(--text)', 
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    opacity: status === 'sending' ? 0.7 : 1
                  }} 
                />
                {errors.user_email && (
                  <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.8rem', color: '#ef4444' }}>
                    {errors.user_email}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  rows="4" 
                  placeholder="How can I help you?" 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: 'var(--bg)', 
                    border: errors.message ? '1px solid #ef4444' : '1px solid var(--border)', 
                    borderRadius: '8px', 
                    color: 'var(--text)', 
                    outline: 'none', 
                    resize: 'none',
                    transition: 'border-color 0.2s',
                    opacity: status === 'sending' ? 0.7 : 1
                  }} 
                ></textarea>
                {errors.message && (
                  <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.8rem', color: '#ef4444' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status === 'sending' ? {} : { scale: 1.02 }}
                whileTap={status === 'sending' ? {} : { scale: 0.98 }}
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
                  <><Loader2 className="animate-spin" size={20} /> Sending Message...</>
                ) : (
                  <><Send size={20} /> Send Message</>
                )}
              </motion.button>
            </form>

            {/* Overlays for Statuses */}
            <AnimatePresence>
              {/* Success Overlay */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
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
                  <CheckCircle2 size={60} color="var(--accent)" style={{ marginBottom: '1.25rem' }} />
                  <h3 style={{ color: 'var(--text)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '320px', marginBottom: '1.5rem' }}>
                    Thank you for reaching out. Your message has been sent to my Gmail and I will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    style={{ 
                      padding: '10px 24px', 
                      background: 'var(--accent)', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}

              {/* Error Overlay */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
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
                  <AlertCircle size={60} color="#ef4444" style={{ marginBottom: '1.25rem' }} />
                  <h3 style={{ color: 'var(--text)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Submission Failed</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '340px', marginBottom: '1.5rem' }}>
                    {errorMessage || 'Something went wrong while sending your message.'}
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    style={{ 
                      padding: '10px 24px', 
                      background: 'var(--accent)', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {/* Configuration Error Overlay with Interactive Public Key Input */}
              {status === 'config_error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
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
                    zIndex: 10,
                    overflowY: 'auto'
                  }}
                >
                  <KeyRound size={48} color="#f59e0b" style={{ marginBottom: '0.75rem' }} />
                  <h3 style={{ color: 'var(--text)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Setup EmailJS Credentials
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4, marginBottom: '1rem', maxWidth: '320px' }}>
                    To send real emails to your Gmail, paste your <strong>EmailJS Public Key</strong> below or add it to your <code>.env</code> file.
                  </p>

                  <form onSubmit={handleSaveCredentialsAndSend} style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'left', marginBottom: '0.25rem' }}>
                        EmailJS Public Key <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input 
                        type="text" 
                        value={inputPublicKey}
                        onChange={(e) => setInputPublicKey(e.target.value)}
                        placeholder="e.g. user_AbCdEfGhIjKlMnOpQ" 
                        required
                        style={{ 
                          width: '100%', 
                          padding: '10px 12px', 
                          background: 'var(--bg)', 
                          border: '1px solid var(--border)', 
                          borderRadius: '8px', 
                          color: 'var(--text)', 
                          fontSize: '0.85rem',
                          outline: 'none'
                        }} 
                      />
                    </div>

                    <a 
                      href="https://dashboard.emailjs.com/admin/account" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--accent)', 
                        textDecoration: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        alignSelf: 'flex-start' 
                      }}
                    >
                      Get your Public Key from EmailJS Dashboard <ExternalLink size={12} />
                    </a>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                      <button 
                        type="submit"
                        disabled={!inputPublicKey.trim()}
                        style={{ 
                          flex: 1,
                          padding: '10px', 
                          background: 'var(--accent)', 
                          color: '#ffffff', 
                          border: 'none', 
                          borderRadius: '8px', 
                          fontWeight: 600, 
                          fontSize: '0.85rem',
                          cursor: inputPublicKey.trim() ? 'pointer' : 'not-allowed',
                          opacity: inputPublicKey.trim() ? 1 : 0.6
                        }}
                      >
                        Save & Send Message
                      </button>
                      <button 
                        type="button"
                        onClick={() => setStatus('idle')}
                        style={{ 
                          padding: '10px 16px', 
                          background: 'transparent', 
                          color: 'var(--text-muted)', 
                          border: '1px solid var(--border)', 
                          borderRadius: '8px', 
                          fontWeight: 600, 
                          fontSize: '0.85rem',
                          cursor: 'pointer' 
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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
