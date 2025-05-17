$(document).ready(function() {
    $('.caret').addClass('caret-down');
    $('.nested').show();

    $('.caret').on('click', function() {
        $(this).toggleClass('caret-down');
        $(this).next('.nested').toggle('fast');
    });

    $('#toggle-tree').on('click', function() {
        $('.file-tree .nested').toggle('fast');
        $('.caret').toggleClass('caret-down');
    });

    document.querySelectorAll('#file-list li #cl').forEach(item => {
        item.addEventListener('click', function() {
            const file = this.getAttribute('data-file');
            fetch(file)
                .then(response => response.text())
                .then(markdown => {
                    const html = marked.parse(markdown, {breaks: true});
                    document.getElementById('content').innerHTML = html;
                    history.pushState(null, '', `#${file}`);
                })
                .catch(error => console.error('Error fetching the Markdown file:', error));
        });
    });

    window.addEventListener('popstate', function() {
        const file = location.hash.substring(1);
        if (file) {
            fetch(file)
                .then(response => response.text())
                .then(markdown => {
                    const html = marked.parse(markdown, {breaks: true});
                    document.getElementById('content').innerHTML = html;
                })
                .catch(error => console.error('Error fetching the Markdown file:', error));
        }
    });

    if (location.hash) {
        const file = location.hash.substring(1);
        fetch(file)
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown, {breaks: true});
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => console.error('Error fetching the Markdown file:', error));
    }
});