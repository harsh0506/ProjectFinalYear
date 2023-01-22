import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return(
 <Component {...pageProps} />
   
    )
}

export default MyApp
