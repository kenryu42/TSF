import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

function SNSelect({
	clear,
	states,
	updateRecords,
	filterRecords,
	updateSeriesNum,
}) {
	const VALUE_PREFIX = "Series: ";
	const options = [
		{ value: "All", label: "All" },
		{ value: "S1", label: "S1" },
		{ value: "S2", label: "S2" },
	];
	const styles = {
		container: (base) => ({
			...base,
			minWidth: 130,
			maxWidth: 130,
			flex: 1,
		}),
	};
	return (
		<Select
			className="m-2"
			key={clear}
			placeholder={states.seriesNum ? states.seriesNum : "All"}
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
				updateSeriesNum(selected);
				const result = filterRecords("Series", selected, states);
				updateRecords(result);
			}}
			options={options}
			styles={styles}
		/>
	);
}

SNSelect.propTypes = {
	circulations: PropTypes.array,
	states: PropTypes.object,
	updateCirculation: PropTypes.func,
	updateRecords: PropTypes.func,
	filterRecords: PropTypes.func,
	clear: PropTypes.string,
};

export default SNSelect;
