import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#050505', padding: '4rem 0 2rem 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/src/assets/logo.jpg" alt="Zulian Logo" style={{ height: '60px', width: 'auto', borderRadius: '4px' }} />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              La strategia vincente, fatta su misura. Aiuto aziende e professionisti a crescere online con strategie concrete.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Contatti Diretti</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Phone size={18} className="text-accent" />
                <a href="tel:+393927950038" style={{ transition: 'color 0.3s' }}>+39 3927950038</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Mail size={18} className="text-accent" />
                <a href="mailto:zuliansocial.info@gmail.com" style={{ transition: 'color 0.3s' }}>zuliansocial.info@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <MapPin size={18} className="text-accent" />
                <span>Raggiungo in tutta Italia<br/><small>(Principalmente Reggio di Calabria)</small></span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Note Legali</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a></li>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ textDecoration: 'underline' }}>Cookie Policy</a></li>
              <li><a href="#" style={{ textDecoration: 'underline' }}>Termini e Condizioni</a></li>
            </ul>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
              *I link alle policy andranno collegati al tuo provider (es. Iubenda).
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#666', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Zulian Social Media Marketing - È vietata la riproduzione anche parziale.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
