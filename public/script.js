var endpoint = "~/soireeInfo";
var challengeID = 0;
const challenges = [
    'faire afficher "hello world" dans le terminal',
    'afficher le répertoire de travail actuel',
    'lister les dossiers et fichiers du répertoire',
    'afficher le contenu du fichier qui parle de woodstock',
    'créer un fichier vide "dot.jpeg"',
    'se déplacer dans le dossier frites via un chemin relatif',
    'afficher les fichiers et dossiers du dossier parent',
    'afficher la date (qui ne sera peut-être pas la bonne j\'ai codé ça cet aprem',
    'afficher votre username',
    'créer un répertoire vide appelé "repoToDelete"',
    'supprimer immédiatement ce répertoire (hint: rm pour supprimer un fichier)',
    'afficher le type de fichier de "dot.jpeg", créé plus tôt dans le dossier parent',
    'enfin, se rendre dans le dossier de l\'épreuve d\'algo, via un chemin absolu (vous avez toutes les infos)'
];

const input = document.querySelector("#input");
var inputLine = document.querySelector("#inputline");
input.focus();
window.onresize = () => {
    input.setAttribute('size', Math.round((window.visualViewport.width - 200) / 14)) + "";
}
input.setAttribute('size', Math.round((window.visualViewport.width - 200) / 14)) + "";

input.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        let divToAdd = document.createElement('div');
        divToAdd.classList = 'line';
        divToAdd.innerHTML = "<em>hacker@machine</em>:<b>" + endpoint + "</b>$ " + input.value;
        socket.emit('try', input.value.trim());
        console.log('Command sent via socket.');
        input.value = "";
        document.body.appendChild(divToAdd);
        document.body.appendChild(inputLine);

        input.focus();
    }
});

input.addEventListener('change', () => {
    let divToAdd = document.createElement('div');
    divToAdd.classList = 'line';
    divToAdd.innerHTML = "<em>hacker@machine</em>:<b>" + endpoint + "</b>$ " + input.value;
    socket.emit('try', input.value.trim());
    console.log('Command sent via socket.');
    input.value = "";
    document.body.appendChild(divToAdd);
    document.body.appendChild(inputLine);

    input.focus();
});

socket.on('endpoint', ep => {
    endpoint = ep;
    console.log("Endpoint changed to " + ep);
    inputLine.children[1].innerText = ep;
})

socket.on('not valid', (data) => {
    console.log("Answer is not valid.");
    document.querySelector("#challenge").classList = "notvalid";
    let divToAdd = document.createElement('div');
    divToAdd.classList = 'line';
    divToAdd.innerHTML = "<er>$ " + data + "</er>";
    document.body.appendChild(divToAdd);
    document.body.appendChild(inputLine);

    input.focus();
});

socket.on('valid', (data) => {
    console.log("Answer is valid.");
    document.querySelector("#challenge").classList = "valid";
    challengeID += 1;
    document.querySelector("#challenge").innerHTML = "<h3>challenge n°" + challengeID + "</h3><p>" + challenges[challengeID] + "</p>";

    if (data.length >= 1) {
        let divToAdd = document.createElement('div');
        divToAdd.classList = 'line';
        divToAdd.innerHTML = "$ " + data;
        document.body.appendChild(divToAdd);
        document.body.appendChild(inputLine);

        input.focus();
    }
});

socket.on('end', data => {
    window.location.replace(data);
});
