// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]


let sixRandomCategories = [];
let allCategoryIDs = [];

let $table = $('#jeopardy')



/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {

    const response = await axios.get(`http://jservice.io/api/categories?count=100`)



    let allCategoryIds = response.data.map(function (value) {
        return value.id;
    });

    for (let id of allCategoryIds) {
        allCategoryIDs.push(id)
    }

    //generate 6 random numbers
    let shuffled = [...allCategoryIDs].sort(() => 0.5 - Math.random());
    console.log('6 RANDOM NUMBERS', shuffled.slice(0, 6));

    return sixRandomCategories.push(shuffled.slice(0, 6));


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

async function getCategory(id) {

    const response = await axios.get(`http://jservice.io/api/category?id=${id}`);

    categories.push({
        title: response.data.title,
        clues: [response.data.clues]
    })
    console.log(categories);
}



/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */



async function fillTable() {

    const $table = $('#jeopardy')
    const $tbody = $('#tbody');

    const $thead = $('#thead')

    const width = 6;
    const height = 6;



    // Create HTMLtable
    // for (let i = 0; i < height; i++) {
    //     let row = [];
    //     for (let j = 0; j < width; j++) {
    //         row.push(null)
    //     }
    //     $table.push(row)
    // }


    // console.log("sample table", $table);



    // return $table;


}


function generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = document.querySelector("#jeopardy");
    const tblBody = document.querySelector("#tbody");


    // creating all cells
    for (let i = 0; i < 10; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < 6; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
            cell.appendChild(cellText);
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



function createHeader() {

    let table = document.querySelector('#jeopardy');
    let header = table.createTHead();


    let row = header.insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML = "this is a table header";



    let row2 = header.insertRow(1);
    let cell2 = row.insertCell(1);
    cell2.innerHTML = "this is a table header";

    let row3 = header.insertRow(2);
    let cell3 = row.insertCell(2);
    cell3.innerHTML = "this is a table header";

    let row4 = header.insertRow(3);
    let cell4 = row.insertCell(3);
    cell4.innerHTML = "this is a table header";

    let row5 = header.insertRow(4);
    let cell5 = row.insertCell(4);
    cell5.innerHTML = "this is a table header";

    let row6 = header.insertRow(5);
    let cell6 = row.insertCell(5);
    cell6.innerHTML = "this is a table header";

}


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */


function handleClick(evt) {
}


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}


/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $('#spin-container').remove();
    $('#start').remove();
}


/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

const btn = document.querySelector('#start');

btn.addEventListener('click', generateTable);
btn.addEventListener('click', hideLoadingView);
btn.addEventListener('click', getCategoryIds);
btn.addEventListener('click', createHeader);
$('#spin-container').remove();


async function setupAndStart() {



}



/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO


