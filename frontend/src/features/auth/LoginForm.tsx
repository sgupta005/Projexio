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
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from './useLoginUser';
import SpinnerMini from '@/ui/SpinnerMini';
import { motion } from 'framer-motion';
import GoogleLogo from '@/ui/GoogleLogo';
import { LoadingSpinner } from '@/ui/Spinner';
import { useGoogleAuthQuery } from './useGoogleAuthQuery';
import { useGoogleAuth } from './useGoogleAuth';

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

  const popInVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
  };
  const errorClassName = 'text-red-400 text-sm';

  if (isLoggingGoogle) return <LoadingSpinner />;
  return (
    <div className="flex h-screen justify-center items-center">
      <motion.div
        className="w-full max-w-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={popInVariants}
      >
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
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
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
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
                <Button type="submit" className="w-full">
                  {islogging ? <SpinnerMini /> : 'Login'}
                </Button>
              </div>
            </form>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={handleLoginWithGoogle}
            >
              <GoogleLogo />
              Login with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <span
                className="underline hover:cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
