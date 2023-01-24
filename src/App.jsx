import { AppProvider } from './context/AppContext'
import Hero from "./components/Hero";
import Form from "./components/Form";

const App = () => {
  return (
    <AppProvider>
      <div className="flex flex-col justify-center items-center w-[90%] sm:w-[580px]  min-h-screen mx-auto">
        <Hero />
        <Form />
      </div>
    </AppProvider>
  )
}

export default App;
