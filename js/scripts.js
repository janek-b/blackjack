$(function() {

  function cardObject(card, cardValue) {
    this.card = card;
    this.cardValue = cardValue;
  };

  var suits = ["clubs", "diamonds", "hearts", "spades"];
  var ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  var deckArray = [];

  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      var faceValue;
      var card = rank+"_of_"+suit;
      if (rank === "ace") {
        faceValue = 11;
      } else if ((rank === "jack")||(rank ==="queen")||(rank === "king")) {
        faceValue = 10;
      } else {
        faceValue = parseInt(rank);
      };
      deckArray.push(new cardObject(card, faceValue));
    });
  });

  var popCard = function(deck) {
    card = deck.splice(Math.floor(Math.random() * deck.length), 1);
    return card.pop();
  };

  var cardsInHand = [];

  function getScore(cardsInHand){
    score = 0;
    cardsInHand.forEach(function(currentCard) {
      score += currentCard.cardValue;
    });
    return score;
  };


  $("#dealCards").click(function(){
    if (cardsInHand.length < 2) {
      for (var i = 0; i < 2; i++) {
        var dealCard = popCard(deckArray);
        cardsInHand.push(dealCard);
        $(".displayCards").append('<img src="cards/'+dealCard.card+'.png">');
        $("#scoreHeader").html(getScore(cardsInHand));
      }
    } else {
      var dealCard = popCard(deckArray);
      cardsInHand.push(dealCard);
      $(".displayCards").append('<img src="cards/'+dealCard.card+'.png">');
      $("#scoreHeader").html(getScore(cardsInHand));
    }
    console.log(cardsInHand);
    if (getScore(cardsInHand) === 21) {
      $("#scoreHeader").html("<strong>YOU WIN!</strong>" + getScore(cardsInHand))
    } else if (getScore(cardsInHand) > 21) {
      cardsInHand.forEach(function(currentCard){
        if ((currentCard.cardValue === 11) && getScore(cardsInHand) > 10) {
            currentCard.cardValue = 1;
            $("#scoreHeader").html(getScore(cardsInHand));
        };
      });
      if (getScore(cardsInHand) === 21) {
        $("#scoreHeader").html("<strong>YOU WIN!</strong>" + getScore(cardsInHand))
      } else if (getScore(cardsInHand) > 21) {
        $("#scoreHeader").html("<h1>YOU LOSE!</h1>" + getScore(cardsInHand))
      }
    }
  });
});
