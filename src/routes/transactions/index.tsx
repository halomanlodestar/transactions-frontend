/** @format */

import { createFileRoute } from "@tanstack/react-router";
import { getTransactions } from "@/libs/mock";
import TransactionCard from "@/components/TransactionCard";

export const Route = createFileRoute("/transactions/")({
	component: RouteComponent,
	loader: async () => {
		const transactions = await getTransactions();
		return {
			transactions,
		};
	},
});

function RouteComponent() {
	const { transactions } = Route.useLoaderData();

	return (
		<div className="flex flex-col space-y-3">
			<h1 className="text-4xl">Past Transactions</h1>
			<div className="space-y-2">
				{transactions.map((transaction) => (
					<TransactionCard transaction={transaction} />
				))}
			</div>
		</div>
	);
}
