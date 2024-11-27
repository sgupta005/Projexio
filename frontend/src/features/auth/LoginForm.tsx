import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from './useLoginUser';
import SpinnerMini from '@/ui/SpinnerMini';
import GoogleLogo from '@/ui/GoogleLogo';
import { LoadingSpinner } from '@/ui/Spinner';
import { useGoogleAuthQuery } from './useGoogleAuthQuery';
import { useGoogleAuth } from './useGoogleAuth';
import MotionDiv from '@/ui/MotionDiv';
import GradientShadow from '@/ui/GradientShadow';
import Input from '@/ui/Input';
import Button from '@/ui/Button';

export type LoginFormFields = {
  email: string;
  password: string;
};

export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const { loginUser, islogging } = useLoginUser();
  const { isLoggingGoogle } = useGoogleAuthQuery();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    loginUser(data);
  };
  const handleLoginWithGoogle = useGoogleAuth();

  const errorClassName = 'text-red-400 text-sm';

  if (isLoggingGoogle) return <LoadingSpinner />;
  return (
    <div className="flex h-screen justify-center items-center overflow-x-hidden">
      <MotionDiv>
        <GradientShadow>
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-6">
              <div className=" space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500">
                  Enter your email and password to login to your account
                </p>
              </div>

              <div className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid mb-4">
                    <div className="grid gap-2">
                      <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                          },
                        })}
                      />
                      {errors.email && (
                        <div className={errorClassName}>
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div className="grid gap-2 mt-2">
                      <div className="flex items-center"></div>
                      <Input
                        label="Password"
                        id="password"
                        type="password"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters.',
                          },
                        })}
                      />
                      {errors.password && (
                        <div className={errorClassName}>
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    {islogging ? <SpinnerMini /> : 'Login'}
                  </Button>
                </form>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLoginWithGoogle}
                >
                  <GoogleLogo />
                  Login with Google
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{' '}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GradientShadow>
      </MotionDiv>
    </div>
  );
}
