import { expect, test } from "@playwright/test";
import config from "../config";

test("random numbers generation and sum", async ({ page }) => {
  test.setTimeout(1200000);
  const mathNumbers: number[] = [];
  const cryptoNumbers: number[] = [];

  // Initialize histograms (10 buckets for 1-10, 11-20, ..., 91-100)
  const mathHistogram = new Array(10).fill(0);
  const cryptoHistogram = new Array(10).fill(0);

  const NUMBER_OF_RUNS = config.NUMBER_OF_RUNS;

  // Run multiple times to collect numbers
  for (let i = 0; i < NUMBER_OF_RUNS; i++) {
    test.setTimeout(12000000);
    // Load the page fresh each time to get new random numbers
    await page.goto("http://localhost:8754/home.html");

    // Get the text content of both elements
    const mathText = await page.locator("#randomNumber").textContent();
    const cryptoText = await page.locator("#cryptoNumber").textContent();

    // Extract the numbers from the text
    const mathNum = parseInt(mathText!.replace("math:", ""));
    const cryptoNum = parseInt(cryptoText!.replace("crypto:", ""));

    // Store the numbers
    mathNumbers.push(mathNum);
    cryptoNumbers.push(cryptoNum);
  }

  // Build histograms
  mathNumbers.forEach((num) => {
    const bucket = Math.ceil(num / 10) - 1; // Convert number to bucket index (0-9)
    mathHistogram[bucket]++;
  });

  cryptoNumbers.forEach((num) => {
    const bucket = Math.ceil(num / 10) - 1;
    cryptoHistogram[bucket]++;
  });

  // Log histograms
  console.log("\nMath.random Distribution:");
  mathHistogram.forEach((count, i) => {
    const range = `${i * 10 + 1}-${(i + 1) * 10}`;
    const bars = "#".repeat(Math.round(((count * 2) / NUMBER_OF_RUNS) * 50)); // Scale to max 50 characters
    console.log(`${range.padEnd(8)}: ${bars} (${count})`);
  });

  console.log("\nCrypto Distribution:");
  cryptoHistogram.forEach((count, i) => {
    const range = `${i * 10 + 1}-${(i + 1) * 10}`;
    const bars = "#".repeat(Math.round(((count * 2) / NUMBER_OF_RUNS) * 50)); // Scale to max 50 characters
    console.log(`${range.padEnd(8)}: ${bars} (${count})`);
  });

  // Calculate sums
  const mathSum = mathNumbers.reduce((a, b) => a + b, 0);
  const cryptoSum = cryptoNumbers.reduce((a, b) => a + b, 0);

  // Log results
  console.log(`Runs: ${NUMBER_OF_RUNS}`);
  console.log(`Browser: ${page.context().browser()?.browserType().name()}`);
  console.log("Math.random sum:", mathSum);
  console.log("Crypto sum:", cryptoSum);

  // Calculate and log averages
  const mathAverage = mathSum / NUMBER_OF_RUNS;
  const cryptoAverage = cryptoSum / NUMBER_OF_RUNS;
  console.log(
    "Math.random average:",
    mathAverage,
    " (should be 50.5 diff(",
    (mathAverage - 50.5).toFixed(2),
    ")"
  );
  console.log(
    "Crypto average:",
    cryptoAverage,
    " (should be 50.5 diff(",
    (cryptoAverage - 50.5).toFixed(2),
    ")"
  );

  // Basic validation
  mathNumbers.forEach((num) => {
    expect(num).toBeGreaterThan(0);
    expect(num).toBeLessThanOrEqual(100);
  });

  cryptoNumbers.forEach((num) => {
    expect(num).toBeGreaterThan(0);
    expect(num).toBeLessThanOrEqual(100);
  });
});
