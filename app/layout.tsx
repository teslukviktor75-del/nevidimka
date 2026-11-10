import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nevidimka — знайомства з відчуттям близькості',
  description: 'Знаходь людей, з якими хочеться говорити. Безпечні знайомства лише для повнолітніх.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
