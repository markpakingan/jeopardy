let allCategoryDatas = [];
let categories = [];

const randomSelection = (array, count) => {
    let selected = [];
    let copy = array.slice(); // create a copy of the original array to avoid modifying it
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * copy.length);
        let randomItem = copy.splice(randomIndex, 1)[0];
        selected.push(randomItem);
    }
    return selected;
};

async function getCategoryById(id) {
    const categoryObj = {};

    const response = (
        await axios.get(`http://jservice.io/api/category?id=${id}`)
    ).data;

    categoryObj.id = response.id;
    categoryObj.title = response.title;
    categoryObj.clues = [];

    const clues = randomSelection(response.clues, 5);

    for (let i = 0; i < clues.length; i++) {
        const clue = clues[i];
        categoryObj.clues.push({
            id: clue.id,
            question: clue.question,
            answer: clue.answer,
        });
    }
    return categoryObj;
}

async function getCategory() {
    const response = (
        await axios.get("http://jservice.io/api/categories?count=100")
    ).data;

    const randomSix = randomSelection(response, 6);

    for (let i = 0; i < randomSix.length; i++) {
        const categoryId = randomSix[i].id;
        const category = await getCategoryById(categoryId);
        categories.push(category);
    }

    return categories;
}

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
            let question = "Testing";

            let cell = document.createElement("td");
            cell.innerText = question;
            cell.setAttribute("id", `${j} - ${i}`);
        }

        row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
}

// getCategory().then((categories) => {
//     categories.map((category) => console.log(category.clues));

//     // creates a <table> element and a <tbody> element
//     const tbl = document.querySelector("#jeopardy");
//     const tblBody = document.querySelector("#tbody");

//     // create column
//     for (let i = 0; i < categories.length; i++) {
//         const category = categories[i];
//         let question = `Question: ${category.clues.map(
//             (clue) => clue.question
//         )}`;
//         console.log(question);
//         // let answer = `Answer: ${}`;
//         let cell = document.createElement("td");
//         cell.innerText = question;

//         // create row
//         for (let j = 0; j < category.clues.length; j++) {
//             const row = document.createElement("tr");
//             row.appendChild(cell);

//             // add the row to the end of the table body
//             tblBody.appendChild(row);
//         }
//     }

//     // put the <tbody> in the <table>
//     tbl.appendChild(tblBody);
//     // appends <table> into <body>
//     document.body.appendChild(tbl);
//     // sets the border attribute of tbl to '2'
//     tbl.setAttribute("border", "2");
// });

const btn = document.querySelector("#start");
btn.addEventListener("click", setupAndStart);

function setupAndStart() {
    /** On click of start / restart button, set up game. */
    $("#start").remove();
    $("#spin-container").remove();

    getCategory();
    generateTable();
}
