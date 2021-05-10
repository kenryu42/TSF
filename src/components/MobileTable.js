import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatatable from "@ashvin27/react-datatable";

// Datatable styling using styled-components
const Table = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 13px;
	padding: 20px;
`;
const Red = styled.span`
	color: #ef4444;
	font-weight: bold;
`;
const Green = styled.span`
	color: #10b981;
	font-weight: bold;
`;

// Datatable columns setting
const columns = [
	{
		key: "flowID",
		className: "text-center",
		text: "ID",
		align: "center",
		sortable: true,
	},
	{
		key: "playerName",
		className: "text-center",
		text: "Name",
		align: "center",
		sortable: true,
		cell: (record) => {
			return (
				<a href={record.link} target="_blank" rel="noreferrer noopener">
					{record.playerName}
				</a>
			);
		},
	},
	{
		key: "playCategory",
		className: "text-center",
		text: "Play",
		align: "center",
		sortable: true,
	},
	{
		key: "position",
		className: "text-center",
		text: "Pos",
		align: "center",
		sortable: true,
	},
	{
		key: "totalMinted",
		className: "text-center",
		text: "CC",
		align: "center",
		sortable: true,
		cell: (record) => {
			if (record.retired) {
				return <Red>{record.totalMinted}</Red>;
			}
			return <Green>{record.totalMinted}</Green>;
		},
	},
];

// Datatable config setting
const config = {
	page_size: 10,
	key_column: "link",
	length_menu: [10, 20, 50],
	no_data_text: "No data available!",
	sort: { column: "flowID", order: "desc" },
};

function MobileDatatTable({ records }) {
	return (
		<Table>
			<ReactDatatable
				config={config}
				columns={columns}
				records={records}
				dynamic={false}
				extraButtons={[]}
			/>
		</Table>
	);
}

MobileDatatTable.propTypes = {
	records: PropTypes.array,
};

export default MobileDatatTable;
