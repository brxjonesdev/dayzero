import React from 'react';
import { Button } from '../shadcn/ui/button';
import Link from 'next/link';

export default function LoggedInButton() {
  return (
    <Link href={'/home'}>
      <Button className="font-onest text">Go to Journal</Button>
    </Link>
  );
}
