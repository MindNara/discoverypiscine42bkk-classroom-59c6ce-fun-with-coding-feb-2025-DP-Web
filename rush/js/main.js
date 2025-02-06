document.querySelectorAll('.half').forEach((item, index) => {
    item.classList.add(index === 0 ? 'left' : 'right');

    item.addEventListener('click', function (event) {
        event.preventDefault();
        const targetUrl = this.querySelector('a').getAttribute('href');

        document.querySelectorAll('.half').forEach(half => {
            if (half !== this) {
                half.classList.add('hidden');
            }
        });

        this.classList.add('expanded');

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1000);
    });
});
