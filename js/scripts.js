$(function() {

  function cardObject(card, cardValue) {
    this.card = card;
    this.cardValue = cardValue;
  };

  var deckArray = [];

  var suits = ["clubs", "diamonds", "hearts", "spades"];
  var ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];


  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      var faceValue;
      var card = rank+"_of_"+suit;
      if (rank === "ace") {
        faceValue = 11;
      } else if ((rank === "jack")||(rank ==="queen")||(rank === "king")) {
        faceValue = 10;
      } else {
        faceValue = rank;
      }
      deckArray.push(new cardObject(card, faceValue));
    });
  });
  console.log(deckArray);

});
