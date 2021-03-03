//Get quote from API
const quoteText = document.querySelector('#quote'),
    quoteContainer = document.querySelector('#quote-container'),
    quoteAuthor = document.querySelector('#author'),
    addQuoteBtn = document.querySelector('#new-quote'),
    tweetBtn = document.querySelector('#twitter'),
    loader = document.querySelector('#loader');

//Loader start
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Loader end
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get quote from Api
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = "https://shrouded-chamber-70760.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&land=ru&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === "") {
            quoteAuthor.innerText = 'Неизвестно';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        quoteText.innerText = 'Извиняемся но что-то пошло не так!';
        quoteAuthor.innerText = 'Загляните немного позже';
    }
}
//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText,
        author = quoteAuthor.innerText,
        tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweeterUrl, '_blank');
}

//Buttons
addQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweetQuote);

//onload
getQuote();