//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const codes = document.querySelectorAll('.code');

    // Automatically focus the very first input field when the layout loads
    if (codes.length > 0) {
        codes[0].focus();
    }

    codes.forEach((code, idx) => {
        // 1. Handling forward typing navigation mechanics
        code.addEventListener('input', () => {
            // Force strict length boundary to prevent multiple digits inside one cell
            if (code.value.length > 1) {
                code.value = code.value.slice(-1);
            }

            // If a valid character is entered, seamlessly shift focus to the next box
            if (code.value !== '' && idx < codes.length - 1) {
                codes[idx + 1].focus();
            }
        });

        // 2. Handling reverse backspace removal behavior
        code.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (code.value !== '') {
                    // If the current cell has a value, wipe it cleanly
                    code.value = '';
                } else if (idx > 0) {
                    // Edge case: If the current cell is already empty, clear the previous cell and step back
                    codes[idx - 1].value = '';
                    codes[idx - 1].focus();
                }
                
                // Allow focus management to stabilize across runtime cycles
                if (code.value === '' && idx > 0 && e.target.value === '') {
                    setTimeout(() => {
                        codes[idx - 1].focus();
                    }, 0);
                }
            }
        });
    });
});