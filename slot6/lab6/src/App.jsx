import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import OurMenu from './components/OurMenu';
import BookTableForm from './components/BookTableForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <HeroBanner />
        <OurMenu />
        <BookTableForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
