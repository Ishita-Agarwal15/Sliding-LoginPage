
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active")
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active")
});


function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(res => res.text()).then(msg => alert(msg));

}

function register() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(res => res.text()).then(msg => alert(msg));
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = 'text';
        icon.textContent = "🙈"
    }
    else {
        input.type = 'password';
        icon.textContent = "👁️"
    }
}

function addCapsLockListener(inputId, messageId) {
    const input = document.getElementById(inputId);
    const message = document.getElementById(messageId);

    const checkCaps = (e) => {
        const isCapsLock = e.getModifierState && e.getModifierState("CapsLock")
        message.style.display = isCapsLock ? "block" : "none";
    };
    input.addEventListener("keydown", checkCaps);
    input.addEventListener("keyup", checkCaps);
    input.addEventListener("focus", (e) => {
        message.style.display = "none";
    });
}

function evaluatePasswordStrength(password, email) {
    const isLongEnough = password.length >= 8;
    const containsEmail = email && password.toLowerCase().includes(email.toLowerCase().trim());
    const containsNumber = /\d/.test(password);
    const containsSymbol = /[!@#$%^&*]/.test(password);
    const allValid = isLongEnough && !containsEmail && containsNumber && containsSymbol;

    const rulesBox = document.getElementById("reg-password-rules")
    const strengthLabel = document.getElementById("reg-password-strength")
    const lengthRule = document.getElementById("length-rule")
    const emailRule = document.getElementById("email-rule")
    const numberRule = document.getElementById("number-rule")
    const symbolRule = document.getElementById("symbol-rule")
    const signupBtn = document.getElementById("signup-btn")

    //show rules nox only if password is being typed
    if (password.length > 0) {
        rulesBox.style.display = "block";

        //length rule
        lengthRule.textContent = isLongEnough ? "✅At least 8 characters" : "❌At least 8 characters";
        lengthRule.style.color = isLongEnough ? "green" : "red";
        //email rule
        emailRule.textContent = containsEmail ? "❌Cannot contain email" : "✅Cannot contain email";
        emailRule.style.color = containsEmail ? "red" : "green";
        //number rule
        numberRule.textContent = containsNumber ? "✅At least 1 number or digit" : "❌At least 1 number or digit";
        numberRule.style.color = containsNumber ? "green" : "red";
        //symbol rule
        symbolRule.textContent = containsSymbol ? "✅At least 1 special character" : "❌At least 1 special character";
        symbolRule.style.color = containsSymbol ? "green" : "red";
        //strength rule
        strengthLabel.textContent = allValid ? "Password Strength: Strong" : "Password Strength: Weak";
        strengthLabel.style.color = allValid ? "green" : "red";

        signupBtn.disabled = !allValid;
    } else {
        rulesBox.style.display = "none";
        strengthLabel.textContent = "";
        signupBtn.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("reg-password");
    const emailInput = document.getElementById("reg-email");

    passwordInput.addEventListener("input", function () {
        evaluatePasswordStrength(passwordInput.value, emailInput.value)
    });
    emailInput.addEventListener("input", function () {
        evaluatePasswordStrength(passwordInput.value, emailInput.value)
    });
});


window.onload = function () {
    addCapsLockListener("login-password", "login-caps-msg")
    addCapsLockListener("reg-password", "reg-caps-msg")
};


