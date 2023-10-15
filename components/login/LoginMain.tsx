import LoginFooter from './LoginFooter';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const LoginMain = () => {
  return (
    <div className='flex flex-1 flex-col bg-white justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
      <div className='mx-auto w-full max-w-sm lg:w-96 '>
        <LoginHeader title='Sign in to your account' />

        <div className='mt-10'>
          <LoginForm />

          <div className='mt-10'>
            <LoginFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
