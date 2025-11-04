import './pages.css';

import { useNavigate } from 'react-router-dom';

import Header from '../components/views/header';
import MenuButton from '../components/buttons/menuButton';

function Home() {

  const navigate = useNavigate();
  return (
    <div className="background">
      <Header title="Home" />
      <div className="body">
        <div className="half-wide">
        </div>
        <div className="half-wide">
          <MenuButton label="Contacts" icon="☎️" onClick={() => {navigate('/contacts')}} />
        </div>
      </div>
    </div>
  );
}

export default Home;