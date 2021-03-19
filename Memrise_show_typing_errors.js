// ==UserScript==
// @name           Memrise Show typing errors
// @namespace      
// @description    Show typing errors in red (usefull when the question is a long sentence)
// @match          https://www.memrise.com/course/*/garden/*
// @match          https://www.memrise.com/garden/review/*
// @match          https://app.memrise.com/course/*/garden/*
// @match          https://app.memrise.com/garden/review/*
// @match          https://decks.memrise.com/course/*/garden/*
// @match          https://decks.memrise.com/garden/review/*
// @version        0.0.1

// ==/UserScript==

// https://stackoverflow.com/a/56290295/3154274


$(document).ready(function() {




    let node = document.getElementById("gardening-area")
    let button = document.createElement("div");
    button.innerHTML = '<div style="position: fixed; top: 120px; right:10px; z-index:10000;" ><input id="displayErrorID" type="button" value="Show Errors" /></div>'
    node.parentNode.insertBefore(button, node)

    var myButton = document.querySelector("#displayErrorID");
    if (myButton) {
        myButton.addEventListener("click", displayErrors)
    }



    function words(s) {
        return s.toLowerCase().match(/\w+/g);
    }

    function displayErrors() {
        var mistake = document.getElementsByClassName("copytyping-wrote")[0].innerText;
        var correct_answer = document.getElementsByClassName("primary-value")[0].innerText;

        let a = words(correct_answer);
        let b = words(mistake);
        let res1 = b.filter(i => !a.includes(i));
        //let res2 = a.filter(i => !b.includes(i));

        highlight(b, "str2", res1);
        //highlight(a, "str1", res2);
        function highlight(str, id, res) {
            const div = document.getElementsByClassName("copytyping-wrote")[0];
            var text = "";
            for (var i = 0; i < str.length; i++) {
                var hasVal = res.includes(str[i]);
                if (hasVal) {
                    text += " <span style='color:red;'>" + str[i] + "</span> ";
                } else {
                    text += " " + str[i] + " ";
                }
            }
            div.innerHTML = text;
        }
    }


});
