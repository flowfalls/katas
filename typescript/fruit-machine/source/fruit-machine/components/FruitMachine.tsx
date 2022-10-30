import React, { Fragment, useState } from "react";
import DepositPrompt from "./FruitMachineParts/DepositPrompt";
import Stats from "./FruitMachineParts/Stats";
import { GameStats } from "../common/game-stats.type";
import { Text, useInput } from "ink";
import { Game, randomEnum, Options } from "./FruitMachineParts/RandomGenerate";
import FruitMachineResults from "./FruitMachineParts/FruitMachineResults";

const FruitMachine = () => {
	const gameCost = 20; // cost per game
	const jackpotPrize = 2000; // jackpot prize
	const normalPrize = 1000; // normal prize

	const defaultMessage = "Game is running, press 'tab' to play - costs 20p";


	const [data, setData] = useState({
		balance: 0,
		wins: 0,
		freePlayActivated: false,
		freePlays: 0,
		houseBalance: 2000,
		costPerPlay: gameCost,
		inPlay: true,
		currentMessage: defaultMessage,
		results: false,
	} as GameStats);

	/**
	 * Update the stats based on the results of the game
	 * @param update - the update to apply to the stats
	 */
	function updateGameStats(update: Partial<GameStats>) {
		if (update.results !== false) {

			// the following detect duplicates by removing the duplicate keys
			const results = [...new Set(update.results as Game)].length;

			if (results === 1) { // jackpot, 4 of the same!
				update.balance = data.balance + jackpotPrize;
				update.houseBalance = data.houseBalance - jackpotPrize;
			} else if (results > 1 && results < 4) { // duplicates are present!
				update.balance = data.balance + gameCost * 5;
				update.houseBalance = data.houseBalance - gameCost * 5;
			} else if (results === 4) { // no matches, but still a win - no idea why...
				update.balance = data.balance + normalPrize;
				update.houseBalance = data.houseBalance - normalPrize;
			}

			if (update.houseBalance && update.houseBalance < 0 && !data.freePlayActivated) {
				update.freePlays = Math.abs(update.houseBalance! / gameCost);
				update.freePlayActivated = true;
				update.houseBalance = 0 ;
			}
		}

		let updatedData = {
			...data,
			...update,
		};
		setData(updatedData);
	}

	//@ts-ignore
	useInput((input, key) => {
		if (key.tab) {
			if (data.balance <= 0) {
				updateGameStats({ currentMessage: "Please insert coins" });
			} else {
				let roundResults: Game = [
					randomEnum(Options),
					randomEnum(Options),
					randomEnum(Options),
					randomEnum(Options),
				];

				if (data.freePlays > 0) { // use a free play
					updateGameStats({
						freePlays: data.freePlays - 1,
						results: roundResults,
					});
				} else {
					updateGameStats({
						balance: data.balance - gameCost, // exchange 20p for a game
						houseBalance: data.houseBalance += gameCost,
						results: roundResults,
					});
				}
			}
		}
	});

	return (
		<Fragment>
			<Stats data={data} />
			{data.balance === 0 && (
				<DepositPrompt updateGameStats={updateGameStats} />
			)}
			{data.balance > 0 && <Text>{data.currentMessage}</Text>}
			{data.results && <FruitMachineResults results={data} />}
		</Fragment>
	);
};

module.exports = FruitMachine;
export default FruitMachine;
