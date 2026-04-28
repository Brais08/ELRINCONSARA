import { ExperienceWrapper } from './components/ExperienceWrapper';
import { UIOverlay } from './components/UIOverlay';

function App() {
  return (
    <main className="bg-black relative">
      {/* 3D Scene Layer */}
      <ExperienceWrapper />

      {/* HTML Content Overlay Layer */}
      <UIOverlay />
    </main>
  );
}

export default App;
