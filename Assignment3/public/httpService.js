class HttpService {
    constructor() {
        this.rxjs = window.rxjs; 
    }

    post(url, data) {
        const { from } = this.rxjs;
        
        return from(fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }));
    }

    countVowelsConsonants(text) {
        return this.post('/api/count', { text });
    }

    calculateBMI(weight, feet, inches) {
        return this.post('/api/bmi', { weight, feet, inches });
    }
}

window.httpService = new HttpService();