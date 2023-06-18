import { createContext, useContext, useState } from "react";

const AdsContext = createContext({});

export const AdsProvider = ({ children }) => {
	const [counter, setCounter] = useState(0);

	return (
		<AdsContext.Provider
			value={{
				counter,
				setCounter,
			}}
		>
			{children}
		</AdsContext.Provider>
	);
};

export default function useAdsContext() {
	return useContext(AdsContext);
}
