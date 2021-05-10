const fcl = require("@onflow/fcl");
const fs = require("fs");
const { config } = require("@onflow/config");
const dir = "blockchainData";
const firstSet = 1;
const latestSet = 38;
let completed = 0;

config().put("accessNode.api", "https://access-mainnet-beta.onflow.org");
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

console.log("--------Connecting Flow Mainnet--------");

async function getTopshotSet(SetID) {
    const resp = await fcl.send([
        fcl.script`
      import TopShot from 0x0b2a3299cc857e29
      pub struct Edition {
        pub let playID: UInt32
        pub let retired: Bool
        pub let momentCount: UInt32
        pub let playOrder: UInt32
        init(playID: UInt32, retired: Bool, momentCount: UInt32, playOrder: UInt32) {
          self.playID = playID
          self.retired = retired
          self.momentCount = momentCount
          self.playOrder = playOrder
        }
      }
      pub struct Set {
        pub let id: UInt32
        pub let setName: String
        pub let playIDs: [UInt32]
        pub let editions: [Edition]
        pub let locked: Bool
        pub let series: UInt32
        init(id: UInt32, setName: String) {
          self.id = id
          self.setName = setName
          self.playIDs = TopShot.getPlaysInSet(setID: id)!
          self.locked = TopShot.isSetLocked(setID: id)!
          self.series = TopShot.getSetSeries(setID: id)!
          var editions: [Edition] = []
          var playOrder = UInt32(1)
          for playID in self.playIDs {
            var retired = false
            retired = TopShot.isEditionRetired(setID: id, playID: playID)!
            var momentCount = UInt32(0)
            momentCount = TopShot.getNumMomentsInEdition(setID: id, playID: playID)!
            editions.append(Edition(playID: playID, retired: retired, momentCount: momentCount, playOrder: playOrder))
            playOrder = playOrder + UInt32(1)
          }
          self.editions = editions
        }
      }
      pub struct TopshotSet {
        pub let set: Set
        pub let plays: [TopShot.Play]

        init() {
            var setName = TopShot.getSetName(setID: ${SetID})
            self.set = Set(id: ${SetID}, setName: setName!)
            self.plays = TopShot.getAllPlays()
          }
      }
      pub fun main(): TopshotSet {
        return TopshotSet()
      } `,
    ]);
    return fcl.decode(resp);
}

for (let setID = firstSet; setID <= latestSet; setID++) {
    getTopshotSet(setID).then((res) => {
        completed++;
        if (completed === firstSet) {
            console.log("Flow Mainnet Connected.");
            console.log();
        }
        console.log(`Fetching: ${res.set.setName} S${res.set.series}...`);
        const data = res.set.editions?.map((edition) => {
            const Play = res.plays.filter((play) => {
                return play.playID === edition.playID;
            });
            const play = Play[0];
            return {
                setName: res.set.setName,
                playID: play.playID,
                retired: edition.retired,
                fullName: play.metadata.FullName,
                totalMinted: edition.momentCount,
            };
        });
        fs.writeFileSync(
            dir +
                "/" +
                res.set.setName +
                " S" +
                res.set.series.toString() +
                ".json",
            JSON.stringify(data, null, "\t")
        );
        console.log("Done ʕ•ᴥ•ʔ");
        if (completed === latestSet) {
            console.log(
                `--------Finished Fetching ${completed} Sets Data--------`
            );
            console.log();
        }
    });
}
