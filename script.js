document.addEventListener('DOMContentLoaded', () => {
    const codes = document.querySelectorAll('.code');

    // Auto-focus the first element on page load
    if (codes.length > 0) {
        codes[0].focus();
    }

    codes.forEach((code, idx) => {
        // Handling forward typing transitions
        code.addEventListener('input', () => {
            if (code.value.length > 1) {
                code.value = code.value.slice(-1);
            }

            if (code.value !== '' && idx < codes.length - 1) {
                codes[idx + 1].focus();
            }
        });

        // Handling structural deletion transitions
        code.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                // Prevent browser native defaults to execute custom state management cleanly
                e.preventDefault(); 
                
                // Clear the target input value explicitly
                code.value = ''; 
                
                // Instantly move focus backwards if a preceding cell exists
                if (idx > 0) {
                    codes[idx - 1].focus();
                }
            }
        });
    });
});