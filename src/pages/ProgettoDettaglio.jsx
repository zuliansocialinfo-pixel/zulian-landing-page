import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { getProject } from '../data/projects';
import { ACCENTS, GOLD, tweenAccent } from '../theme';
import { getWhatsAppLink, whatsappMessages } from '../utils/whatsapp';

const ProgettoDettaglio = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  const rootRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.pd-line, .pd-anim', { yPercent: 0, opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.pd-back', { y: -16, opacity: 0, duration: 0.5 }, 0)
          .from('.pd-line', { yPercent: 115, duration: 0.9, ease: 'power4.out' }, 0.15)
          .from('.pd-meta', { y: 16, opacity: 0, duration: 0.5 }, '-=0.4')
          .from('.pd-cover', { y: 30, opacity: 0, duration: 0.7 }, '-=0.3')
          .from('.pd-body', { y: 24, opacity: 0, duration: 0.6 }, '-=0.35');
      }
    }, rootRef);
    const t = tweenAccent(gsap, ACCENTS.progetti || GOLD, 0.8);
    return () => { ctx.revert(); t && t.kill(); };
  }, [slug]);

  if (!project) {
    return (
      <div className="container" style={{ minHeight: '100vh', paddingTop: '140px' }}>
        <h1 style={{ marginBottom: '1rem' }}>Progetto non trovato</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Il progetto che cerchi non esiste o è stato spostato.</p>
        <Link to="/progetti" className="btn-primary">Vedi tutti i progetti</Link>
      </div>
    );
  }

  return (
    <div ref={rootRef} style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link to="/progetti" className="ps-back pd-back">
          <ArrowLeft size={18} />
          Torna ai progetti
        </Link>

        <div style={{ marginTop: '1.6rem' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: '1rem' }}>
            <span className="line-mask"><span className="pd-line" style={{ display: 'block' }}>{project.title}</span></span>
          </h1>
          <div className="pd-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
            {[project.category, project.year, project.client].map((m) => (
              <span key={m} style={{ padding: '0.35rem 0.9rem', border: '1px solid var(--glass-border)', borderRadius: '999px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Cover grafica */}
        <div className="pd-cover glass" style={{ position: 'relative', aspectRatio: '16 / 9', background: project.coverImage ? `#070b14 center/cover no-repeat url(${project.coverImage})` : `linear-gradient(135deg, ${project.cover}, #0c0c0c)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {project.category === 'Video' && (
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={28} style={{ color: '#fff', marginLeft: 4 }} />
            </div>
          )}
        </div>

        <div className="pd-body">
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>{project.excerpt}</p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '2rem' }}>{project.body}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {project.tags.map((t) => (
              <span key={t} style={{ padding: '0.35rem 0.9rem', borderRadius: '999px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', fontSize: '0.82rem', color: 'var(--accent-color)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>

          {/* Galleria immagini */}
          <div className="pd-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
            {project.gallery && project.gallery.length > 0 ? project.gallery.map((img, i) => (
              <div key={i} className="glass" style={{ aspectRatio: '4 / 3', background: `url(${img}) center/cover no-repeat`, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                <div style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 600 }}>
                  Foto {i + 1}
                </div>
              </div>
            )) : (
              [0, 1, 2].map((i) => (
                <div key={i} className="glass" style={{ aspectRatio: '4 / 3', background: 'linear-gradient(135deg, #161616, #0c0c0c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                  Immagine {i + 1}
                </div>
              ))
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-secondary">
              <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Torna alla home
            </Link>
            <Link to="/progetti" className="btn-secondary">Altri progetti</Link>
            <a
              href={getWhatsAppLink(whatsappMessages.quote(project.title))}
              target="_blank" rel="noopener noreferrer" className="btn-primary"
            >
              <MessageCircle size={18} /> Voglio un progetto così
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgettoDettaglio;
