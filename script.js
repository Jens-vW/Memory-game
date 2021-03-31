$(function(){

    // All cards
    const socials = [
        'fa-facebook-f', 
        'fa-facebook-f', 
        'fa-instagram', 
        'fa-instagram', 
        'fa-twitter',
        'fa-twitter',
        'fa-twitch',
        'fa-twitch',
        'fa-whatsapp',
        'fa-whatsapp',
        'fa-youtube',
        'fa-youtube',
        'fa-snapchat-ghost',
        'fa-snapchat-ghost',
        'fa-tiktok',
        'fa-tiktok'
    ];

    // Shuffle cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); 

          [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(socials);

    // Add cards to deck
    socials.forEach(function(social){
        $("#memory").append('<i class="fab ' + social + ' faceDown"></i>')
    });

    // Create arrays and variables
    let temporaryCards = []
    let correctCards = 0;
    let incorrectTurns = 0;
    let turns = 0;

    // Shows cards on click and adds to temporary array, after that it performs check
    $("#memory i").on("click", function(){
        if(temporaryCards.length < 2 && $(this).hasClass("correct") != true && $(this).hasClass("faceUp") != true)
        {
            $(this).removeClass("faceDown");
            $(this).addClass("faceUp");
            temporaryCards.push($(this).attr("class"));
        }
        if(temporaryCards.length == 2)
        {
            checkCards();
            turns += 1;
        }
        update();
    });

    // Checks card if correct
    function checkCards(){
        if(temporaryCards[0] == temporaryCards[1])
        {
            $(".faceUp").addClass("correct");
            $(".faceUp").removeClass("faceUp");
            temporaryCards = [];
            correctCards += 2;
        }
        else
        {
            $(".faceUp").addClass("incorrect");
            $(".faceUp").removeClass("faceUp");
            setTimeout(cardsIncorrect, 2000)
            incorrectTurns += 1;
            temporaryCards = [];
        }
    };

    function cardsIncorrect(){
        $(".incorrect").addClass("faceDown");
        $(".incorrect").removeClass("incorrect");
    }

    function update(){
        // Displays amount of incorrect turns
        if(incorrectTurns > 0)
        {
            $("#fouten").text(incorrectTurns);
        }

        // Displays amount of total turns
        if(turns > 0)
        {
            $("#turns").text(turns);
        }
        
        // Performs actions when all cards are correct
        if(correctCards == 16)
        {
            finished()
        }

        // Removes 1 star after 16 wrong turns
        if(incorrectTurns > 16)
        {
            $("#star-3").css("color", "grey");
        }

        // Removes 2 star after 24 wrong turns
        if(incorrectTurns > 24)
        {
            $("#star-2").css("color", "grey");
        }

        // Removes 3 star after 24 wrong turns
        if(incorrectTurns > 32)
        {
            $("#star-1").css("color", "grey");
        }
    }

    // Function that performs when you finish te game
    function finished(){
        $("#body").css("opacity", "0.6")
        $("#body").fireworks();
    }

    // Restarts the game
    $("#restart").click(function(){
        location.reload();
    })
})