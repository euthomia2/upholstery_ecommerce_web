import ForgotPasswordFooter from "./ForgotPasswordFooter";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordHeader from "./ForgotPasswordHeader";

const ForgotPasswordMain = () => {
  return (
    <div className="flex flex-1 flex-col bg-white justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-md ">
        <ForgotPasswordHeader
          title={`Enter your email and we'll send you a temporary password to your verified phone number`}
        />

        <div className="mt-10">
          <ForgotPasswordForm />

          <div className="mt-10">
            <ForgotPasswordFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordMain;
