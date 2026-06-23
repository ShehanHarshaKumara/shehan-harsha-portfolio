import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import Education from './components/Education';
import { References } from './components/References';

/* The Education component import is removed because 'c:/my project/New folder/src/app/components/Education.tsx' is not a module. */

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white antialiased">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Education />
          <Skills />
          <References />
          <Contact />
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}
