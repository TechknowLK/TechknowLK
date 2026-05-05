import './admin.css';

export const metadata = {
  title: 'TechknowLK Admin',
  description: 'Admin panel for TechknowLK',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
