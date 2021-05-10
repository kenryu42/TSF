// Filter function
// This algorithm is O(N * M), which N is the size of Data, M is filter options size
// Currently there are 4 filter options (Series, Circulation, Play, Set)
export const filterRecords = (type, selected, states) => {
	// Initialize filter value
	if (selected === "All") selected = "";
	const seriesFilter = type === "Series" ? selected : states.seriesNum;
	const playFilter = type === "Play" ? selected : states.playType;
	const setFilter = type === "Set" ? selected : states.setName;
	const posFilter = type === "Pos" ? selected : states.position;
	let ccFilter = type === "CC" ? selected : states.circulation;
	let leFilter = selected === "35000LE" ? true : states.retired;
	if (ccFilter === "35000LE") ccFilter = "35000";
	if (type === "CC" && selected !== "35000LE") leFilter = false;

	// Initialize filters object
	const filters = {
		series: seriesFilter,
		playCategory: playFilter,
		position: posFilter,
		setName: setFilter,
		totalMinted: ccFilter,
		retired: leFilter,
	};

	// Count filter options that are not empty
	let filterKeys = 0;
	for (const key in filters) if (filters[key]) filterKeys++;
	// console.log("series:", seriesFilter);
	// console.log("totalMinted:", ccFilter);
	// console.log("play:", playFilter);
	// console.log("position:", posFilter);
	// console.log("retired:", leFilter);
	// console.log("setName:", setFilter);

	// Empty array
	const result = [];

	// Loop over each data record
	states.data.forEach((record) => {
		// Initiallize filterCount as set to avoid duplicate value
		let filterCount = new Set();

		// Loop over each key of filters
		Object.keys(filters).forEach((key) => {
			// If record[key] match filters[key], adds key to filterCount
			if (record[key] && record[key] === filters[key]) {
				filterCount.add(key);
			}
		});

		// After finished looping each key of filters, if the filterCount size matched filterKeys
		// Then append the record to result
		if (filterCount.size === filterKeys) {
			result.push(record);
		}
	});
	return result;
};
