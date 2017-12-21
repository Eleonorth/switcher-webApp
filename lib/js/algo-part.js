// On trouve le nombre d'hôtes

function FindNbHost( cidr ) {
    var i = 1;
    var NbHoteBit = 32 - cidr;
    while (NbHoteBit !== 0) {
        i *= 2;
        NbHoteBit--;
    }
    return i;
}

// On récupère le masque en binaire (sous forme 32bits) depuis le CIDR

function GetBinMask(cidr) {
    var i = 0;
    var mask = '';
    while (i < 32) {
        if (i < cidr)
            mask += '1';
        else
            mask += '0';
        i++;
    }
    return mask;
}

// Fonction de conversion d'un nombre décimal <= 255 en octet (BINAIRE)

function ConvertBin(nbr) {
    var i = 128;
    var result = '';
    while(i >= 1) {
        if (nbr >= i) {
            nbr -= i;
            result += '1';
        }
        else
            result += '0';
        i /= 2;
    }
    return result;
}

// On récupère l'adresse ip sous la forme décimale pointée w.x.y.z et on la convertit en binaire sans les "."

function TransformIp(ipfin) {
    var TableauMembreIp = ipfin.split('.');
    var result = '';
    var i = 0;
    var j = 0;
    while (TableauMembreIp[i]) {
        result += ConvertBin(TableauMembreIp[i]);
        i++;
        j++;
    }
    return result;
}

// On applique le ET LOGIQUE sur l'adresse ip rentrée par l'user

function EtLogique (TableauDesIpEnBinaire) {
    var result = '';
    var i = 0;
    var j = 0;
    while (TableauDesIpEnBinaire[0][i] && TableauDesIpEnBinaire[1][i]) {
        if (TableauDesIpEnBinaire[0][i] === '1' && TableauDesIpEnBinaire[1][i]=== '1')
            result += '1';
        else
            result += '0';
        i++;
    }
    return result;
}

//On convertit un octet binaire en décimal

function ConvertDec(octet) {
    var puissance = 128;
    var i = 0;
    var resultat = 0;
    while (octet[i]){
        if (octet[i] === '1')
            resultat += puissance;
        puissance /= 2;
        i++;
    }
    return resultat;
}

//On convertit l'ip binaire en tableau d'octets décimaux.

function GimeIpDec( tab ) {
    var i = 0;
    var result = [];
    while (tab[i]) {
        result.push(ConvertDec(tab[i]));
        i++;
    }
    return result;
}

//On split l'ip binaire et on ajoute les points pour obtenir le format "xxxxxxxx.xxxxxxxx.xxxxxxxx.xxxxxxxxé

function CutMyBigBin( binaire ) {
    var i, j;
    var resultat = '';
    i = 0;
    j = 0;
    while(binaire[i]) {
        if (j === 8){
            resultat += '.';
            j = 0;
        }
        resultat += binaire[i];
        i++;
        j++;
    }
    resultat = resultat.split('.');
    return resultat;
}

/* Fonction qui créer d'une IP 192.168.512.265 une IP "valide", 192.170.1.10 */
function Scope( ipfalse ) {
    var index, number_add;
    // Ici on se place au dernier index de notre tableau IP
    index = 3;
    number_add = 0;
    // Tant qu'on a pas parcourut tout le tableau
    while (index >= 0) {
        // Si le tableau au rang index est trop grand
        if (ipfalse[index] > 255) {
            // Tant que le rang du tableau n'est pas valide
            while (ipfalse[index] > 255) {
                // On lui enleve 256 et on stock ce qu'on va ajouter dans number_add
                ipfalse[index] -= 256;
                number_add++;
            }
            // On ajoute au rang N-1 number add
            ipfalse[index - 1] += number_add;
        }
        // On change d'index
        index--;
        // On réinitialise notre compteur
        number_add = 0;
    }
    return ipfalse;
}