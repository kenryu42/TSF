import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

const groupStyles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
};
const groupBadgeStyles = {
	backgroundColor: "#EBECF0",
	borderRadius: "2em",
	color: "#172B4D",
	display: "inline-block",
	fontSize: 12,
	fontWeight: "normal",
	lineHeight: "1",
	minWidth: 1,
	padding: "0.16666666666667em 0.5em",
	textAlign: "center",
};

const formatGroupLabel = (data) => (
	<div style={groupStyles}>
		<span>{data.label}</span>
		<span style={groupBadgeStyles}>{data.options.length}</span>
	</div>
);

function SetSelect({
	clear,
	states,
	s1Sets,
	s2Sets,
	updateRecords,
	filterRecords,
	updateSetName,
}) {
	const VALUE_PREFIX = "Set: ";
	const s1Options = s1Sets.map((set) => ({
		value: set,
		label: set,
	}));
	const s2Options = s2Sets.map((set) => ({
		value: set,
		label: set,
	}));
	const options = [
		{ value: "All", label: "All" },
		{
			label: "SERIES 2",
			options: s2Options,
		},
		{
			label: "SERIES 1",
			options: s1Options,
		},
	];
	const styles = {
		container: (base) => ({
			...base,
			flex: 1,
			minWidth: 330,
			maxWidth: 330,
		}),
	};
	return (
		<Select
			className="m-2"
			key={clear}
			placeholder={states.setName ? states.setName : "All"}
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
				updateSetName(selected);
				const result = filterRecords("Set", selected, states);
				updateRecords(result);
			}}
			options={options}
			styles={styles}
			formatGroupLabel={formatGroupLabel}
		/>
	);
}

SetSelect.propTypes = {
	clear: PropTypes.string,
	s1Sets: PropTypes.array,
	s2Sets: PropTypes.array,
	states: PropTypes.object,
	updateSetName: PropTypes.func,
	updateRecords: PropTypes.func,
	filterRecords: PropTypes.func,
};

export default SetSelect;
