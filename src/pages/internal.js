import './pages.css';

import { useNavigate } from 'react-router-dom';

import Header from '../components/views/header';
import MenuButton from '../components/buttons/menuButton';

function Internal() {

  const navigate = useNavigate();

  return (
    <div className="background">
      <Header title="Internal Contacts" />
      <div className="body">
      </div>
    </div>
  );
}

export default Internal;
