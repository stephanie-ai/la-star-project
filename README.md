# LaStar

![](client/laStarDemo.gif)

This project aims to create a journaling site where users can post their thoughts anonymously.

### How to use our blogging site

1. `git clone` the repo
2. Run `cd server` to go into the server folder
3. Run `npm install` to install all necessary dependencies
4. Run `npm start` to start the server
5. Run `cd ../client` to come our of server folder and go into client and run `open index.html` to see our site!

### Technologies used

- Server side: Javascript, NodeJS,
  - Dependecies include: Express, body-parser, CORS, fs
- Client side: Figma, Javascript, HTML, CSS
- Test suite: Mocha, Chai, SuperTest, NYC

### Process

1. Did some market research on layout and styling of other popular social media websites
2. Started by mapping out layout of site using Figma
3. Researched how to implement any required technologies for the project that we were unfamiliar with
4. Wrote some pseudo code to break down what was needed server side
5. Implemented features and functionalities
6. Test all features and functionalities and debug any issues
7. Implement styling to improve user experience

### Licence

## Wins & Challenges

### Wins

- Client side sucessfully sends data to server and can be accessed
- Server side can recieve and send data back to client
- JSON file is external
- Use external GIPHY API to search and retrieve gifs
- Add animations to background

### Challenges

- Server can manipulate received data, for example adding a new unique id for each post as well as append like/dislike/love reaction count

## Bugs

- Some CSS styling issues when switch from dark mode to light mode

## Future Features

- Make reaction count visible to users
- Allow users to choose GIF from a grid of currently trending GIFs with a specified number of responses (e.g. 3x3 grid displaying 9 GIFs)
- Append GIFs to server
- Give replies the same functionality as posts e.g. give replies reaction functionality
