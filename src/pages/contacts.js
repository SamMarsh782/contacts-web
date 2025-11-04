import './pages.css';

import { useNavigate } from 'react-router-dom';

import Header from '../components/views/header';
import MenuButton from '../components/buttons/menuButton';

function Contacts() {

  const navigate = useNavigate();

  return (
    <div className="background">
      <Header title="Contacts"/>
      <div className="body">
        <div className="half-wide">
          <MenuButton label="Internal" icon="🏠" onClick={() => {navigate('/internal')}} />
        </div>
        <div className="half-wide">
          <MenuButton label="External" icon="🌎" onClick={() => {navigate('/external')}} />
        </div>
      </div>
    </div>
  );
}

export default Contacts;
