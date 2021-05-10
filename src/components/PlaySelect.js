import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

function PlaySelect({
	playTypes,
	clear,
	states,
	updateRecords,
	filterRecords,
	updatePlayType,
}) {
	const VALUE_PREFIX = "Play: ";
	const options = playTypes.map((type) => ({
		value: type,
		label: type,
	}));
	const styles = {
		container: (base) => ({
			...base,
			minWidth: 164,
			maxWidth: 164,
			flex: 1,
		}),
	};
	return (
		<Select
			className="m-2"
			key={clear}
			placeholder={states.playType ? states.playType : "All"}
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
				updatePlayType(selected);
				const result = filterRecords("Play", selected, states);
				updateRecords(result);
			}}
			options={options}
			styles={styles}
		/>
	);
}

PlaySelect.propTypes = {
	playTypes: PropTypes.array,
	states: PropTypes.object,
	updatePlayType: PropTypes.func,
	updateRecords: PropTypes.func,
	filterRecords: PropTypes.func,
	clear: PropTypes.string,
};

export default PlaySelect;
