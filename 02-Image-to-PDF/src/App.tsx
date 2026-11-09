import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { LegalModal, LegalTab } from './components/LegalModal';

export const App: React.FC = () => {
  const [legalModalTab, setLegalModalTab] = useState<LegalTab | null>(null);

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalModalTab(tab);
  };

  const handleCloseLegal = () => {
    setLegalModalTab(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Header
        onOpenAbout={() => { window.location.href = 'https://microfree.store/about/'; }}
        onOpenPrivacy={() => { window.location.href = 'https://microfree.store/privacy-policy/'; }}
      />

      {/* Main Content Area */}
      <Home />

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Legal & About Modal */}
      {legalModalTab && (
        <LegalModal initialTab={legalModalTab} onClose={handleCloseLegal} />
      )}
    </div>
  );
};

export default App;

