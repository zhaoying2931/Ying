# Portfolio Boilerplate

This is a portfolio boilerplate for 1st and 2nd year of students at UC Berkeley Graduate School of Journalism. To use this repo, please make sure: 

1. You have node v11 installed: https://nodejs.org/en/blog/release/v11.10.1/ 
2. Once you have node install, in Terminal, run `node --version` to make sure you have the right version, something like `v11.TK.TK`. 

**1. To run the project locally:**
1. Clone this repo by running `git clone https://github.com/jieqianzhang/portfolio_boilerplate.git`
2. Once you have the repo cloned, in Terminal, go to the folder by running `cd portfolio_boilerplate`
3. Run `npm install` to install all the dependencies listed in the package.json
4. Run `npm run start`, to start a local server
5. Run `gulp` to automatically generate the pages and watch changes as you develop the pages

**2. To customize the portfolio main page:**
- Modify the `src/index.hbs` and the `src/index-partials/project.hbs` files
- Modify the font style, font size, font color etc, go to change the `src/sass/main.scss`

**3. To customize the child page:**
- Modify the `src/page.hbs` and the `src/index-partials/project.hbs` files
- Modify the font style, font size, font color etc, go to change the `src/sass/main.scss`