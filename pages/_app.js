import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import "@/styles/nProgressBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { ...pageProps } }) {
	const router = useRouter();
	NProgress.configure({ showSpinner: false });

	useEffect(() => {
		router.events.on("routeChangeStart", () => NProgress.start());
		router.events.on("routeChangeComplete", () => NProgress.done());
		router.events.on("routeChangeError", () => NProgress.done());
	}, [router.events]);

	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<meta name="Developed By" content="RootDevs ❤️" />
				<meta
					name="Description"
					content="Enjoy Football Matches Live Streaming
          From All Over The World In This App."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				></meta>
				<link rel="icon" href="/static/images/logo.png" />
			</Head>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</QueryClientProvider>
	);
}
