'use strict';

function recordStart() {
    var final_transcript = '';
    if (!('webkitSpeechRecognition' in window)) {
        console.log('it is not supported');
        // upgrade();
    } else {
        var recognition = new webkitSpeechRecognition();
        // recognition.continuous = true;
        recognition.interimResults = true;
        recognition.start();
        recognition.onstart = function() {
            // console.log('onstart');
        };
        recognition.onresult = function(event) {
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
        };
        recognition.onerror = function(event) {
            console.log('onerror', event);
        };
        recognition.onend = function(data) {
            sendSentence(final_transcript);
        };
    }
};

function sendSentence (data) {
    // TODO send all information
    $.post( "http://localhost:5000/api/v1/story", {sentence: data, nouns: []}, function(data) {
        console.log("get", data);
    });
};

function getSentences () {
    $.get( "http://localhost:5000/api/v1/story", function(data) {
        console.log("get", data);
    });
};

function getSentenceById (idSentence) {
    $.get( "http://localhost:5000/api/v1/story/" + idSentence, function(data) {
        console.log("get", data);
    });
};
