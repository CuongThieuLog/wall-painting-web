import { queryClient } from "@/src/lib/react-query";
import { createEmotionCache, theme } from "@/src/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import "@/src/styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/src/lib/redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_KEY as string
  );

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Elements stripe={stripePromise} options={options}>
                  {getLayout(<Component {...pageProps} />)}
                  <ToastContainer />
                </Elements>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </SessionProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
