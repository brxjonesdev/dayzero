'use client';

import { Button } from '@/components/shadcn/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/shadcn/ui/card';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { Separator } from '@/components/shadcn/ui/separator';

export default function Settings() {
  const handleLogout = () => {
    // Logic for logging out (e.g., clearing session, redirecting, etc.)
    console.log("User logged out");
  };

  const handleDeleteAccount = () => {
    // Logic for deleting the account (e.g., making a delete API call, confirmation prompt, etc.)
    console.log("Account deleted");
  };

  return (
    <main className="flex-1 flex flex-row font-onest p-6 overflow-y-scroll w-full">
      <div className="w-5/12 flex justify-end pr-12">
        <h2 className="font-unbounded text-2xl font-bold">Settings</h2>
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-4 h-full overflow-y-scroll w-7/12 px-12">
        <Card className="h-fit w-full ">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="space-x-2 flex">
                <Button
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Log Out
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Delete Account
                </Button>
              </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
