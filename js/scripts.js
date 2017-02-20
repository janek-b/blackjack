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

  var playerHand = [];
  var dealerHand = [];

  var playerWins = 0;
  var dealerWins = 0;
  var winLoss = 0;

  function getScore(cardsInHand){
    score = 0;
    cardsInHand.forEach(function(currentCard) {
      score += currentCard.cardValue;
    });
    return score;
  };

  function playerWin() {
    $(".container").hide(300, function() {
      $(".fireworks").show("fast", function() {
        $(".fireworks").delay(4000).hide(1000, function() {
            $(".container").show(1000);
        });
      });
    });
    console.log("player win");
    $("#scoreHeader").html("<strong>YOU WIN!</strong>" + getScore(playerHand));
  }

  function dealerDeal() {
    if (getScore(dealerHand) < 17){
      var dealerDealCard = popCard(deckArray);
      dealerHand.push(dealerDealCard);
      $(".dealerCards").append('<img src="cards/'+dealerDealCard.card+'.png">');
    }
  }


  $("#dealCards").click(function(){
    if (winLoss === 0) {
      if (playerHand.length < 2) {
        for (var i = 0; i < 2; i++) {
          var dealCard = popCard(deckArray);
          playerHand.push(dealCard);
          $(".displayCards").append('<img src="cards/'+dealCard.card+'.png">');
          $("#scoreHeader").html(getScore(playerHand));
          var dealerDealCard = popCard(deckArray);
          dealerHand.push(dealerDealCard);
          if (i === 0) {
            $(".dealerCards").append("<img class='hiddenCard' src='http://www.jimknapp.com/Cards/Non-Bicycle_files/image002.jpg'>")
          } else {
            $(".dealerCards").append('<img src="cards/'+dealerDealCard.card+'.png">');
          }
        }
      } else {
        var dealCard = popCard(deckArray);
        playerHand.push(dealCard);
        $(".displayCards").append('<img src="cards/'+dealCard.card+'.png">');
        $("#scoreHeader").html(getScore(playerHand));
        dealerDeal();
      }

      if (getScore(playerHand) === 21) {
        playerWin();
        winLoss = 1;
      } else if (getScore(playerHand) > 21) {
        playerHand.forEach(function(currentCard){
          if ((currentCard.cardValue === 11) && getScore(playerHand) > 10) {
              currentCard.cardValue = 1;
              $("#scoreHeader").html(getScore(playerHand));
          };
        });
        if (getScore(playerHand) === 21) {
          playerWin();
          winLoss = 1;
        } else if (getScore(playerHand) > 21) {
          $("#scoreHeader").html("<h1>YOU LOSE!</h1>" + getScore(playerHand));
          winLoss = 1;
        }
      }
    }
  });

  $("#playerStand").one('click', function(){
    while (getScore(dealerHand) < 17) {
      dealerDeal();
    }
    $(".hiddenCard").hide();
    $(".dealerCards").prepend("<img src='cards/"+dealerHand[0].card+".png'>");
    $("#scoreHeader").html("<p>Dealer: "+getScore(dealerHand)+"</p><br><p>Player score: "+getScore(playerHand)+"</p>");
      if(getScore(dealerHand) > 21) {
        winLoss = 1;
        console.log("dealer LOSE");
        playerWin();
      } else if (getScore(playerHand) < 21) {
        if (getScore(playerHand) > getScore(dealerHand)) {
          winLoss = 1;
          console.log("player win");
          playerWin();
        } else if (getScore(playerHand) < getScore(dealerHand)) {
          winLoss = 1;
          console.log("dealer win");
          $("#scoreHeader").html("<strong>YOU LOSE</strong>" + getScore(playerHand));
        } else if (getScore(playerHand) === getScore(dealerHand)) {
          winLoss = 1;

        }
      }
  });
});
