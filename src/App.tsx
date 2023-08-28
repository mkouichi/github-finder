import { Outlet } from 'react-router-dom';

import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App(): JSX.Element {
  return (
    <GithubProvider>
      <AlertProvider>
        <div className='flex flex-col h-screen'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12 flex-grow'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
