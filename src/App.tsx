import {createContext, useEffect, useState} from 'react';
import './App.css';
import TDAmeritrade from 'tdameritrade'

const CONSUMER_KEY = 'SHEEQPMVZTPIQEY5LPWNM9BIJ5HAKKCV'

function App() {
	const td = new TDAmeritrade(CONSUMER_KEY)
	const [status, setStatus] = useState<"success" | "loading" | "fail">("loading")
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		console.log(urlParams.toString())
		const code = urlParams.get('code')
		if (!code) {
			setStatus("fail")
			return
		}

		(async() => {
			try {
				await td.submitAuthToken(urlParams.get('code')!, true, 'https://localhost:3000')
				setStatus("success")
			} catch (error) {
				setStatus("fail")
				return
			}

		})()
	}, [])

	const currentPage = () => {
		switch (status) {
			case "loading":
				return (
					"Logging in"			
				)
			case "success":
				return (
					"Logged in"
				)
			case "fail":
				return (
					"Failed login"
				)
		}
	}

	return (
		<div className="flex justify-center w-full">
			{currentPage()}
		</div>
	)
}

export default App;
