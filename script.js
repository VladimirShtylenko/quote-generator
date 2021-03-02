//Get quote from API
const quoteText = document.querySelector('#quote'),
    quoteContainer = document.querySelector('#quote-container'),
    quoteAuthor = document.querySelector('#author'),
    addQuoteBtn = document.querySelector('#new-quote'),
    tweetBtn = document.querySelector('#twitter'),
    loader = document.querySelector('#loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
async function getQuote() {
    loading();
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
        complete();
    }
   
    catch (error) {
        console.log('Whoops', error);
    }
}
//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText,
        author = quoteAuthor.innerText,
    tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweeterUrl, '_blank');
}

addQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweetQuote);

//onload

getQuote();
