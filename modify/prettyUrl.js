var sanitized = window.url
                      .replace(/^https\:\/\//, '') // remove the leading http:// (temporarily)
                      .replace(/\/+/g, '/') // replace consecutive slashes with a single slash
                      .replace(/\/+$/, ''); // remove trailing slashes

sanitized = 'https://' + sanitized; // add https to the front

window.onload = function urlChange() {
    if (window.url !== sanitized) {
        location.replace(sanitized);
    }
}