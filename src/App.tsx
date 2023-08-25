import { Outlet } from 'react-router-dom';

import { GithubProvider } from './context/github/GithubContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App(): JSX.Element {
  return (
    <GithubProvider>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </GithubProvider>
  );
}

export default App;
