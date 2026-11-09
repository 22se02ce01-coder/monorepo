import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { LegalModal, LegalTab } from './components/LegalModal';

export const App: React.FC = () => {
  const [legalModalTab, setLegalModalTab] = useState<LegalTab | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <Header
        currentTool="15-QR-Generator"
        onOpenAbout={() => { window.location.href = 'https://microfree.store/about/'; }}
        onOpenPrivacy={() => { window.location.href = 'https://microfree.store/privacy-policy/'; }}
      />

      <Home />

      <Footer onOpenLegal={(tab) => setLegalModalTab(tab)} />

      {legalModalTab && (
        <LegalModal initialTab={legalModalTab} onClose={() => setLegalModalTab(null)} />
      )}
    </div>
  );
};

export default App;
