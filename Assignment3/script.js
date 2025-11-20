// Check whether if it is a .txt file and count vowels and consonants in that file
function countFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return alert("Please select a .txt file");
    
    const filename = file.name;
    if (!filename.endsWith('.txt')) {
        return alert("Incorrect file type. Please upload a .txt file");
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result.toLowerCase();
        let vowels = 0, consonants = 0;

        for (let char of text) {
            if ('aeiou'.includes(char)) vowels++;
            else if (char >= 'a' && char <= 'z') consonants++; // We suppose our .txt file does contain other characters besides alphabet letters
        }

        document.getElementById('result').innerHTML = `File: ${file.name}<br>Vowels: ${vowels} <br> Consonants: ${consonants}`;
    };
    reader.readAsText(file);
}


// Calculate BMI given weight (pounds), height (feet, inches)
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

    const heightinInches = feet * 12 + inches;
    const bmi = (weight * 703) / (heightinInches * heightinInches);

    document.getElementById('bmiResult').textContent = `BMI is ${bmi.toFixed(2)}`;
}