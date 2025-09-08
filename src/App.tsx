import { Header, MultipleChoice } from '@/components';
import './App.css';

function App() {
  return (
    <main className="font-pretendard h-dvh min-w-[750px] overflow-hidden">
      <Header />
      {/* <VocabularyMap /> */}
      <MultipleChoice />
    </main>
  );
}

export default App;
