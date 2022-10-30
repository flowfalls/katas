import { Newline } from "ink";

const React = require("react");
const { useState } = require("react");
const { Text, useInput } = require("ink");

/**
 * Handle Deposit Input
 */
function handleInput(acc: string, setAcc: any, updateParent: any) {
	return function (str: string, key: any) {
		if (key.leftArrow) {
			setAcc(acc.substring(0, acc.length - 1));
		} else if (key.return) {
			let poundsToPence = parseInt(acc) * 100;
			updateParent({ balance: poundsToPence });
		} else if (!/[0-9]/.test(str)) {
			return;
		} else {
			setAcc(acc + str);
		}
	};
}
// @ts-ignore
const DepositPrompt = ({updateGameStats}) => {
	let [input, setInput] = useState("");
	useInput(handleInput(input, setInput, updateGameStats));
	return (
	<><Text>Insert Pound Coins: {input}</Text><Newline /><Text small>Press left arrow to delete, enter to continue</Text></>
	)
};

module.exports = DepositPrompt;
export default DepositPrompt;
