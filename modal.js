let modal = {
    e: {
        rule_modal: document.getElementById("rules_modal"),
        close: document.getElementById("close_btn"),
        rule_text: document.getElementById("rule_text"),
        rules_btn: document.getElementById("rules"),
    },
};

modal.evtCallbacks = {
    showRules: function() {
        /* Set the display style of the modal to show "block" */
        this.e.rule_modal.style.display = "block";
    },

    close: function() {
        this.e.rule_modal.style.display = "none";
    }
};

modal.addListeners = function() {
    this.e.rules_btn.addEventListener("click", this.evtCallbacks.showRules.bind(this));

    this.e.close.addEventListener("click", this.evtCallbacks.close.bind(this));
};

modal.init = function() {
    this.addListeners();
};

modal.init();
