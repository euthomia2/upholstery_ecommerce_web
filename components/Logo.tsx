import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src='/assets/logo.jpg'
      width={60}
      height={60}
      quality={100}
      alt='CCLDO Icon'
    />
  );
};

export default Logo;
