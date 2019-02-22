
document.addEventListener("DOMContentLoaded", function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();

        let name = $("#name").val().trim();
        let photo = $("#photo").val().trim();

        let dropdowns = $("select").toArray();

        if (!name || !photo & dropdowns.length !== 10) {
            alert("Please fill out all sections.");
            return;
        }
        

        let scoresArr = [];

        dropdowns.forEach((answer) => {
            let answerVal = answer.value;

            let adjAnswer;

            if (answerVal === "1 (Strongly disagree)") {
                adjAnswer = 1;
            } else if (answerVal === "5 (Strongly agree)") {
                adjAnswer = 5;
            } else {
                adjAnswer = answerVal;
            }

            scoresArr.push(parseInt(adjAnswer));
        })

        
        let friend = {
            name: name,
            photo: photo,
            scores: scoresArr
        };

        $.post("/api/friends", friend, function(data) {

            $("#friendName").text(data.name);
            $("#friendPic").attr("src", data.photo);


            $('#myModal').modal('toggle');

            $("#name").val("");
            $("#photo").val("");

            dropdowns.forEach((answer) => {
                answer.selectedIndex = 0;
            });

        })

        function reset(dropdowns) {

            $("#name").val("");
            $("#photo").val("");

            dropdowns.forEach((answer) => {
                answer.selectedIndex = 0;
            });

        };

        // reset(dropdowns);
    });














});  // end of code

