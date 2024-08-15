document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-to-clipboard-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-toolbar').querySelector('pre code');
            const textToCopy = codeBlock.innerText.trim();

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Code copied to clipboard!');
                })
                .catch(err => {
                    console.error('Unable to copy code:', err);
                    alert('Failed to copy code. Please try again.');
                });
        });
    });
});
