const glob = require("glob");
const fs = require("fs");
const records = [];

console.log("--------Forming Data--------");
console.log("Forming...");
console.log();

glob("graphqlData/**/*.json", (er, files) => {
    if (er) return `Error! ${err}`;
    files.forEach((file) => {
        const graphQLData = require("./" + file);
        graphQLData.getSet.set.plays.map((play) => {
            records.push({
                flowID: play.flowID,
                setName: graphQLData.getSet.set.flowName,
                series: "S" + graphQLData.getSet.set.flowSeriesNumber,
                playerName: play.stats.playerName,
                playCategory: play.stats.playCategory,
                position: play.stats.primaryPosition,
                description: play.description,
                link:
                    "https://nbatopshot.com/listings/p2p/" +
                    graphQLData.getSet.set.id +
                    "+" +
                    play.id,
            });
        });
    });
    fs.writeFileSync("./data.json", JSON.stringify(records));
    console.log("Total unique moment by tier: ", records.length);
    console.log("--------Data Forming Completed--------");
    console.log();
});
