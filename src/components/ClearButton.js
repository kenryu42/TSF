import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { guidGenerator } from "../functions/guidGenerator";

function ClearButton({
	states,
	setClear,
	updateRecords,
	updateCirculation,
	updateRetire,
	updateSeriesNum,
	updatePlayType,
	updatePosition,
	updateSetName,
}) {
	return (
		<Button
			id="dropdown-basic"
			className="m-2"
			variant="outline-danger"
			title="Clear"
			onClick={() => {
				updateRecords(states.data);
				updateSetName("");
				updatePlayType("");
				updatePosition("");
				updateSeriesNum("");
				updateCirculation("");
				updateRetire(false);
				const guid = guidGenerator();
				setClear(guid);
			}}
		>
			Clear
		</Button>
	);
}

ClearButton.propTypes = {
	states: PropTypes.object,
	updateRecords: PropTypes.func,
	setClear: PropTypes.func,
	updateSeriesNum: PropTypes.func,
	updatePlayType: PropTypes.func,
	updatePosition: PropTypes.func,
	updateSetName: PropTypes.func,
	updateRetire: PropTypes.func,
	updateCirculation: PropTypes.func,
};

export default ClearButton;
