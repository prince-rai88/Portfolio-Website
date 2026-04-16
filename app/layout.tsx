import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prince Rai | Full Stack Engineer | AI & Agentic Systems',
  description:
    'I build full-stack applications and intelligent AI systems, including agentic workflows that solve real-world problems.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
