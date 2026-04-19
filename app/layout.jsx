import './globals.css';

export const metadata = {
  title: 'Prince Rai | Full Stack Engineer | AI & Agentic Systems',
  description:
    'I build full-stack applications and intelligent AI systems, including agentic workflows that solve real-world problems.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
