// =====================
// DISPLAY ELEMENTS
// =====================
const buttons = document.querySelectorAll(".buttons button");
const disp1 = document.getElementById("disp1");
const disp2 = document.getElementById("disp2");


// =====================
// BUTTON INPUT LOGIC
// =====================
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let input = btn.textContent;

        if (input === "AC" || input === "DE" || input === "=") return;

        disp1.value += input;
        disp2.value = ""; // clear result when typing
    });
});





// =====================
// DELETE BUTTON
// =====================
document.getElementById("DE").addEventListener("click", () => {
    disp1.value = disp1.value.slice(0, -1);
});


// =====================
// AC BUTTON
// =====================
document.getElementById("AC").addEventListener("click", () => {
    disp1.value = "";
    disp2.value = "";
});


// =====================
// EQUALS BUTTON
// =====================
document.getElementById("equals").addEventListener("click", () => {
    let input = disp1.value;

    input = transform(input);

    try {
        let result = eval(input);
        disp2.value = Number(result.toFixed(6)); // rounded output
    } catch {
        disp2.value = "Syntax error";
    }
});


// =====================
// HELPER FUNCTIONS
// =====================

// factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;

    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}


// transform input → JS expression
function transform(input) {
    const funcs = ["sin", "cos", "tan"];

    // trig (degrees → radians)
    funcs.forEach(fn => {
        const regex = new RegExp(`${fn}\\(([^()]+)\\)`, "g");
        input = input.replace(regex, (_, val) =>
            `Math.${fn}((${val}) * Math.PI / 180)`
        );
    });

    // sqrt
    input = input.replace(/sqrt\(([^()]+)\)/g, "Math.sqrt($1)");

    // power ^
   input = input.replace(/(\([^()]+\)|\d+)\^(\d+)/g, "Math.pow($1,$2)");

    // factorial !
    input = input.replace(/(\d+)!/g, "factorial($1)");

    // percentage
    input = input.replace(/(\d+)%(\d+)/g, "($1/100)*$2");

    // log base 10
    input = input.replace(/log\(([^()]+)\)/g, "Math.log10($1)");

    // constants
    input = input.replace(/pi/g, "Math.PI");
    input = input.replace(/\be\b/g, "Math.E");

    return input;
}