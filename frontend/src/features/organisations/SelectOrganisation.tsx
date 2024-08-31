import { useState } from 'react';
// import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import { Input } from '@/ui/shadcn/ui/input';
import { Button } from '@/ui/shadcn/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/shadcn/ui/dialog';
import { PlusCircle, UserPlus } from 'lucide-react';

export default function Component() {
  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Acme Corp' },
    { id: 2, name: 'Globex' },
    { id: 3, name: 'Initech' },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  //   const createForm = useForm({
  //     defaultValues: { orgName: '' },
  //   });

  //   const joinForm = useForm({
  //     defaultValues: { orgId: '' },
  //   });

  //   const onCreateSubmit = (data) => {
  //     console.log('Creating organization:', data);
  //     setOrganizations([
  //       ...organizations,
  //       { id: organizations.length + 1, name: data.orgName },
  //     ]);
  //     setIsCreateModalOpen(false);
  //   };

  //   const onJoinSubmit = (data) => {
  //     console.log('Joining organization:', data);
  //     setIsJoinModalOpen(false);
  //   };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary/15 h-1/5 absolute w-full" />
      <div className="container mx-auto p-4 relative z-10 flex-grow flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Your Organizations</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-accent h-40">
                <CardContent className="flex flex-col items-center p-4">
                  <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                  <CardTitle className="text-sm mb-1">Create</CardTitle>
                  <CardDescription className="text-xs text-center">
                    New organization
                  </CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Organization</DialogTitle>
                <DialogDescription>
                  Enter the details for your new organization.
                </DialogDescription>
              </DialogHeader>
              {/* <Form {...createForm}>
                <form
                  onSubmit={createForm.handleSubmit(onCreateSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={createForm.control}
                    name="orgName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter organization name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create Organization
                  </Button>
                </form>
              </Form> */}
            </DialogContent>
          </Dialog>

          <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-accent h-40">
                <CardContent className="flex flex-col items-center p-4">
                  <UserPlus className="h-8 w-8 mb-2 text-muted-foreground" />
                  <CardTitle className="text-sm mb-1">Join</CardTitle>
                  <CardDescription className="text-xs text-center">
                    Existing organization
                  </CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join an Organization</DialogTitle>
                <DialogDescription>
                  Enter the ID of the organization you want to join.
                </DialogDescription>
              </DialogHeader>
              {/* <Form {...joinForm}>
                <form
                  onSubmit={joinForm.handleSubmit(onJoinSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={joinForm.control}
                    name="orgId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter organization ID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Join Organization
                  </Button>
                </form>
              </Form> */}
            </DialogContent>
          </Dialog>
          {organizations.map((org) => (
            <Card key={org.id} className="flex flex-col justify-between h-40">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{org.name}</CardTitle>
                <CardDescription className="text-xs">
                  ID: {org.id}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-2">
                <Button size="sm" className="w-full text-xs">
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
