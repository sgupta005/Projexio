import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterUsers } from './useRegisterUser';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import SpinnerMini from '@/ui/SpinnerMini';
import GoogleLogo from '@/ui/GoogleLogo';
import { useGoogleAuth } from './useGoogleAuth';
import MotionDiv from '@/ui/MotionDiv';
import GradientShadow from '@/ui/GradientShadow';

export type SignupFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>();

  const { registerUser, isRegistering } = useRegisterUsers();
  const handleGoogleAuth = useGoogleAuth();

  const onSubmit: SubmitHandler<SignupFormFields> = (data) => {
    registerUser(data);
  };

  return (
    <div className="flex h-screen justify-center items-center overflow-x-hidden p-6">
      <MotionDiv>
        <GradientShadow>
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h2>
                <p className="text-sm text-gray-500">
                  Enter your details below to create your account
                </p>
              </div>

              <div className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="John"
                        id="firstName"
                        label="First Name"
                        error={errors.firstName?.message}
                        {...register('firstName', {
                          required: 'First name is required',
                        })}
                      />
                      <Input
                        type="text"
                        placeholder="Doe"
                        id="lastName"
                        label="Last Name"
                        error={errors.lastName?.message}
                        {...register('lastName', {
                          required: 'Last name is required',
                        })}
                      />
                    </div>

                    <Input
                      placeholder="m@gmail.com"
                      id="email"
                      type="email"
                      label="Email"
                      error={errors.email?.message}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />

                    <Input
                      id="password"
                      type="password"
                      label="Password"
                      error={errors.password?.message}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full">
                    {isRegistering ? <SpinnerMini /> : 'Sign up'}
                  </Button>
                </form>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleAuth}
                >
                  <GoogleLogo />
                  Sign up with Google
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate('/login')}
                  >
                    Login
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
