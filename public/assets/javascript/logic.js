//Submit button event function
$(".submit").on("click", (event) => {
    event.preventDefault();
    questionsComplete = true
    let scoreResults = []

    // Validate loop all 10 questions and push all results
    for (let i = 1; i < 11; i++) {
        idName = "#q" + i
        answer = $(idName).val().trim()
        if (answer === "") {
            questionsComplete = false
            break
        } else {
            scoreResults.push(answer)
        }
    }
    console.log(scoreResults)
    // Validate name and picture form data
    if (($("#name").val().trim()) == "" || ($("#urlPhoto").val().trim() == "")) {
        questionsComplete = false;
    }
    if (questionsComplete == false) {
        alert("Please complete all questions before continuing")
    } else {
        let info = {
            name: $("#name").val().trim(),
            photo: $("#urlPhoto").val().trim(),
            scores: scoreResults
        };
        console.log(info);

        //AJAX Post
        $.post("/api/friends", info,
            (data) => {
                // analyze resulting data
                console.log("-------> ", data)
                if (data['result'] == true) {
                    console.log(data['name'], data['photo'])
                    // Modal Data
                    $("#friendPhoto").attr("src", data['photo'])
                    $("#friendName").html(data['name'])
                    // Clear all form entries
                    $("#name").val("");
                    $("#urlPhoto").val("");

                    for (let i = 1; i < 11; i++) {
                        idName = "#q" + i
                        $(idName).val("")
                    }
                    // SHOW RESULT MODAL
                    $('#friendResult').modal('show');
                } else {
                    // this will only happen if the list is blank
                    // which won't ever happen
                    alert("Sorry, no matches!");
                }
            });
    }
});