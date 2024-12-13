/** @format */

import { Link } from "@tanstack/react-router";

const Navbar = () => {
	return (
		<header className="p-5 border-b flex justify-between items-center">
			<nav>
				<Link to="/">Transactions App</Link>
			</nav>
			<nav>
				<Link to="/auth/signin">Sign In</Link>
			</nav>
		</header>
	);
};

export default Navbar;
