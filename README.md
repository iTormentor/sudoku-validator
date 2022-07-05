# Sudoku Validator

A multi-threaded sudoku validator built for the Operating Systems with System Programming (IDATA2305) course.

This is a mandatory project, but it does not count towards the final grade in the subject.

[![Yarn build](https://github.com/Marko19907/sudoku-validator/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/Marko19907/sudoku-validator/actions/workflows/main.yml)

## Task requirements
* [x] Design a multi-threaded application that determines whether the solution to a sudoku puzzle is valid.
* [x] The application verifies a sudoku puzzle from CSV files given by the professor, provided in the ['testCSVs' folder](/testCSVs).
* [x] Fulfill the following criteria:
  * [x] Check that each column contains the digits 1 through 9.
  * [x] Check that each row contains the digits 1 through 9.
  * [x] Check that each of the 3 × 3 sub-grids contains the digits 1 through 9.

## Usage methods

#### Deployment [Recommended]

1. Head to [https://marko19907.github.io/sudoku-validator/](https://marko19907.github.io/sudoku-validator/)
   to see the project in operation. <br>
   This is the preferred method.

### Other usage methods

#### Via craco & yarn

1. Make sure you have installed Node.js on the system.
2. Download and the extract zip-file **or** clone project to the desired location.
3. Run the command `yarn install` in the project root.
4. After all the dependencies of project of the project are installed, run the command `craco start` in the project root.
5. The app should then be available at [http://localhost:3000](http://localhost:3000)
