'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './auth.module.scss';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';

const AuthPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const validatePhoneNumber = (number: string): boolean => {
    const phoneRegex = /^09\d{9}$/;
    if (!number) {
      setPhoneError('شماره تلفن نمی‌تواند خالی باشد.');
      return false;
    }
    if (!phoneRegex.test(number)) {
      setPhoneError('فرمت شماره تلفن معتبر نیست (مثال: 09123456789).');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    validatePhoneNumber(e.target.value);
  };

  const handleLogin = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
      const data = await response.json();
      const user = data.results[0];

      localStorage.setItem('user', JSON.stringify(user));

      router.push('/dashboard');
    } catch (error) {
      setPhoneError('خطا در ورود. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>ورود به حساب کاربری</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <Input
            id="phoneNumber"
            label="شماره تلفن"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            error={phoneError}
            placeholder="مثال: 09123456789"
            maxLength={11}
          />
          <Button type="submit" disabled={isLoading || !!phoneError || !phoneNumber}>
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;