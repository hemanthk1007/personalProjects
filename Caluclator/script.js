let string = "";
let buttons = document.querySelectorAll('.button');
console.log(buttons.length)
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log("clicked")
        if (e.target.innerHTML == '=') {
            string = eval(string);
            document.querySelector('input').value = string;
        }
        else {
            console.log(e.target)
            string = string + e.target.innerHTML;
            document.querySelector('input').value = string;
        }
    })
})