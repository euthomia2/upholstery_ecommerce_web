import LoginCover from '@/components/login/LoginCover';
import LoginMain from '@/components/login/LoginMain';

export default function Login() {
  return (
    <div className='flex min-h-full flex-1 '>
      <LoginMain />
      <LoginCover />
    </div>
  );
}
