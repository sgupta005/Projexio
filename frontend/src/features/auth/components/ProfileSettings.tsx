import { Button } from '@/components/ui/button';
import ImageUpload from '@/ui/ImageUpload';
import useCurrentUser from '../hooks/useCurrentUser';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useState, FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const navigate = useNavigate();
  const { user, isGettingUser } = useCurrentUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (isGettingUser) return <LoadingSpinner />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!user?._id) return;

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);

    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    updateUser(formData);
  };

  return (
    <div className="mx-6 flex flex-col gap-4 mb-4">
      <Button
        variant="outline"
        className="w-max flex gap-1"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-4" /> Back
      </Button>
      <div className="py-4 px-6 border rounded-md">
        <h1 className="font-semibold text-xl">Profile Settings</h1>
        <p className="text-primary/60 text-sm mb-4">
          Update your personal information and profile picture
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="firstName" className="font-semibold">
                First Name
              </Label>
              <Input
                className="border w-full rounded px-2 py-1 mt-2"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="font-semibold">
                Last Name
              </Label>
              <Input
                className="border w-full rounded px-2 py-1 mt-2"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="email" className="font-semibold">
              Email Address
            </Label>
            <Input
              className="border w-full rounded px-2 py-1 mt-2"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <ImageUpload
            title="Profile Picture"
            setImage={setSelectedImage}
            defaultImage={user?.avatar}
          />

          <div className="flex gap-4 mt-6 mb-2">
            <Button
              type="submit"
              className="mr-0 ml-auto"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
