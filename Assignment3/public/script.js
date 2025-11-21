// Count vowels and consonants if the user uploads a .txt file
function countVowelsConsonants(text) {
    text = text.toLowerCase();
    let vowels = 0, consonants = 0;
    for (let char of text) {
        if ('aeiou'.includes(char)) vowels++;
        else if (char >= 'a' && char <= 'z') consonants++;
    }
    return { vowels, consonants };
}

// Calculate BMI
function calculateBMIValue(weight, feet, inches) {
    const heightInInches = feet * 12 + inches;
    return (weight * 703) / (heightInInches * heightInInches);
}

function countFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return alert("Please select a .txt file");

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const { vowels, consonants } = countVowelsConsonants(text);
        document.getElementById('result').innerHTML = 
            `Vowels: ${vowels} <br> Consonants: ${consonants}`;
    };
    reader.readAsText(file);
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('pounds').value);
    const feet = parseFloat(document.getElementById('feet').value);
    const inches = parseFloat(document.getElementById('inches').value);

    if (isNaN(weight) || isNaN(feet) || isNaN(inches)) {
        alert("Please fill in all three fields with valid numbers");
        return;
    }

    if (weight <= 0) {
        alert("Weight must be positive");
        return;
    }

    if (feet < 4 || feet > 7) {
        alert("Feet must be between 4 and 7");
        return;
    }

    if (inches < 0 || inches > 11) {
        alert("Inches must be between 0 and 11");
        return;
    }

    const bmi = calculateBMIValue(weight, feet, inches);
    document.getElementById('bmiResult').textContent = `BMI is ${bmi.toFixed(2)}`;
}