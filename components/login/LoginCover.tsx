import Image from 'next/image';

const LoginCover = () => {
  const imageStyles = {
    position: 'absolute',
    inset: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  };

  return (
    <div className='relative hidden w-0 flex-1 lg:block'>
      <Image
        src='/assets/login-cover.jpg'
        fill={true}
        style={imageStyles}
        alt='Login Cover Photo'
      />
    </div>
  );
};

export default LoginCover;
