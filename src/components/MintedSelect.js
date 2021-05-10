import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

function CCSelect({
	circulations,
	clear,
	states,
	updateRetire,
	updateRecords,
	filterRecords,
	updateCirculation,
}) {
	const VALUE_PREFIX = "CC: ";
	const options = circulations.map((totalMinted) => ({
		value: totalMinted,
		label: totalMinted,
	}));
	const styles = {
		container: (base) => ({
			...base,
			minWidth: 150,
			maxWidth: 150,
			flex: 1,
		}),
	};
	return (
		<Select
			className="m-2"
			key={clear}
			placeholder={states.circulation ? states.circulation : "All"}
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
				updateCirculation(selected === "35000LE" ? "35000" : selected);
				if (selected === "35000LE") {
					updateRetire(true);
				} else {
					updateRetire(false);
				}
				const result = filterRecords("CC", selected, states);
				updateRecords(result);
			}}
			options={options}
			styles={styles}
		/>
	);
}

CCSelect.propTypes = {
	circulations: PropTypes.array,
	states: PropTypes.object,
	updateCirculation: PropTypes.func,
	updateRetire: PropTypes.func,
	updateRecords: PropTypes.func,
	filterRecords: PropTypes.func,
	clear: PropTypes.string,
};

export default CCSelect;
