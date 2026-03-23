import { RegistrationForm } from "./features/RegistrationForm";

function App() {
  return (
    <div className="min-h-screen bg-[#F9EAF3] flex flex-col items-center">
      {/* <Header />  */}
      <div className=" px-4 w-full flex justify-center">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
