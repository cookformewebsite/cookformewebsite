import "../styles/tailwind.css";
import "../styles/loading.css";
import { AppProps } from "next/app";
import { ProvideAuth } from "../lib/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
