# Random vs Crypto Random Number Generation Analysis

This project compares the randomness quality between JavaScript's `Math.random()` and the Web Crypto API's `crypto.getRandomValues()` across different browsers.

## Table of Contents 🗂️

- [What is Tested and Why](#what-is-tested-and-why) 🔍
- [Prerequisites](#prerequisites) ⚙️
- [Installation](#installation) 💿
- [Usage](#usage) 🚀
- [Configuration](#configuration) ⚡
- [Results](#results) 📊
- [Conclusion](#conclusion) 🎯
- [Acknowledgments](#acknowledgments) 🙏

## What is Tested and Why

The test compares two different random number generation methods:

1. `Math.random()`: JavaScript's built-in pseudo-random number generator
2. `crypto.getRandomValues()`: Cryptographically secure random number generator

We analyze:

- Distribution of numbers across 10 ranges (1-10, 11-20, etc.)
- Average values (should be close to 50.5 for perfect distribution)
- Differences between browsers (Chrome, Firefox, Safari)
- Consistency across 1000 iterations

This comparison is valuable for:

- Understanding the quality of randomness in different implementations
- Deciding which method to use for different use cases
- Identifying potential browser-specific biases

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Supported browsers will be installed automatically by Playwright

## Installation

1. Install project dependencies using `npm install`

## Usage

2. Run the tests:

   ```bash
   npm start
   ```

3. View test results:

   - Check the console output for distribution analysis
   - Results include:
     - Number distribution histograms
     - Average values comparison
     - Browser-specific variations
     - Statistical analysis

4. Test across different browsers:
   - Tests automatically run on Chrome, Firefox, and Safari

## Configuration

Adjust test parameters in `config.js`:

- Sample size (default: 1000)

## Results

### Sample Output

You can find a block result like this for each browser in the console.

```
Math.random Distribution:
1-10    : ######### (93)
11-20   : ########## (101)
21-30   : ########## (98)
31-40   : ############ (115)
41-50   : ########### (110)
51-60   : ######### (89)
61-70   : ########### (106)
71-80   : ########## (98)
81-90   : ######### (90)
91-100  : ########## (100)

Crypto Distribution:
1-10    : ########### (107)
11-20   : ########## (101)
21-30   : ########## (97)
31-40   : ########## (95)
41-50   : ########## (95)
51-60   : ########### (105)
61-70   : ########## (102)
71-80   : ########### (105)
81-90   : ######### (88)
91-100  : ########### (105)
Runs: 1000
Browser: firefox
Math.random sum: 50127
Crypto sum: 50333
Math.random average: 50.127  (should be 50.5 diff( -0.37 )
Crypto average: 50.333  (should be 50.5 diff( -0.17 )
```

## Conclusion

While there are small variations between browsers and methods, both Math.random and Crypto demonstrate acceptably random distributions. The differences in averages are relatively small, suggesting that either method would be suitable for general-purpose random number generation. Chrome appears to have the most accurate implementation overall.

The variations between browsers are interesting but not significant enough to warrant choosing one method over the other based on the browser being used.

## Acknowledgments

- Playwright team for browser automation
