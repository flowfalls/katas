import {Game} from '../components/FruitMachineParts/RandomGenerate';
export interface GameStats {
	balance: number;
	wins: number;
	freePlayActivated?: boolean;
	freePlays: number;
	houseBalance: number;
	costPerPlay: number;
	inPlay?: boolean;
	currentMessage?: string;
	results: Game | false;
}
