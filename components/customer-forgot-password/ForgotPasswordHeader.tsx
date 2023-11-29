import React from "react";
import Logo from "../Logo";

interface ForgotPasswordHeaderProps {
  title: string;
}

const ForgotPasswordHeader: React.FC<ForgotPasswordHeaderProps> = ({
  title,
}) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <a href="/" className="inline-block">
          <Logo />
        </a>
        <h3 className="text-2xl text-gray-900 font-semibold">
          Customer Forgot Password
        </h3>
      </div>
      <h2 className="mt-4 text-sm font-normal tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
};

export default ForgotPasswordHeader;
