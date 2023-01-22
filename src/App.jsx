import Hero from "./components/Hero";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[90%] sm:w-[580px]  min-h-screen mx-auto">
      <Hero />
      <Form />
    </div>
  )
}

export default App;
