/** @format */

import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Navbar />
			<div className="px-5 p-4">
				<Toaster />
				<Outlet />
			</div>
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}