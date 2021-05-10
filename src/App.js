import data from "./data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Row, Container } from "react-bootstrap";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import SNSelect from "./components/SNSelect";
import MintedSelect from "./components/MintedSelect";
import PlaySelect from "./components/PlaySelect";
import PosSelect from "./components/PosSelect";
import SetSelect from "./components/SetSelect";
import ClearButton from "./components/ClearButton";
import { filterRecords } from "./functions/filter";

// Forming dropdown items array
let s1Sets = new Set();
let s2Sets = new Set();
let playTypes = new Set(["All"]);
let positions = new Set(["All"]);
const circulations = [
	"All",
	"4000",
	"10000",
	"12000",
	"15000",
	"35000",
	"35000LE",
];

data.forEach((record) => {
	if (record.series === "S1") s1Sets.add(record.setName);
	else s2Sets.add(record.setName);
	playTypes.add(record.playCategory);
	positions.add(record.position);
});

function App() {
	// Set up states
	const [records, setRecords] = useState(() => data);
	const [seriesNum, setSeriesNum] = useState(() => "");
	const [setName, setSetName] = useState(() => "");
	const [playType, setPlayType] = useState(() => "");
	const [position, setPosition] = useState(() => "");
	const [circulation, setCirculation] = useState(() => "");
	const [retire, setRetire] = useState(() => false);
	const [show, setShow] = useState(() => true);
	const [clear, setClear] = useState(() => "");
	const states = {
		data: data,
		setName: setName,
		position: position,
		playType: playType,
		seriesNum: seriesNum,
		circulation: circulation,
		retired: retire,
	};

	// Update functions
	const updateRecords = (newValue) => setRecords(() => newValue);

	const updateSeriesNum = (newValue) => {
		newValue = newValue === "All" ? "" : newValue;
		setSeriesNum(() => newValue);
	};

	const updateCirculation = (newValue) => {
		newValue = newValue === "All" ? "" : newValue;
		setCirculation(() => newValue);
	};
	const updateRetire = (newValue) => {
		setRetire(() => newValue);
	};

	const updatePlayType = (newValue) => {
		newValue = newValue === "All" ? "" : newValue;
		setPlayType(() => newValue);
	};

	const updateSetName = (newValue) => {
		newValue = newValue === "All" ? "" : newValue;
		setSetName(() => newValue);
	};

	const updatePosition = (newValue) => {
		newValue = newValue === "All" ? "" : newValue;
		setPosition(() => newValue);
	};

	return (
		<div>
			<Nav show={show} setShow={setShow} />
			<Container>
				<Row className="justify-content-center m-2">
					<SNSelect
						clear={clear}
						states={states}
						filterRecords={filterRecords}
						updateRecords={updateRecords}
						updateSeriesNum={updateSeriesNum}
					/>
					<MintedSelect
						clear={clear}
						states={states}
						circulations={circulations}
						filterRecords={filterRecords}
						updateRecords={updateRecords}
						updateCirculation={updateCirculation}
						updateRetire={updateRetire}
					/>
					<PlaySelect
						clear={clear}
						states={states}
						playTypes={[...playTypes]}
						filterRecords={filterRecords}
						updateRecords={updateRecords}
						updatePlayType={updatePlayType}
					/>
					<PosSelect
						clear={clear}
						states={states}
						positions={[...positions]}
						filterRecords={filterRecords}
						updateRecords={updateRecords}
						updatePosition={updatePosition}
					/>
					<SetSelect
						clear={clear}
						states={states}
						s1Sets={[...s1Sets]}
						s2Sets={[...s2Sets]}
						updateSetName={updateSetName}
						updateRecords={updateRecords}
						filterRecords={filterRecords}
					/>
					<ClearButton
						states={states}
						setClear={setClear}
						updateRecords={updateRecords}
						updateSetName={updateSetName}
						updatePlayType={updatePlayType}
						updatePosition={updatePosition}
						updateSeriesNum={updateSeriesNum}
						updateCirculation={updateCirculation}
						updateRetire={updateRetire}
					/>
				</Row>
			</Container>
			<DataTable records={records} show={show} />
			<Footer />
		</div>
	);
}

export default App;
