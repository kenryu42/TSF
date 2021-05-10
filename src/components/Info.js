import React from "react";
import styled from "styled-components";
import { useViewport } from "../functions/useViewport";

const Infos = styled.span`
	color: #60a5fa;
	font-weight: bold;
`;

function Info() {
	const { width } = useViewport();
	const breakpoint = 780;

	return width < breakpoint ? (
		<Infos>
			<p className="text-center">Use desktop to access the full feature!</p>
		</Infos>
	) : (
		<></>
	);
}

export default Info;
