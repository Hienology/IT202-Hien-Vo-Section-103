// Check, process and count the vowels and consonants from the uploaded .txt file
function countFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return alert("Please select a .txt file");

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;

        httpService.countVowelsConsonants(text).subscribe({
            next: (data) => {
                document.getElementById('result').innerHTML = 
                    `Results for file ${file.name} - Vowels: ${data.vowels} <br> Consonants: ${data.consonants}`;
            },
            error: (error) => {
                console.error(error);
                alert('Error processing file');
            }
        });
    };
    reader.readAsText(file);
}

// Validate and calculate BMI based on user input
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

    httpService.calculateBMI(weight, feet, inches).subscribe({
        next: (data) => {
            document.getElementById('bmiResult').textContent = `BMI is ${data.bmi.toFixed(2)}`;
        },
        error: (error) => {
            console.error(error);
            alert('Error calculating BMI');
        }
    });
}