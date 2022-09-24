/*
    I did a couple things different than what the assignment specifies so my
    work reflects the best practices detailed in previous readings:

    1. Instead of registering onclick handlers in the HTML, I've added them
       dynamically using Javascript. If I wanted to register them in the HTML,
       I would do so like this:

        <button id="bigger-button" onclick="foo()">Bigger!</button>
        function foo() {
            const textInput = document.querySelector("#text-input");
            textInput.style.fontSize = "24px";
        }

        However, embedding onclick handlers this way is bad practice, according
        to the readings.
    
    2. I omitted alert statements, but you can reenable them by altering the
       SHOW_ALERTS constant.
*/

const SHOW_ALERTS = !true;


window.addEventListener("load", ()=>{
    main();
});

function main(){
    const textInput = document.querySelector("#text-input");

    onClick("#bigger-button", ()=>{
        doAlert("Hello world!");
        textInput.style.fontSize = "24px";
    });

    onClick("#moo-button", ()=>{
        const orig = textInput.value;

        /*
            according to assignment, sentences end with a period, so don't need 
            to check for other punctuation (!, ?, etc)
        */
        const sentences = orig.split(".");
        const last = sentences.pop(); // last element did not end in period

        const changed = sentences.map(sentence => {
            return sentence.trimEnd(); // allows script to access last word
        }).filter(sentence => {
            return sentence.length > 0; // edge case: orig ends with a period
        }).map(sentence => {
            return `${sentence}-Moo.`;
        }).join(""); // doing "." here would not add a period to last sentence

        textInput.value = changed + last;
    });

    onClick("#fancy-button", ()=>{
        doAlert("Making your text fancy...");
        textInput.classList.add("fancy");
    });

    onClick("#boring-button", ()=>{
        textInput.classList.remove("fancy");
    });
}

/**
 * 
 * @param {string} selector the selector for the element to attach an onclick 
 *  handler to
 * @param {(e: ClickEvent)=>any} doThis the function to handle the onclick event 
 */
function onClick(selector, doThis){
    const element = document.querySelector(selector);
    if(!element){
        throw new Error(`Failed to find element with selector "${selector}"`);
    }
    element.addEventListener("click", doThis);
}


/**
 * @param {string|undefined} msg the message to alert if alerts are enabled
 */
function doAlert(msg=""){
    if(SHOW_ALERTS){
        alert(msg);
    }
}
