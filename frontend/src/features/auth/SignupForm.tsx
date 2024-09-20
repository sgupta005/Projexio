import { Button } from '@/ui/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import { Input } from '@/ui/shadcn/ui/input';
import { Label } from '@/ui/shadcn/ui/label';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterUsers } from './useRegisterUser';
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

  const errorClassName = 'text-red-400 text-sm';

  const { registerUser, isRegistering } = useRegisterUsers();

  const onSubmit: SubmitHandler<SignupFormFields> = (data) => {
    registerUser(data);
  };
  const handleGoogleSignup = useGoogleAuth();

  return (
    <div className="flex h-screen justify-center items-center">
      <MotionDiv>
        <GradientShadow>
          <Card className="mx-auto border-none">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Max"
                      {...register('firstName', {
                        required: 'First Name is required',
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Robinson"
                      {...register('lastName', {
                        required: 'Last Name is required',
                      })}
                    />
                  </div>
                  {errors.firstName && (
                    <span className={errorClassName}>
                      {errors.firstName.message}
                    </span>
                  )}
                  {errors.lastName && (
                    <span className={errorClassName}>
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
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
                    <div className={errorClassName}>{errors.email.message}</div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be atleast 8 characters.',
                      },
                    })}
                  />
                  {errors.password && (
                    <div className={errorClassName}>
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {isRegistering ? <SpinnerMini /> : 'Create an account'}
                </Button>
              </form>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleGoogleSignup}
              >
                <GoogleLogo />
                Sign up with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <span
                  className="underline hover:cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </span>
              </div>
            </CardContent>
          </Card>
        </GradientShadow>
      </MotionDiv>
    </div>
  );
}
