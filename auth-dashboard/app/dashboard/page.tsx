'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.scss';
import Button from '@/components/button/Button';

interface User {
  name: {
    first: string;
    last: string;
  };
}

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/auth');
    }
  }, [router]);

  if (!user) {
    return <div className={styles.dashboardContainer}>در حال بارگذاری...</div>;
  }
 const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <h1 className={styles.welcomeMessage}>
          به داشبورد خوش آمدید!
        </h1>
        <p className={styles.infoText}>این یک صفحه داشبورد ساده است.</p>
        <div className={styles.logoutButtonContainer}>
          <Button onClick={handleLogout}>
            بازگشت به صفحه ورود
          </Button>
        </div>
      </div>
    </div>
  );

};

export default DashboardPage;