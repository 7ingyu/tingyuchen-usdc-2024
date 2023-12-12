# US Digital Corps 2024 <br> Project-Based Assessment - Software Engineering

## Process & Decision Making
I started with reading the assignment and taking notes on key goals:

Task: implement a case-sensitive word search feature, with the following considerations:
- Searches for a single word
- Needs to account for hyphenated words
- Word search can return empty output
- Search result output must always contain search term input

After taking a look at the desired input and output, I walked through the provided code and unit tests to see if they provided any additional insight into any requirements. No additional requirements were detailed, so I moved on to coding, considering edge cases that weren’t previously addressed, and recording my thoughts as I worked. Often I would happen upon edge cases as I wrote code or as I wrote out my reasoning. Some of the edge cases I came across included:
- Multi-word search term input
- Full word search vs partial word search (ie. “her” matching searches for “he”
- Empty or incorrectly shaped input for the scanned object
- How to handle searching words across lines (i.e. searching for “darkness” which has been cut across two lines in the example input, becoming “dark-” and “ness”

I decided to handle multi-word search as finding a line with all the included words, though not necessarily right next to each other. A user may not always search for text exactly as it’s written in the document, and I felt some additional leeway would prove very effective for the user experience. I considered only accounting for the first word input, but felt that my final solution provided a better user experience, and could be very easily adjusted to just considering first word input if requested. 

I eventually decided against partial matches and that “her” should not be a match for a search for “he” for two reasons: 
The prompt said “searches for a word”, not “part of a word”
 Searching for “tea” could end up matching “steak” which are two very different words. 

For incorrect input, I decided to simply have the code error out with a short message, “Invalid searchTerm” or “Invalid scannedTextObj“, describing whether the search term input or the scanned object input was invalid. For simplicity, if both are invalid, the code errors out upon recognizing incorrect search term input and does not bother checking if the scanned object input is also invalid until search term input is correct.

Finally, I decided that given the time restraints, searching for words across lines or even pages would be best approached as a stretch goal for the future. As of the current build, hyphenated words are not searchable due to the format of the search result object being per-line. The word “darkness” exists on line 8 and line 9 put together in the example object. If the code were to account for multi-line searches, strings of text broken up across separate lines would need to be manually joined in the code, and lines would need to be checked to ensure they were input in the correct order to ensure correct join order. Pages would also need to be considered as a sentence could start on one page and end on another.

## Testing and Iteration
I usually write tests using Jest and Mocha, but this project does not allow external modules, so I wrote a very small test() function to emulate the Jest format. The test() function takes in a string of text and a function that returns true for a pass, and false for a fail. Since the function takes in a string, I could start considering what tests I wanted or needed from a non-programming perspective, and just write what I expect my code to do in plain English. I could also use that string to better log what tests were passing or failing. From there, I designed conditionals that would prove any functionality I or the client desired.

For each requirement, I wrote a test to prove it was working. I would then try out the test by making it both succeed and fail to make sure it wasn’t providing false positives. For example, I had the test for multiple search results check that there were multiple items in the results array, but I also attempted it with input that would definitely only return a single or no input to make sure it forced test failure. If it returned as a success, I would know my test was not working correctly.

Given more time, I would want to put together a much larger set of sample data to pull from, preferably from a variety of real books from different genres. For example, I am interested in how books with pictures might be “scanned.” With better sample data, my tests could be more comprehensive. I could identify more edge cases to account for. 

I’m currently proudest of how I accounted for the multi-word search input edge case. I included functionality where “[a] multi-word search term should only return lines with all included words.” For the test search input, I took a sentence I expected in the scannedTextObj and removed a couple words from it including from the middle of the sentence. I then checked the length of the results array with the number of matching lines I expected for the test conditional.

More so than accounting for multi-word searches, the most difficult solution was figuring out how to check for full words without letting punctuation get in the way. I decided to strip lines of punctuation before checking for words. With more time and/or information regarding the project, I would look up the ways different punctuation characters are used in text and potentially account for each specifically. For example, with more modern stories, maybe the author includes fictional emails with fictional email addresses. Currently I just remove all periods and ‘@’ symbols which would turn an email such as “swe.tingyu@gmail.com” into a single word, “swetingyugmailcom.” I’m also aware that the regular expression I’m using to strip punctuation from strings does not remove underscores, and I would like to discuss whether or not there are any edge cases that would impact. 

In fact, there are several points I would like to discuss given more time and better access to the client/whoever is requesting this code: 
- Who is our expected demographic of users for this function?
- Why and in what context would they be using this code?
- Would we want to include functionality for searching for not just a traditional word, but also ‘words’ with special characters in them? 
- What sorts of expected inputs might there be? Would it just be classical fiction like the sample input? Writing styles have changed considerably over time and the code may need to account for that.
- How fuzzy would we want searches to be? If this was a medical setting, we might want to include the ability to search for drug names and allow for some spelling errors as drug names can be very difficult to get right especially in high-stress situations.
- Should we be accounting for multiple languages?
- Are there any potential future iterations planned for this function and should we be leaving room in the code for scaling in any areas?

Thank you for looking over my application and reviewing my work. I look forward to the opportunity to speak with you in the future and hope to contribute with my skills as a public servant soon. 
