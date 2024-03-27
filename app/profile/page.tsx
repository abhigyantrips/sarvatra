import { CalendarIcon } from 'lucide-react';
import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ChangePassword } from './change-password';
import { ContactForm } from './contact-form';
import { IdentificationForm } from './id-form';
import { ProfileForm } from './profile-form';

export default function Profile() {
  return (
    <div className="space-y-6 py-10">
      <div className="space-y-0.5 border-b pb-6">
        <h2 className="text-2xl tracking-tight">
          Jai Hind, <span className="font-bold">Lt. Col. Vivek</span>
        </h2>
        <p className="text-muted-foreground">
          Manage your profile details and other information here.
        </p>
      </div>
      <div className="grid items-start gap-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Contact an administrator to edit your critical personal details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="profile">
                Save
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Identification Details</CardTitle>
              <CardDescription>
                Information related to your government IDs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IdentificationForm />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="identification">
                Save
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>
                Your relevant phone number and email for contacting purposes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="contact">
                Save
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Securely update your password here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChangePassword />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="password">
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
