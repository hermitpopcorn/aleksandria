import Header from "@components/Header";
import Footer from "@components/Footer";

export default function HomePage() {
  return (
    <div className="container">
      <main>
        <Header title="Welcome to my app!" />
        <p className="description my-3">
          Get started by editing <code>app/home-page.tsx</code>
        </p>
      </main>

      <Footer />
    </div>
  );
}
