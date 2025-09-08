import { Header, MultipleChoice, VocabularyMap } from '@/components';
import { useProgressStore } from '@/store';
import './App.css';

function App() {
  const { progress } = useProgressStore();
  const isMultipleChoice = progress === 1;

  return (
    <main className="font-pretendard h-dvh min-w-[750px] overflow-hidden">
      <Header title={isMultipleChoice ? 'Nuance Drill' : 'Vocabulary Map'} />
      {isMultipleChoice ? <MultipleChoice /> : <VocabularyMap />}
    </main>
  );
}

export default App;
