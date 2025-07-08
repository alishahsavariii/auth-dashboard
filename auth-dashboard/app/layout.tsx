import './globals.scss';
import React from 'react';

export const metadata = {
  title: 'احراز هویت',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl"><body>{children}</body></html>
  );
}