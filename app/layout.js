import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Firebase Dashboard",
  description: "Next.js Firebase Authentication and Firestore dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
