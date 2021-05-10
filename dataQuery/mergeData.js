const glob = require("glob");
const fs = require("fs");

const rawDatas = fs.readFileSync("./data.json", "utf8");

let datas = JSON.parse(rawDatas);

console.log("--------Merge Data--------");
console.log("Merging...");

glob("blockchainData/**/*.json", (er, files) => {
    if (er) return `Error! ${err}`;
    files.forEach((file) => {
        const blocks = require("./" + file);

        blocks.forEach((block) => {
            datas.forEach((data) => {
                if (
                    data.flowID === block.playID.toString() &&
                    data.setName === block.setName
                ) {
                    data.retired = block.retired;
                    data.totalMinted = block.totalMinted.toString();
                }
            });
        });
    });
    datas.forEach((data) => {
        if (
            data.setName === "Base Set" ||
            data.setName === "Metallic Gold LE" ||
            data.setName === "Throwdowns"
        ) {
            data.setName += " " + data.series;
        }
    });
    fs.writeFileSync("./data.json", JSON.stringify(datas));
    fs.writeFileSync("./readableData.json", JSON.stringify(datas, null, 4));
});
console.log("--------Merge Completed--------");
console.log();
