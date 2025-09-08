import { LockButton } from '@/components';
import './App.css';

function App() {
  return (
    <main className="font-pretendard">
      <LockButton isCompleted={false} title="Antonyms" />
    </main>
  );
}

export default App;
