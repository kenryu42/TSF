import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useViewport } from "../functions/useViewport";

function DescToggle({ show, setShow }) {
	const { width } = useViewport();
	const breakpoint = 780;
	return width < breakpoint ? (
		<></>
	) : (
		<Button
			id="dropdown-basic"
			className="m-2 font-weight-bold"
			variant="info"
			title="Hide/Show"
			onClick={() => {
				setShow(!show);
			}}
		>
			{show ? "Lite Mode" : "Pro Mode"}
		</Button>
	);
}

DescToggle.propTypes = {
	show: PropTypes.bool,
	setShow: PropTypes.func,
};

export default DescToggle;
