import Navbar from './components/layout/Navbar';

function App(): JSX.Element {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main>Content</main>
    </div>
  );
}

export default App;
