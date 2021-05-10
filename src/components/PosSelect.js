import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

function PosSelect({
	clear,
	states,
	positions,
	updateRecords,
	filterRecords,
	updatePosition,
}) {
	const VALUE_PREFIX = "Pos: ";
	const options = positions.map((pos) => ({
		value: pos,
		label: pos,
	}));
	const styles = {
		container: (base) => ({
			...base,
			minWidth: 110,
			maxWidth: 110,
			flex: 1,
		}),
	};
	return (
		<Select
			className="m-2"
			key={clear}
			placeholder={states.position ? states.position : "All"}
			components={{
				SingleValue: ({ children, ...props }) => {
					return (
						<components.SingleValue {...props}>
							{VALUE_PREFIX + children}
						</components.SingleValue>
					);
				},
				Placeholder: ({ children, ...props }) => {
					return (
						<components.Placeholder {...props}>
							{VALUE_PREFIX + children}
						</components.Placeholder>
					);
				},
				IndicatorSeparator: () => null,
			}}
			onChange={(option) => {
				const selected = option ? option.value : "All";
				updatePosition(selected);
				const result = filterRecords("Pos", selected, states);
				updateRecords(result);
			}}
			options={options}
			styles={styles}
		/>
	);
}

PosSelect.propTypes = {
	clear: PropTypes.string,
	s1Sets: PropTypes.array,
	s2Sets: PropTypes.array,
	states: PropTypes.object,
	updatePosition: PropTypes.func,
	updateRecords: PropTypes.func,
	filterRecords: PropTypes.func,
};

export default PosSelect;
