/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  if (typeof searchTerm !== 'string') throw "Invalid searchTerm";

  const result = {
    "SearchTerm": searchTerm,
    "Results": []
  };

  // Iterate thru books
  try {
    scannedTextObj.forEach(({ ISBN, Content }) => {
      // Iterate thru Content for each book
      Content.forEach(({ Page, Line, Text }) => {
        // Pull out individual words, remove punctuation, and remove blank entries
        const words = Text
          .split(' ')
          .map(word => word.replace(/^\W+|\W+$/g, ''))
          .filter(w => w.length);

        // Get individual words in search query
        const to_find = searchTerm
          .split(' ')
          .filter(w => w.length);

        let found = true;

        // Iterate through search terms
        for (const term of to_find) {
          // If searchTerm isn't found,
          // set flag to false as not every term found
          if (!words.includes(term)) found = false;
        }

        // Add data to Results array
        // if every search term found
        if (found) result["Results"].push({
          ISBN, Page, Line
        });
      });
    });
  } catch (e) {
    throw "Invalid scannedTextObj";
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
      "Title": "Twenty Thousand Leagues Under the Sea",
      "ISBN": "9780000528531",
      "Content": [
          {
              "Page": 31,
              "Line": 8,
              "Text": "now simply went on by her own momentum.  The dark-"
          },
          {
              "Page": 31,
              "Line": 9,
              "Text": "ness was then profound; and however good the Canadian\'s"
          },
          {
              "Page": 31,
              "Line": 10,
              "Text": "eyes were, I asked myself how he had managed to see, and"
          }
      ]
  }
];

/** Example output object */
const twentyLeaguesOut = {
  "SearchTerm": "the",
  "Results": [
      {
          "ISBN": "9780000528531",
          "Page": 31,
          "Line": 9
      }
  ]
};

/*
_   _ _   _ ___ _____   _____ _____ ____ _____ ____
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___|
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
\___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/

*/

/* We have provided two unit tests. They're really just `if` statements that
* output to the console. We've provided two tests as examples, and
* they should pass with a correct implementation of `findSearchTermInBooks`.
*
* Please add your unit tests below.
* */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

const testInput = [
  {
      "Title": "Test",
      "ISBN": "1111111111111",
      "Content": [
          {
              "Page": 1,
              "Line": 1,
              "Text": "the quick brown fox jumped over the lazy dog."
          },
          {
              "Page": 1,
              "Line": 2,
              "Text": "THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG."
          },
          {
              "Page": 1,
              "Line": 3,
              "Text": "The quick brown fox jumped over the lazy dog."
          },
          {
              "Page": 1,
              "Line": 4,
              "Text": "The Quick Brown Fox Jumped Over the Lazy Dog."
          }
      ]
  }
];

const test = (str, func) => {
  // console.log(str)
  if (func()) {
    console.log('PASS:', str);
  } else {
    console.log('FAIL:', str);
  }
};

const checkComparisons = (comparisons) => {
  return comparisons.every(([ a, b ]) => {
    if (a !== b) console.log(`Expected ${a} to equal ${b}`);
    return a === b;
  });
};

test('Should be able to return multiple results', () => {
  const searchTerm = "and";
  const result = findSearchTermInBooks(searchTerm, twentyLeaguesIn);
  const pass = result.Results.length === 2;
  if (!pass) console.log(`Expected ${JSON.stringify(result.Results)}'s length to equal 2; got ${result.Results.length}.`);
  return pass;
});

test('Should not return partial matches', () => {
  const searchTerm = "he";
  const result = findSearchTermInBooks(searchTerm, twentyLeaguesIn);
  const pass = result.Results.length === 1;
  if (!pass) console.log(`Expected ${JSON.stringify(result.Results)}'s length to equal 1; got ${result.Results.length}.`);
  return pass;
});

test('A multi-word search term should only return lines with all included words', () => {
  const searchTerm = "quick fox jumped over dog";
  const result = findSearchTermInBooks(searchTerm, testInput.concat(twentyLeaguesIn));
  const comparisons = [[result.Results.length, 2]];
  return checkComparisons(comparisons);
});

test('Searches should ignore punctuation', () => {
  const searchTerm = "dark";
  const result = findSearchTermInBooks(searchTerm, twentyLeaguesIn);
  const comparisons = [[result.Results.length, 1]];
  return checkComparisons(comparisons);
});

test('Should return object with SearchTerm string and empty Results array if no matches', () => {
  const searchTerm = "octopus";
  const result = findSearchTermInBooks(searchTerm, testInput.concat(twentyLeaguesIn));
  const comparisons = [[result.Results.length, 0], [result.SearchTerm, searchTerm]];
  return checkComparisons(comparisons);
});

test('Searches should be case-sensitive', () => {
  const result = findSearchTermInBooks("THE", testInput.concat(twentyLeaguesIn));
  const comparisons = [[result.Results.length, 1], [result.Results[0].Line, 2]];
  return checkComparisons(comparisons);
});

test('Invalid search input should throw an error', () => {
  try {
    findSearchTermInBooks([], testInput.concat(twentyLeaguesIn));
    return false;
  } catch (err) {
    return true;
  }
});

test('Invalid book data input should throw an error', () => {
  try {
    findSearchTermInBooks("hello", [{book: "Catch-22", isbn: "1234567890"}]);
    return false;
  } catch (err) {
    return true;
  }
});

test('Should handle searching an empty array of books with empty results', () => {
  const searchTerm = "the";
  const res = findSearchTermInBooks(searchTerm, []);
  const expected = {
    "SearchTerm": "the",
    "Results": []
  };
  const comparisons = [[JSON.stringify(res), JSON.stringify(expected)]];
  return checkComparisons(comparisons);
});