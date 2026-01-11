import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import ChatbotInput from "./ChatbotInput";
import ChatArea from "./ChatArea";
function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <ChatArea />
    </ChakraProvider>
  );
}

export default App;
