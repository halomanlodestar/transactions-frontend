/** @format */
import { Link } from "@tanstack/react-router";
import { Transaction } from "../../types";

interface Props {
	transaction: Transaction;
}

const TransactionCard = ({ transaction }: Props) => {
	return (
		<Link
			to="/transactions/$id"
			className="flex flex-col p-2 border rounded space-y-2"
			params={{ id: transaction.id }}
		>
			<div className="flex items-center space-x-5">
				<span>{transaction.sender}</span>
				<span className="text-2xl">&rarr;</span>
				<span>{transaction.recipient}</span>
			</div>
			<hr />
			<div className="flex items-center justify-between">
				<strong>{transaction.amount}</strong>
				<span>{transaction.createdAt}</span>
			</div>
		</Link>
	);
};

export default TransactionCard;
