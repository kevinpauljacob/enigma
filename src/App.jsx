import Hero from "./components/Hero";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[40%] min-h-screen mx-auto">
      <Hero />
      <Form />
    </div>
  )
}

export default App;
