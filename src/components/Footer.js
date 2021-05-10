import React from "react";
import Info from "./Info";

function Footer() {
	return (
		<div>
			<Info />
			<p className="text-center">
				Made with ❤️ &nbsp;by&nbsp;
				<a
					href="https://nbatopshot.com/user/@kenxdrgn"
					target="_blank"
					rel="noopener noreferrer"
				>
					@kenxdrgn
				</a>
			</p>
			<p className="text-center">
				Inspired by{" "}
				<a
					href="https://topshotexplorer.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Topshot Explorer
				</a>
			</p>
		</div>
	);
}

export default Footer;
