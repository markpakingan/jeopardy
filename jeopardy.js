let sixRandomCategories = [];
let allCategoryIDs = [];
let sixIDs = [];
let $table = $("#jeopardy");
let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const response = await axios.get(
        "http://jservice.io/api/categories?count=100"
    );

    let allCategoryIds = response.data.map(function (value) {
        return value.id;
    });

    for (let id of allCategoryIds) {
        allCategoryIDs.push(id);
    }

    // Get 6 Random Categories with Titles

    let randomSix = _.shuffle(allCategoryIDs).slice(0, 6);
    console.log("Random 6:", randomSix);

    for (let id of randomSix) {
        const response = await axios.get(
            `http://jservice.io/api/category?id=${id}`
        );

        let singleCategoryDataTitle = await response.data;
        console.log(singleCategoryDataTitle.title);
        sixRandomCategories.push(singleCategoryDataTitle.title);
        sixIDs.push(singleCategoryDataTitle.id);
    }

    createHeader();
    getCategory();
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory() {
    for (let id of sixIDs) {
        const response = await axios.get(
            `http://jservice.io/api/category?id=${id}`
        );

        categories.push({
            title: [response.data.title],
            clues: [response.data.clues],
        });
    }
    generateTable();
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

function generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = document.querySelector("#jeopardy");
    const tblBody = document.querySelector("#tbody");

    // creating all cells
    for (let i = 0; i < 5; i++) {
        // creates a table row
        const row = document.createElement("tr");

        // creates a column with names
        for (let j = 0; j < 6; j++) {
            let question = `Question: ${categories[j].clues[0][i].question}`;
            // let answer = `Answer: ${categories[j].clues[0][i].answer}`;
            let cell = document.createElement("td");
            cell.innerText = question;

            cell.setAttribute("id", `${j} - ${i}`);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
}

// function replaceText() {
//     let cell = document.getElementById(clickedID);
//     cell.innerHTML = "testing";
//   }

//   document.getElementById(clickedID).addEventListener("click", replaceText);

// Get the classID when clicked
document.addEventListener("click", (e) => {
    // Get element class(es)
    let clickedID = e.target.id;
    // If element has class(es)
    if (clickedID !== "") {
        console.log(clickedID);
        let cell = document.getElementById(clickedID);
        let answer = `Answer: ${categories[j].clues[0][i].answer}`;

        //   console.log(cell)
        cell.innerText = "This will show the answer";
    }
    // If element has no classes
    else {
        console.log("An element without an ID was clicked");
    }
});

function createHeader() {
    let header = document.querySelector("#thead");
    let row = document.createElement("tr");

    for (let j = 0; j < 6; j++) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(`${sixRandomCategories[j]}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    header.appendChild(row);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#start").remove();

    getCategoryIds();
    // generateTable()
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

$("#spin-container").remove();

function setupAndStart() {}

const btn = document.querySelector("#start");
btn.addEventListener("click", hideLoadingView);

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
