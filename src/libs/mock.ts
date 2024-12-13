/** @format */

import { Transaction } from "../../types";

const transactions: Transaction[] = [
	{
		id: "txn1",
		sender: "Alice",
		recipient: "Bob",
		amount: 150.75,
		createdAt: "2024-12-13T10:15:30Z",
	},
	{
		id: "txn2",
		sender: "Charlie",
		recipient: "Diana",
		amount: 320.5,
		createdAt: "2024-12-12T14:20:45Z",
	},
	{
		id: "txn3",
		sender: "Eve",
		recipient: "Frank",
		amount: 45.0,
		createdAt: "2024-12-11T18:00:00Z",
	},
	{
		id: "txn4",
		sender: "George",
		recipient: "Helen",
		amount: 999.99,
		createdAt: "2024-12-10T08:30:15Z",
	},
	{
		id: "txn5",
		sender: "Ivy",
		recipient: "Jack",
		amount: 25.5,
		createdAt: "2024-12-13T12:45:00Z",
	},
];

export const getTransactions = async (
	id?: string | number
): Promise<Transaction[]> => {
	if (!id) return transactions;

	const out = transactions.filter((item) => item.id === id);

	return new Promise<Transaction[]>((resolve) => resolve(out));
};
