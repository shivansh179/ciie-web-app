import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import DefaultLayout from "@/layouts/default";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { auth } from '@/firebaseconfig';
import Navbar from '../navbar1';

export default function IndexPage() {
  const [username, setUsername] = useState('');

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email); // Use displayName or email as fallback
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
     <>

       <Navbar/>
      <BackdropAnimation />

     
        
        <h1 className='flex items-center justify-center'>This is admin page</h1>
 </>
  );
}
