import { useRef, useState } from "react";
import "./App.css";

const App = () => {
	const url = "https://dummyjson.com/products/add", titleRef = useRef()
	const method = "POST", headers = { "Content-Type": "application/json" };

	const [title, setTitle] = useState(''), [controller, setController] = useState(new AbortController());

	const getProducts = async value => {
		setTitle(value); controller.abort();

		setTimeout(() => {
			const newController = new AbortController(), currentValue = titleRef.current.value;
			const signal = newController.signal, body = JSON.stringify({ title: value });
			if (currentValue === value) fetch(url, { method, headers, body, signal }).catch(console.log);
			setController(newController);
		}, 100);
	}

	return (
		<div className="App">
			<input type={"text"} ref={titleRef} value={title} onChange={e => getProducts(e.target.value)} />
		</div>
	);
}

export default App;
