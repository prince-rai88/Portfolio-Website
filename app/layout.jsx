import './globals.css';

export const metadata = {
  title: 'Prince Rai | Full Stack Engineer | AI & Agentic Systems',
  description:
    'Second-year CSE engineer who builds and ships production systems — full-stack web apps, LLM-powered backends, and agentic AI tools. Won 1st Place at a national hackathon, deployed multiple live apps, and actively freelancing.',
  keywords: [
    'Prince Rai',
    'Full Stack Developer',
    'AI Engineer',
    'React',
    'Django',
    'MCP',
    'LangChain',
    'Agentic AI',
    'Portfolio'
  ],
  authors: [{ name: 'Prince Rai' }],
  openGraph: {
    title: 'Prince Rai — Full Stack Developer & AI Engineer',
    description:
      'Building production systems, LLM-powered backends, and agentic AI tools. 1st Place NitroStack Hackathon winner. 9.9 CGPA.',
    url: 'https://princerai.dev',
    siteName: 'Prince Rai Portfolio',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Rai — Full Stack Developer & AI Engineer',
    description:
      'Building production systems, LLM-powered backends, and agentic AI tools. 1st Place NitroStack Hackathon winner.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
