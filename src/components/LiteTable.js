import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatatable from "@ashvin27/react-datatable";

// Datatable styling using styled-components
const Table = styled.div`
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
	},
	{
		key: "playCategory",
		className: "text-center",
		text: "Play",
		align: "center",
		sortable: true,
	},
	{
		key: "setName",
		className: "text-center",
		text: "Set",
		align: "center",
		sortable: true,
	},
	{
		key: "series",
		className: "text-center",
		text: "S/N",
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
	{
		key: "position",
		className: "text-center",
		text: "Pos",
		align: "center",
		sortable: "true",
	},
	{
		key: "link",
		text: "Link",
		align: "center",
		cell: (record) => {
			return (
				<Fragment>
					<div className="d-flex justify-content-center">
						<button
							className="btn btn-primary btn-sm"
							onClick={gotoLink.bind(this, record)}
							style={{ marginRight: "5px" }}
						>
							Topshot
						</button>
					</div>
				</Fragment>
			);
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

// Function that open topshot window
const gotoLink = (record) => {
	window.open(record.link);
};

function LiteTable({ records }) {
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

LiteTable.propTypes = {
	records: PropTypes.array,
};

export default LiteTable;
