  // Reverse a string using a for loop up to str.length
  function reverseString(str) {
    const s = String(str);
    let reversed = '';
    for (let i = 0; i < s.length; i++) {
      // prepend current char to build reversed string
      reversed = s.charAt(i) + reversed;
    }
    return reversed;
  }

  // Check palindrome by comparing characters from both ends with a for loop
  function isPalindrome(str) {
    const s = String(str);
    const n = s.length;
    for (let i = 0; i < Math.floor(n / 2); i++) {
      if (s.charAt(i) !== s.charAt(n - 1 - i)) {
        return false;
      }
    }
    return true;
  }

  // Simple tip calculation (assumes valid numeric inputs)
  function calculateTip(subtotal, tipPercent) {
    const s = Number(subtotal);
    const p = Number(tipPercent);
    const tipAmount = Math.round(s * (p / 100) * 100) / 100;
    const total = Math.round((s + tipAmount) * 100) / 100;
    return { subtotal: Math.round(s * 100) / 100, tipPercent: p, tipAmount, total };
  }

  /* -------- Minimal DOM wiring (works with your index.html) -------- */

  // Reverse form
  const reverseForm = document.getElementById('reverse-form');
  if (reverseForm) {
    const reverseInput = document.getElementById('reverse-input');
    const reverseOutput = document.getElementById('reverse-output');
    const reverseClear = document.getElementById('reverse-clear');

    reverseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      reverseOutput.textContent = reverseString(reverseInput.value);
    });

    if (reverseClear) {
      reverseClear.addEventListener('click', () => {
        reverseInput.value = '';
        if (reverseOutput) reverseOutput.textContent = '';
      });
    }
  }

  // Palindrome form
  const palForm = document.getElementById('palindrome-form');
  if (palForm) {
    const palInput = document.getElementById('palindrome-input');
    const palOutput = document.getElementById('palindrome-output');
    const palClear = document.getElementById('palindrome-clear');

    palForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = palInput.value;
      const ok = isPalindrome(val);
      palOutput.textContent = ok ? `"${val}" is a palindrome.` : `"${val}" is not a palindrome.`;
    });

    if (palClear) {
      palClear.addEventListener('click', () => {
        palInput.value = '';
        if (palOutput) palOutput.textContent = '';
      });
    }
  }

  // Tip form
  const tipForm = document.getElementById('tip-form');
  if (tipForm) {
    const subtotalInput = document.getElementById('subtotal-input');
    const tipPercentInput = document.getElementById('tip-percent-input');
    const tipOutput = document.getElementById('tip-output');
    const tipClear = document.getElementById('tip-clear');

    tipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const res = calculateTip(subtotalInput.value, tipPercentInput.value);
      tipOutput.innerHTML =
        `<b>Subtotal:</b> $${res.subtotal.toFixed(2)}<br>` +
        `<b>Tip (${res.tipPercent}%):</b> $${res.tipAmount.toFixed(2)}<br>` +
        `<strong>Total: $${res.total.toFixed(2)}</strong>`;
    });

    if (tipClear) {
      tipClear.addEventListener('click', () => {
        subtotalInput.value = '';
        tipPercentInput.value = '';
        if (tipOutput) tipOutput.textContent = '';
      });
    }
  }

