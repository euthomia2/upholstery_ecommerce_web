import Image from 'next/image';

const TransparentLogo = () => {
  return (
    <Image
      src='/assets/transparent_logo.png'
      width={50}
      height={50}
      quality={100}
      alt='CCLDO Icon'
    />
  );
};

export default TransparentLogo;
