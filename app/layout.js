import "@fontsource/bebas-neue/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata = {
  title: { default: "Kinetic House", template: "%s" },
  description:
    "Strength, conditioning, and mobility classes in the Old Mill District. A demo site built for the MyClickAid gallery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      style={{
        "--font-bebas": "'Bebas Neue'",
        "--font-inter2": "'Inter'",
      }}
    >
      <body className='font-body min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
