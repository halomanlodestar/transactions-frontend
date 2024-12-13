/** @format */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="p-2 bg-slate-500 text-4xl">
			<h1>Welcome Home!</h1>
		</div>
	);
}
