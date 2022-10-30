import React, { useEffect } from "react";
import { Text, Box, Newline } from "ink";
import { GameStats } from "../../common/game-stats.type";

// @ts-ignore
const Stats = ({ data }: { data: GameStats }) => {
	//const [data, setData] = useState([]);

	useEffect(() => {});

	return (
		<Box borderStyle="single" padding={2} flexDirection="column">
			<Box>
				<Box width="50%">
					<Text>Balance</Text>
				</Box>
				<Box width="25%">
					<Text>Free Plays</Text>
				</Box>
				<Box width="25%">
					<Text>House Balance</Text>
				</Box>
			</Box>
			<Newline />

			<Box>
				<Box width="50%">
					<Text>{data.balance || 0}</Text>
				</Box>
				<Box width="25%">
					<Text>{data.freePlays || 0}</Text>
				</Box>
				<Box width="25%">
					<Text>{data.houseBalance || 0}</Text>
				</Box>
			</Box>
		</Box>
	);
};

module.exports = Stats;
export default Stats;
