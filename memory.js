let memoryGame = {
    e: {
        cards_container: document.getElementById("cards_cont"),
        cards: document.getElementsByClassName("card"),
        cards_left_e: document.getElementById("cards_left"),
        tries_left_e: document.getElementById("tries_left"),
        last_clicked_element: null,
        game_over: document.getElementById("game-over"),
        winner: document.getElementById("winner"),
        play_again: document.getElementById("play_again")
    },
    image_src: ["css.jpg", "html.png", "JSIcon.png", "profile44.jpg", "rails.png"],
    imageArray: [],
    IMAGES_LENGTH: 0,
    default_cards_length: 10,
    cards_left: 10,
    tries_left: 5,
};

memoryGame.evtCallbacks = {
    showImage: function (mouseEvent) {

        console.dir(mouseEvent.target);
        /* Remove and add image on click, if the images dont match make them hidden again */
        if (mouseEvent.currentTarget.firstChild.classList.contains('hidden')) {
            mouseEvent.currentTarget.firstChild.classList.remove('hidden');
            mouseEvent.currentTarget.firstChild.classList.add('visible');
            this.updateCardsNum();
        }

        if(this.e.last_clicked_element != null) {
            if(this.e.last_clicked_element != mouseEvent.currentTarget) {
                if (this.e.last_clicked_element.firstChild.src != mouseEvent.currentTarget.firstChild.src) {
                    
                    this.e.last_clicked_element.firstChild.classList.remove('visible');
                    this.e.last_clicked_element.firstChild.classList.add('hidden');

                    mouseEvent.currentTarget.firstChild.classList.remove('visible');
                    mouseEvent.currentTarget.firstChild.classList.add('hidden');

                    this.e.last_clicked_element = null;

                    this.tries_left--;
                    this.e.tries_left_e.innerHTML = this.tries_left;

                    this.cards_left = this.cards_left + 2;
                    this.e.cards_left_e.innerHTML = this.cards_left;

                    /* Game over if tries is 0 */
                    if (this.tries_left == 0){
                        this.showAll();
                        this.e.game_over.classList.remove("hidden");
                        this.e.game_over.classList.add("visible");
                        this.e.play_again.classList.remove("hidden");
                        this.e.play_again.classList.add("visible");
                        this.turnOffPointers();
                    }

                } else {
                    this.e.last_clicked_element.style.pointerEvents = "none";
                    mouseEvent.currentTarget.style.pointerEvents = "none";

                    this.e.last_clicked_element = null;

                    /* Congratualations if cards left = 0 */
                    if (this.cards_left == 0) {
                        this.showAll();
                        this.e.winner.classList.remove("hidden");
                        this.e.winner.classList.add("visible");
                        this.e.play_again.classList.remove("hidden");
                        this.e.play_again.classList.add("visible");
                        this.turnOffPointers();
                    }
                }
            }
        } else {
            this.e.last_clicked_element = mouseEvent.currentTarget;
        }
    },

    clearAll: function() {
        this.resetAll();
        /* remove all child nodes and add randomly again */
        while (this.e.cards_container.hasChildNodes()) {
            this.e.cards_container.removeChild(this.e.cards_container.lastChild);
        }

        this.init();

        for (let i = 0; i < this.e.cards.length; i++) {
            this.e.cards[i].firstChild.classList.remove('visible');
            this.e.cards[i].firstChild.classList.add('hidden');
            this.e.cards[i].style.pointerEvents = "";
        }

        this.e.game_over.classList.remove('visible');
        this.e.game_over.classList.add('hidden');
        this.e.play_again.classList.remove('visible');
        this.e.play_again.classList.add('hidden');
        this.e.winner.classList.remove('visible');
        this.e.winner.classList.add('hidden');
    }
};

memoryGame.turnOffPointers = function() {
    for (let i = 0; i < this.e.cards.length; i++) {
        this.e.cards[i].style.pointerEvents = "none";
    }
}

memoryGame.resetAll = function() {
    this.cards_left = this.default_cards_length;
    this.e.cards_left_e.innerHTML = this.cards_left;

    this.tries_left = 5;
    this.e.tries_left_e.innerHTML = this.tries_left;

};

memoryGame.updateCardsNum = function() {
    this.cards_left--;
    this.e.cards_left_e.innerHTML = this.cards_left;
};

memoryGame.showAll = function() {
    for (let i = 0; i < this.e.cards.length; i++) {
        this.e.cards[i].firstChild.classList.remove('hidden');
        this.e.cards[i].firstChild.classList.add('visible');
    }
};

memoryGame.duplicateImages = function () {
    let images_srcClone = this.image_src.slice(0);
    this.imageArray = this.image_src.concat(images_srcClone);
    this.IMAGES_LENGTH = this.imageArray.length;
};

memoryGame.generateCards = function() {
    /* For each images create a card and append it to the card container */
    for (let i = 0; i < this.IMAGES_LENGTH; i++) {

        /* There will be 10 images in the game, can change based on the number of images in the folder */
        let rand = Math.floor(Math.random() * this.imageArray.length);
        let currentImgSrc = this.imageArray[rand];

        /* Set up card div */
        let cardDIV = document.createElement("div");
        cardDIV.className = "card";

        /* Set up the card image */
        let cardIMG = document.createElement("img");
        cardIMG.className = "card_img hidden";
        cardIMG.src = "images/" + currentImgSrc;

        cardDIV.appendChild(cardIMG);
        this.e.cards_container.appendChild(cardDIV);

        this.imageArray.splice(rand, 1);
    }
};

memoryGame.sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

memoryGame.addListeners = function() {
    for (let i = 0; i < this.e.cards.length; i++) {
        this.e.cards[i].addEventListener("click", this.evtCallbacks.showImage.bind(this));
    }

    this.e.play_again.addEventListener("click",this.evtCallbacks.clearAll.bind(this));
};

memoryGame.init = function() {
    this.duplicateImages();
    this.generateCards();
    this.addListeners();
    this.e.tries_left_e.innerHTML = this.tries_left;
    this.e.cards_left_e.innerHTML = this.cards_left;
};

memoryGame.init();
