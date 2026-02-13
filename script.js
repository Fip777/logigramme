const steps = {

    /* ===================== Q1 ===================== */
    q1: { type: "question", text: "Question 1", yes: "q2", no: "q3" },

    /* ===================== Q2 ===================== */
    q2: { type: "question", text: "Question 2", yes: "conclusion_o2", no: "conclusion_n2" },
    conclusion_o2: { type: "conclusion", text: "Conclusion O2", suggestions: ["Conseil O2"] },
    conclusion_n2: {
        type: "conclusion",
        text: "Conclusion N2",
        proposals: {
            A: ["Suggestion A2-1", "Suggestion A2-2", "Suggestion A2-3"],
            B: ["Suggestion B2-1", "Suggestion B2-2", "Suggestion B2-3"]
        }
    },

    /* ===================== Q3 ===================== */
    q3: { type: "question", text: "Question 3", yes: "q4", no: "q5" },
    q4: { type: "question", text: "Question 4", yes: "conclusion_o4", no: "conclusion_n4" },
    conclusion_o4: { type: "conclusion", text: "Conclusion O4", suggestions: ["Conseil O4"] },
    conclusion_n4: {
        type: "conclusion",
        text: "Conclusion N4",
        proposals: {
            A: ["Suggestion A4-1", "Suggestion A4-2", "Suggestion A4-3"],
            B: ["Suggestion B4-1", "Suggestion B4-2", "Suggestion B4-3"]
        }
    },

    q5: { type: "question", text: "Question 5", yes: "conclusion_o5", no: "q6" },
    conclusion_o5: {
        type: "conclusion",
        text: "Conclusion O5",
        proposals: {
            A: ["Suggestion A5-1", "Suggestion A5-2"],
            B: ["Suggestion B5-1", "Suggestion B5-2", "Suggestion B5-3"]
        }
    },

    q6: { type: "question", text: "Question 6", yes: "conclusion_o6", no: "q7" },
    conclusion_o6: {
        type: "conclusion",
        text: "Conclusion O6",
        proposals: {
            A: ["Suggestion A6-1", "Suggestion A6-2"],
            B: ["Suggestion B6-1", "Suggestion B6-2", "Suggestion B6-3"]
        }
    },

    q7: { type: "question", text: "Question 7", yes: "q8", no: "q9" },
    q8: { type: "question", text: "Question 8", yes: "conclusion_o8", no: "conclusion_n8" },
    conclusion_o8: {
        type: "conclusion",
        text: "Conclusion O8",
        proposals: {
            A: ["Suggestion A8-1", "Suggestion A8-2", "Suggestion A8-3"],
            B: ["Suggestion B8-1", "Suggestion B8-2", "Suggestion B8-3"]
        }
    },
    conclusion_n8: {
        type: "conclusion",
        text: "Conclusion N8",
        proposals: {
            C: ["Suggestion C8-1", "Suggestion C8-2", "Suggestion C8-3"],
            D: ["Suggestion D8-1", "Suggestion D8-2", "Suggestion D8-3"]
        }
    },

    q9: { type: "question", text: "Question 9", yes: "q10", no: "q11" },
    q10: { type: "question", text: "Question 10", yes: "conclusion_o10", no: "conclusion_n10" },
    conclusion_o10: {
        type: "conclusion",
        text: "Conclusion O10",
        proposals: {
            A: ["Suggestion A10-1", "Suggestion A10-2"],
            B: ["Suggestion B10-1", "Suggestion B10-2", "Suggestion B10-3"]
        }
    },
    conclusion_n10: {
        type: "conclusion",
        text: "Conclusion N10",
        proposals: {
            C: ["Suggestion C10-1", "Suggestion C10-2"],
            D: ["Suggestion D10-1", "Suggestion D10-2", "Suggestion D10-3"]
        }
    },

    q11: { type: "question", text: "Question 11", yes: "conclusion_o11", no: "conclusion_n11" },
    conclusion_o11: {
        type: "conclusion",
        text: "Conclusion O11",
        proposals: {
            A: ["Suggestion A11-1", "Suggestion A11-2"],
            B: ["Suggestion B11-1", "Suggestion B11-2", "Suggestion B11-3"]
        }
    },
    conclusion_n11: { type: "conclusion", text: "Conclusion N11" }
};

const app = document.getElementById("app");
const instruction = document.getElementById("instruction");
const restartContainer = document.getElementById("restart-container");

let currentStep = "q1";

// Affiche les suggestions d'une proposition
function showSuggestions(suggestions) {
    app.innerHTML = "";
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("p");
    title.textContent = "Suggestions :";
    card.appendChild(title);

    const ul = document.createElement("ul");
    suggestions.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        ul.appendChild(li);
    });
    card.appendChild(ul);

    const restart = document.createElement("button");
    restart.textContent = "Recommencer";
    restart.className = "restart";
    restart.onclick = () => {
        currentStep = "q1";
        render();
    };
    card.appendChild(restart);

    app.appendChild(card);
    instruction.style.display = "none";
}

// Affichage des questions / conclusions
function render() {
    app.innerHTML = "";
    restartContainer.innerHTML = "";

    const step = steps[currentStep];

    const card = document.createElement("div");
    card.className = "card";

    const text = document.createElement("p");
    text.textContent = step.text;
    card.appendChild(text);

    let hasChoices = false;

    // ===== Questions Oui/Non =====
    if (step.type === "question") {
        hasChoices = true;

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const yesBtn = document.createElement("button");
        yesBtn.textContent = "Oui";
        yesBtn.className = "yes";
        yesBtn.onclick = () => {
            currentStep = step.yes;
            render();
        };

        const noBtn = document.createElement("button");
        noBtn.textContent = "Non";
        noBtn.className = "no";
        noBtn.onclick = () => {
            currentStep = step.no;
            render();
        };

        buttons.appendChild(yesBtn);
        buttons.appendChild(noBtn);
        card.appendChild(buttons);
    }

    // ===== Conclusion avec propositions =====
    if (step.type === "conclusion" && step.proposals) {
        hasChoices = true;

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        Object.keys(step.proposals).forEach(key => {
            const btn = document.createElement("button");
            btn.textContent = "Proposition " + key;
            btn.className = "proposal";
            btn.onclick = () => showSuggestions(step.proposals[key]);
            buttons.appendChild(btn);
        });
        card.appendChild(buttons);
    }

    // ===== Conclusion avec suggestions directes =====
    if (step.type === "conclusion" && step.suggestions) {
        const ul = document.createElement("ul");
        step.suggestions.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            ul.appendChild(li);
        });
        card.appendChild(ul);
    }

    instruction.style.display = hasChoices ? "block" : "none";
    app.appendChild(card);

    // ===== Bouton Recommencer =====
    if (!hasChoices) {
        const restart = document.createElement("button");
        restart.textContent = "Recommencer";
        restart.className = "restart";
        restart.onclick = () => {
            currentStep = "q1";
            render();
        };
        restartContainer.appendChild(restart);
    }
}

// Lancement initial
render();

