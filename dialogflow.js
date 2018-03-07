/* Attention! On utilise ici une ou plusieurs fonctions du fichier canvas.js
* notramment dans la fonction setResponse*/

// insérer votre token personnelle ici pour utiliser votre propre agent
const accessToken = "47f4f4ab9f4c49ec97709ec057284584";
const baseUrl = "https://api.api.ai/v1/";
$(document).ready(function () {
    $("#message").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $("#rec").click(function (event) {
        switchRecognition();
    });
});

// les fonctions suivantes pourront être utilisés pour la reconaissance vocale
let recognition;

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.onstart = function (event) {
        updateRec();
    };
    recognition.onresult = function (event) {
        let text = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        stopRecognition();
    };
    recognition.onend = function () {
        stopRecognition();
    };
    recognition.lang = "en-US";
    recognition.start();
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

function setInput(text) {
    $("#message").val(text);
    send();
}

function updateRec() {
    $("#rec").text(recognition ? "Stop" : "Speak");
}

// création d'une valeur de session
const id = Math.floor(Math.random() * 1000000000);

// les fonctions suivantes gèrent l'envois et la reception des informations
function send() {
    const text = $("#message").val();
    if (text.length > 0) {
        $.ajax({
            type: "POST",
            url: baseUrl + "query?v=20150910",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: JSON.stringify({query: text, lang: "fr", sessionId: id}),
            success: function (data) {
                setResponse(data);
            },
            error: function () {
                setResponse("Internal Server Error");
            }
        });
        setResponse("Loading...");
    }
}

let result;

function setResponse(val) {
    console.log(val);
    $("#message").val('');
    result = val['result'];
    if (result) {
        console.log(result);
        analyseResponse(result);
        let reponse = '';
        for (msg of result['fulfillment']['messages']) {
            reponse += msg.speech + '<br>';
        }
        $("#reponse").html(reponse);
    }
}


