let categories = [];

// This will get 6 Random Category ID's

async function getCategoryIds() {
    let catIds = (
        await axios.get("http://jservice.io/api/categories?count=100")
    ).data;
    let catIdsArray = Object.values(catIds);
    let randomSix = _.sampleSize(catIdsArray, 6);

    console.log(randomSix.map((cat) => cat.id));
    return randomSix.map((cat) => cat.id);
}

// This will get the title and array of clues

async function getCategory(catId) {
    let cat = (await axios.get(`http://jservice.io/api/category?id=${catId}`))
        .data;
    let clues = (
        await axios.get(`http://jservice.io/api/clues?category=${catId}`)
    ).data;

    console.log("title with clues", {
        title: cat.title,
        clues: _.sampleSize(clues, 5),
    });
    return { title: cat.title, clues: _.sampleSize(clues, 5) };
}

// ** Fill the HTML table#jeopardy with the categories & cells for questions.
//  *
//  * - The <thead> should be filled w/a <tr>, and a <td> for each category
//  * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
//  *   each with a question for each category in a <td>
//  *   (initally, just show a "?" where the question/answer would go.)
//  */

// This will fill the table with the title & clues

async function fillTable() {
    showLoadingView();

    let $thead = $("#jeopardy thead");
    let $tbody = $("#jeopardy tbody");
    $thead.empty();
    $tbody.empty();
    let $tr = $("<tr>");
    categories.forEach((cat) => {
        $tr.append(`<td> ${cat.title}</td>`);
    });

    $thead.append($tr);

    for (let i = 0; i < 5; i++) {
        $tr = $("<tr>");
        categories.forEach((cat) => {
            let clue = cat.clues[i];
            // let $td = $(`<td class="clue" data-clue-id="${clue.id}">?</td>`);
            let $td = $(`<td class="clue" id="${clue.id}">?</td>`);
            $td.on("click", handleClick);
            $tr.append($td);
        });
        $tbody.append($tr);
    }
    hideLoadingView();
}

// selects the target of the clickevent and shows data based on the id.

function handleClick(evt) {
    const newClues = categories.map(function (clues) {
        return clues;
    });

    console.log(newClues);

    let $td = $(evt.target);
    let $tdID = $(evt.target).attr("id");

    console.log("ID:", $tdID);

    if ($td.hasClass("clue")) {
        $td.text(categories[0].clues[0].question);
        $td.removeClass("clue").addClass("answer");
    } else if ($td.hasClass("answer")) {
        $td.text(categories[0].clues[0].answer);
        $td.removeClass("answer").addClass("completed");
    } else {
        return;
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $("#jeopardy").hide();
    $("#spin-container").show();
    $("#start").text("Loading...");
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#jeopardy").show();
    $("#spin-container").hide();
    $("#start").text("Restart");
}

// Executes sixRandomIds and push it to categories array

async function setupAndStart() {
    let catIds = await getCategoryIds();

    for (let i = 0; i < catIds.length; i++) {
        const catId = catIds[i];
        const category = await getCategory(catId);
        categories.push(category);
    }

    fillTable();
}

// /** On click of start / restart button, set up game. */
$("#start").on("click", setupAndStart);

// // TODO

// /** On page load, add event handler for clicking clues */
$(".clue").on("click", handleClick);
