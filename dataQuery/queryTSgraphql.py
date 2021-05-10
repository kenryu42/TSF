import os
import json
import pathlib
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="https://public-api.nbatopshot.com/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

# Set the directory name
DIR = "graphqlData"

# Set Query counter
count = 0

# set ids
setsId_s1 = [
    "28eddc41-6a11-4ff8-8ec6-15041aa01e80",    
    "c561f66b-5bd8-451c-8686-156073c3fb69",
    "a3a4f935-4d05-4166-b8c4-ce8e52eb3ca3",
    "7b797690-5b53-45a7-b972-bd2d5152654a",
    "12a8288a-addc-4e5c-8af7-b3ba6e5161d4",
    "a494c64e-9e93-418c-8934-f331ee47a39b",
    "feead270-621c-4cde-baac-2f6834e9e594",
    "d2378dc1-1168-410b-893d-e084170a402e",
    "a156f083-e902-49d3-a113-bd61702c336a",
    "d4712d31-9030-40de-b1a6-1fb9964348f3",
    "5f85e04f-798f-434c-89d4-2b0a575bd652",
    "252e83ac-b3a4-407e-82d2-138beb60b5b9",
    "9c8202c7-698b-4f44-b029-b70ddc49e9dc",
    "dd7c595c-5a1b-4f43-8493-db0a2bbcc5aa",
    "3a0ae6ce-f22e-4d98-b1fe-906f859df983",
    "4e166b27-3099-44c3-9de3-cac2b9751692",
    "18b2d80e-d38d-4678-9b7f-c2bfb223259e",
    "2dbc545a-25a5-4208-8e89-bbb6c3e3a364",
    "2ab08547-9f62-4ff4-aff9-1bdc0de8fa3e",
    "320cae53-d585-4e74-8a66-404fa3543c19",
    "814c5183-596f-41d7-9135-c6b29faa9c6d",
    "b73fe6f1-ae28-468b-a4b3-4adb68e7d6bc",
    "827f9328-03aa-4cb5-97cd-7b5f2c2386fd"
]

setsId_s2 = [
    "757f23fd-f7ae-465c-a006-f09dcfd5dbd5",
    "496d52b8-8d6c-4071-8672-d18551f86a3e",
    "208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9",
    "122b048d-585e-4c63-8275-c23949576fd6",
    "708a6f60-5c93-406e-854f-50dd6734c0dd",
    "f493db4a-a775-4d6e-be8a-56fae509a92d",
    "0a528e81-5bb0-4bf8-a7f9-6dbd183528ce",
    "737f9997-8817-4a74-9c13-88b99c37d118",
    "b2605806-0d47-439f-ba72-784897470bb0",
    "33a4a3a3-a32c-4925-a4e8-7d24e56b105e",
    "54bc2e0d-91e9-4f4c-9361-a8d7eeefe91e",
    "ad8e85a4-2240-4604-95f6-be826966d988"
]

setsIdList = [setsId_s1, setsId_s2]

# Make a directory if not exist
pathlib.Path(DIR).mkdir(parents=True, exist_ok=True)

print("--------Query Topshot GraphQL Endpoint--------")

# Provide a GraphQL query
for setsId in setsIdList:
    for setId in setsId:
        count += 1
        query = gql(
            """
        {
            getSet (input: {setID: "%s"}) {
                set {
                    id
                    flowId
                    flowName
                    flowSeriesNumber
                    plays {
                        id
                        description
                        flowID
                        stats {
                            playerName
                            playCategory
                            primaryPosition
                        }
                    }
                }
            }
        }
        """ % setId
        )
        # Execute the query on the transport
        result = client.execute(query)

        # Configure json filename and save path
        setName = result["getSet"]["set"]["flowName"]
        setSeries = result["getSet"]["set"]["flowSeriesNumber"]
        setName += " S" + str(setSeries) + ".json"
        path = os.path.join(DIR, setName)

        # Write files to save path
        with open(path, 'w') as outfile:
            json.dump(result, outfile, indent=4)
            print(f"Finished writing file: {setName}")

print()
print(f"Total query: {count}")
print("--------Querying COMPLETED.--------")
print()
