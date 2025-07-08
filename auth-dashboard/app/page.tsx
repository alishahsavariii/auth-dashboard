'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.scss"

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [router]);


  return (
 <div className={styles.container}>
      <p className={styles.message}>در حال هدایت به صفحه ورود...</p>
    </div>  );
}