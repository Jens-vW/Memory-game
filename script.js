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
        $("#memory").append('<i id="faceDown" class="fab ' + social + '"></i>')
    });

    // Create arrays
    let temporaryCards = []
    let cardId = []
    let correctCards = []

    // Shows cards on click and adds to temporary array, after that it performs check
    $("#memory i").on("click", function(){
        cardId.push($(this));
        temporaryCards.push($(this).attr("class"));
        if(temporaryCards.length < 2)
        {
            $(this).attr("id", "faceUp");
        }
        checkCards(temporaryCards, cardId);
    });

    // Checks card if correct, when correct displays otherwise hides again
    function checkCards(cards, id){
        if(cards.length == 2 && cards[0] == cards[1])
        {
            id[0].attr("id", "correct");
            id[1].attr("id", "correct");
            setTimeout(cardsCorrect(id[0], id[1]), 500)
            temporaryCards = [];
        }
        else if(cards.length == 2)
        {
            id[0].attr("id", "incorrect");
            id[1].attr("id", "incorrect");
            setTimeout(cardsIncorrect, 2000);
            temporaryCards = [];
        }
    };

    function cardsIncorrect(card1, card2){
        console.log(card1);
        card1.attr("id", "faceDown");
        card2.attr("id", "faceDown");
        cardId = [];
    };

    function cardsCorrect(){
        correctCards.push(cards[0]);
        correctCards.push(cards[1]);
        cardId = [];
    };
})