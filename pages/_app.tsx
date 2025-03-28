import Wrapper from "@/layout/wrapper/Wrapper";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
