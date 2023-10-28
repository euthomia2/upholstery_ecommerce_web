import CategoriesModal from './CategoriesModal';
import Navbar from './Navbar';

const Header = ({ children }) => {
  return (
    <>
      <CategoriesModal />

      <header className='relative overflow-hidden'>
        <Navbar />

        {children}
      </header>
    </>
  );
};

export default Header;
