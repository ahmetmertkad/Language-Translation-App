const fromLang = document.getElementById("from-lang");
const toLang = document.getElementById("to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const Exchange = document.querySelector(".exchange");
const Icons = document.querySelectorAll(".icons");


Exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
})



for (let icon of Icons) {

    icon.addEventListener("click", (element) => {
        if (element.target.classList.contains("fa-copy")) {
            if (element.target.id == "from") {

navigator.clipboard.writeText(fromText.value);

            }
            else {
navigator.clipboard.writeText(toText.value);

            }
        }

        else {
let utterance;
            if (element.target.id == "from") {
utterance=new SpeechSynthesisUtterance(fromText.value);
utterance.lang=fromLang.value;
            }
            else {
utterance=new SpeechSynthesisUtterance(toText.value);
utterance.lang=toLang.value;
            }

speechSynthesis.speak(utterance);


        }






    })



}







function loadLanguages(languages) {

    for (lang in languages) {
        var html = `
    
    <option value=${lang}>${languages[lang]}</option>
    
    
    
    `;

        fromLang.insertAdjacentHTML("beforeend", html);
        toLang.insertAdjacentHTML("beforeend", html);

    }

    fromLang.value = "tr-TR";
    toLang.value = "en-GB"

}

loadLanguages(languages);

btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`
    fetch(url).then(res => res.json()).then(data => { toText.value = data.responseData.translatedText });
})




