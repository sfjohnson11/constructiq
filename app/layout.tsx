export const metadata = {
  title: "ConstructIQ",
  description: "ConstructIQ – Modern Construction Project Intelligence"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The global Tailwind CSS styles are imported in globals.css */}
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
