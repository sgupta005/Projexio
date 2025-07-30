import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from './useLoginUser';
import GoogleLogo from '@/ui/GoogleLogo';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { useGoogleAuthQuery } from './useGoogleAuthQuery';
import { useGoogleAuth } from './useGoogleAuth';
import MotionDiv from '@/ui/MotionDiv';
import GradientShadow from '@/ui/GradientShadow';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  if (isLoggingGoogle) return <LoadingSpinner />;
  return (
    <div className="flex min-h-svh justify-center items-center overflow-x-hidden p-6">
      <MotionDiv>
        <GradientShadow>
          <div className="w-full max-w-md md:max-w-lg mx-auto bg-background rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 space-y-4 md:space-y-6">
              <div className=" space-y-1">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-sm md:text-base text-gray-500">
                  Enter your email and password to login to your account
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid mb-4">
                    <div className="grid gap-2">
                      <Input
                        label="Email"
                        id="email"
                        error={errors.email?.message}
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
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Input
                        label="Password"
                        id="password"
                        error={errors.password?.message}
                        type="password"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters.',
                          },
                        })}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    {islogging ? <LoadingSpinner variant="small" /> : 'Login'}
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
