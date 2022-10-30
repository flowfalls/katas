import React, {useEffect, useState} from "react"
import { Box, Newline, useApp, useInput } from "ink"
import { PageProvider, pages } from './fruit-machine/components/PageContext';
import BigText from "ink-big-text";
import { Text } from "ink";
import Gradient from "ink-gradient";
import FruitMachine from "./fruit-machine/components/FruitMachine";
console.clear(); // clear the terminal

function App()
{
	const {exit} = useApp();
	let [page, setPage] = useState(pages.FruitMachine);

	useEffect(() => {
		setPage(pages.FruitMachine)
	}, []);

	// @ts-ignore
	useInput((input, key) => {
		if (key.escape) {
				exit();
		}
	});

	return (
		<PageProvider value={{ page, setPage }}>
			<Text>You can press "Esc" to exit the {page === 'main' ? 'app' : 'current page'}</Text>
			<Box justifyContent='center' alignItems='center' flexDirection='column'><Gradient name='teen'><BigText text="Fruity Machine" /></Gradient>
				<React.Fragment>
					<FruitMachine/>
				</React.Fragment>
				<Newline/>
			</Box>
		</PageProvider>
	);
}
module.exports = App;
export default App;
