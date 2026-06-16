import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WA_URL = 'https://wa.me/918081727840';


/** Actual WhatsApp logo — green circle + white phone icon */
const WALogo = ({ size = 36 }: { size?: number }) => (
    <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width={size}
        height={size}
        style={{ display: 'block', objectFit: 'contain' }}
    />
);



const WhatsAppButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999 }}
            className="flex flex-col items-end gap-3"
        >
            {/* ── Chat pop-up card ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                            width: 300,
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                        }}
                    >
                        {/* ── Header ── */}
                        <div
                            style={{
                                background: 'linear-gradient(135deg,#075E54 0%,#128C7E 100%)',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                        >
                            {/* Avatar */}
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <WALogo size={26} />
                                </div>
                                {/* Online dot */}
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 1,
                                        right: 1,
                                        width: 11,
                                        height: 11,
                                        borderRadius: '50%',
                                        background: '#44FF88',
                                        border: '2px solid #075E54',
                                    }}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>
                                    Sulax Solar
                                </p>
                                <p style={{ color: '#A8F0C4', fontSize: 11, margin: 0 }}>
                                    Online · Replies instantly
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'rgba(255,255,255,0.7)',
                                    padding: 4,
                                    lineHeight: 0,
                                }}
                            >
                                <X size={16} color="rgba(255,255,255,0.8)" />
                            </button>
                        </div>

                        {/* ── WhatsApp-style chat area ── */}
                        <div
                            style={{
                                background: '#E5DDD5',
                                backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ccbcb4' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
                                padding: '16px 14px',
                            }}
                        >
                            {/* Message bubble */}
                            <div
                                style={{
                                    background: '#fff',
                                    borderRadius: '0 12px 12px 12px',
                                    padding: '10px 14px',
                                    maxWidth: '88%',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                }}
                            >
                                <p style={{ margin: 0, fontSize: 13.5, color: '#111', lineHeight: 1.55 }}>
                                    👋 Hello! Welcome to <strong>Sulax Solar</strong>.<br />
                                    Looking for solar solutions? Ask us anything — we offer <strong>free site surveys</strong> and the best pricing in Kanpur!
                                </p>
                                <p
                                    style={{
                                        margin: '6px 0 0',
                                        fontSize: 10,
                                        color: '#999',
                                        textAlign: 'right',
                                    }}
                                >
                                    Sulax Solar &nbsp;✓✓
                                </p>
                            </div>
                        </div>

                        {/* ── CTA button ── */}
                        <a
                            href={WA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                                background: '#25D366',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: 14,
                                padding: '14px 16px',
                                textDecoration: 'none',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLAnchorElement).style.background = '#1ebe5d')
                            }
                            onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLAnchorElement).style.background = '#25D366')
                            }
                        >
                            <WALogo size={22} />
                            Chat with us on WhatsApp
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating button ── */}
            <div style={{ position: 'relative', width: 62, height: 62 }}>
                {/* Pulse rings */}
                {!open && (
                    <>
                        <motion.span
                            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                background: '#25D366',
                            }}
                        />
                        <motion.span
                            animate={{ scale: [1, 1.5], opacity: [0.35, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                background: '#25D366',
                            }}
                        />
                    </>
                )}

                <motion.button
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Chat on WhatsApp"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    style={{
                        position: 'relative',
                        width: 62,
                        height: 62,
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        background: open
                            ? 'linear-gradient(135deg,#075E54,#128C7E)'
                            : 'linear-gradient(135deg,#25D366,#1ebe5d)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 28px rgba(37,211,102,0.45)',
                        transition: 'background 0.3s',
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {open ? (
                            <motion.span
                                key="x"
                                initial={{ rotate: -60, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 60, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                style={{ display: 'flex' }}
                            >
                                <X size={26} color="#fff" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="wa"
                                initial={{ rotate: 60, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -60, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                style={{ display: 'flex' }}
                            >
                                <WALogo size={36} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default WhatsAppButton;
