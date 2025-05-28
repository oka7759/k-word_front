import { useState } from "react";
import useCustomLogin from "../hooks/useCustomLogin";
import { EyeCloseIcon, EyeIcon } from "@/components/ui/Icon";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/InputField";
import Label from "@/components/ui/form/Label";
import { Modal } from "@/components/ui/modal/Modal";

function LoginPage() {
  const { doLogin, loginStatus, moveToPath, resetState } = useCustomLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    doLogin(email, pw);
  };

  const closeModal = () => {
    moveToPath("/");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-950">
      <Modal
        isOpen={loginStatus === "fulfilled"}
        onClose={closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="relative  p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl  lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800">
              로그인 성공
            </h4>
            <p className="mb-6 text-sm text-gray-500  lg:mb-7">
              메인페이지로 이동합니다.
            </p>
          </div>
          <Button size="lg" onClick={closeModal}>
            확인
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={loginStatus === "error"}
        onClose={resetState}
        className="max-w-[500px] m-4"
      >
        <div className="relative  p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl  lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800">
              로그인 실패
            </h4>
            <p className="mb-6 text-sm text-gray-500  lg:mb-7">
              로그인에 실패하였습니다.
            </p>
          </div>
          <Button size="lg" onClick={resetState}>
            확인
          </Button>
        </div>
      </Modal>
      <div className="w-full h-16 bg-blue-700 top-0 absolute left-0 flex items-center px-5">
        <h1 className="text-3xl font-black text-white"> K-WORD ADMIN</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="space-y-6">
          <div>
            <Label>
              Email <span className="text-error-500">*</span>{" "}
            </Label>
            <Input
              placeholder="info@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div>
            <Label>
              Password <span className="text-error-500">*</span>{" "}
            </Label>
            <div className="relative">
              <Input
                name="pw"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPw(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>

          <div>
            {loginStatus === "pending" ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Button
                className="w-full"
                size="sm"
                onClick={() => handleLogin()}
                variant="primary"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
