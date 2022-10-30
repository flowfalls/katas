import React from "react";
import {Text, Box} from "ink";
import { GameStats } from "../../common/game-stats.type";
import { Game } from "./RandomGenerate";

// @ts-ignore
const FruitMachineResults = ({results}: {results: GameStats}) => {

    return (
		<Box marginLeft={10} flexDirection="row">
			{(results.results as Game).map((txt, index) => <Text key={index}>{txt}</Text>)}
		</Box>

	);
};

module.exports = FruitMachineResults;
export default FruitMachineResults;
