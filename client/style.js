function ani() {
    document.getElementById('cloudAnimation').style.visibility = 'hidden';
}

function ani2() {
    document.getElementById('cloudAnimation').style.visibility = 'visible';
}

function darkFunction() {
    let element = document.body;
    element.classList.toggle("darkMode");
    ani2();
    document.getElementById('cloudAnimation').style.display = 'none'
}

//https://giphy.com/gifs/stars-U3qYN8S0j3bpK