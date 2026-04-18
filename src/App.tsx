import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewsGrid from './components/NewsGrid';
import SidebarOfShame from './components/SidebarOfShame';
import CountdownWidget from './components/CountdownWidget';
import AlertBanner from './components/AlertBanner';
import EditorialBanner from './components/EditorialBanner';
import WorldCupColumn from './components/WorldCupColumn';
import AskTheSpecialist from './components/AskTheSpecialist';
import PopupModal from './components/PopupModal';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen noise-bg" style={{ background: '#0a0a0a' }}>
      <Header />
      <EditorialBanner />
      <HeroSection />
      <AlertBanner />

      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <main className="flex-1 min-w-0">
            <NewsGrid />
          </main>

          <div className="hidden lg:block flex-shrink-0" style={{ width: 300 }}>
            <CountdownWidget />
            <SidebarOfShame />
          </div>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid #1a1a1a' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <WorldCupColumn />
            <AskTheSpecialist />
          </div>
        </div>
      </div>

      <Footer />
      <PopupModal />
    </div>
  );
}

export default App;
