import { RegistrationForm } from "./features/RegistrationForm";
import headerBg from "./assets/image/header背景 1.svg";
import footerBg from "./assets/image/footer背景 1.svg";

const Header = () => (
  <header className="w-full">
    <img src={headerBg} alt="Header" className="w-full object-cover" />
  </header>
);

const Footer = () => (
  <footer className="w-full mt-auto">
    <img src={footerBg} alt="Footer" className="w-full object-cover" />
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-[#F9EAF3] flex flex-col items-center">
      {/* <Header />  */}
      <div className=" px-4 w-full flex justify-center">
        <RegistrationForm />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
