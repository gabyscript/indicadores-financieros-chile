
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';

import Header from "./Components/Header/Header";
import Footer from './Components/Footer/Footer';
import MainPage from './Views/Main/Main';
import Graphs from './Views/Graphs/Graphs';
import NotFound from './Views/NotFound/NotFound';

library.add(fab)

function App() { 

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/info/:id" element={<Graphs />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>

        <Footer />
      
      </BrowserRouter>    
    </div>
  );
}

export default App;
