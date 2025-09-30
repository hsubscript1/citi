'use client';
import React from 'react'
import UserSettings from '../components/userSettings'
import { User } from '../components/type'
import { useAppStore } from '@/app/store/useApp';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

const userSet = () => {
      const { user, setUser} = useAppStore();
     const handleUpdateUser = (updatedUser: User) => {
        setUser(updatedUser);
      };
  return (
    <div>
        <Link href='/account/dashboard' className='md:hidden flex'>
        <IoArrowBack size={20} />
</Link>
     <UserSettings user={user} onUpdateUser={handleUpdateUser} />;
    </div>
  )
}

export default userSet;