
const { createLock } = require("../service/lock");

const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

let activeCallbacks = 0;
let maxConcurrentCallbacks = 0;

const runTest = async () => {
    console.log("Starting concurrency test...");

    const requests = Array.from({ length: 20 }, (_, i) => {
        return createLock("auction-1", async () => {
            activeCallbacks++;

            maxConcurrentCallbacks = Math.max(
                maxConcurrentCallbacks,
                activeCallbacks
            );

            console.log(`Request ${i + 1} acquired lock`);

            await sleep(500);

            console.log(`Request ${i + 1} released callback`);

            activeCallbacks--;
        });
    });

    const results = await Promise.allSettled(requests);

    console.log("\n------ TEST RESULTS ------");

    console.log("Total requests:", requests.length);
    console.log("Maximum concurrent callbacks:", maxConcurrentCallbacks);

    console.log(
        "Successful:",
        results.filter(r => r.status === "fulfilled").length
    );

    console.log(
        "Failed:",
        results.filter(r => r.status === "rejected").length
    );
};

module.exports={
    testLock:runTest
}
