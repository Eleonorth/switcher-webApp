// Fonction qui vérifie si les champs sont remplis

function isEmpty(ip1,ip2,ip3,ip4) {
    if (ip1 === '' || ip2 === '' || ip3 === '' || ip4 === '') {
        isAlerted = true;
        alert("Veuillez remplir tous les champs");
    }
}


// Fonction qui prévient l'utilisateur que l'octet entré est supérieur à 255

function octetLength(ip1,ip2,ip3,ip4, cidr) {

    if ((ip1 > 255 || ip2 > 255 || ip3 > 255 || ip4 > 255 )){
        isAlerted = true;
        alert("Votre octet est trop grand. Veuillez entrer un nombre entre 0 et 255");


    }
    else if(cidr > 32){
        isAlerted = true;
        alert("Votre masque CIDR doit être compris entre 1 et 31.");
    }
}

// Fonction qui teste si il y a des lettres et envoie un message
function VerifNbr(Ip) {
    var i = 0;
    var j = 0;
    var valide = 0;
    var nbrvalide = '0123456789';
    while (Ip[i]) {
        while (nbrvalide[j] && valide === 0 ) {
            if (Ip[i] === nbrvalide[j])
                valide = 1;
            j++;
        }
        if (valide === 0) {
            isAlerted = true;
            alert('Veuillez entrer un nombre entier positif');
            return;
        }
        valide = 0;
        i++;
        j = 0;
    }
    return true;
}

// Fonction de vérification si l'adresse IP entrée est disponible pour le calcul
function isAvailable(ip1,ip2,ip3,ip4) {
    if (ip1 == 0) {
        isAlerted= true;
        alert('Adresse indisponible');
        return false;
    }
    else if (ip1 == 127) {
        isAlerted = true;
        alert("Adresse indisponible : Loopback");
        return false;

    }
    else if(ip1==169 && ip2==254){
        isAlerted=true;
        alert("Adresse indisponible : APIPA");
        return false;
    }
    else if(ip1 >= 224) {
        isAlerted=true;
        if (ip1 == 255 && ip2 == 255 && ip3 == 255 && ip4 == 255)
            alert("Adresse indisponible : Broadcast");
        else
            alert("Adresse indisponible : Classe D Multicast");
        return false;
    }
    return true;
}

// Fonction qui teste si l'IP entrée par l'utilisateur est privée ou publique
function isPrivate(ip1, ip2) {
    privateClass = " L'adresse ip est une adresse privée";
    publicClass = "L'adresse ip est une adresse publique";
    if (ip1 == 10)
        return privateClass;
    else if ((ip1==172) && (ip2 >= 16 && ip2 <=31))
        return privateClass;
    else if ((ip1 == 192) && (ip2 == 168))
        return privateClass;
    else
        return publicClass;
}