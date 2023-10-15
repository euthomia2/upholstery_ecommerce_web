import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src='/assets/logo.jpg'
      width={50}
      height={50}
      quality={100}
      alt='CCLDO Icon'
    />
  );
};

export default Logo;
