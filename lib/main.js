/*
--------------- Switcher web-app -----------------

Created by :    Anathole Piveteau,
                Eleonore Dehombreux,
                Killiann Hervagault,
                François Gazaube,
                Clémence Briteau,
                   Dylan Lalande

                    \(__)/
 -------------------------------------------------
 */

var isAlerted = false;

// On commence par trouver le nombre d'hôtes

function FindNbHost( cidr ) {
    var i = 1;
    var NbHoteBit = 32 - cidr;
    while (NbHoteBit != 0) {
        i *= 2;
        NbHoteBit--;
    }
    return i;
}

// On convertit le cidr en binaire

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

// On convertit un décimal en binaire

function ConvertBin(nbr) {
    var i = 128;
    var result = '';
    while(i >= 1) {
        if (nbr >= i) {
            nbr -= i;
            result += '1';
        }
        else {
            result += '0';
        }
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
    /*
        0 -> Masque en binaire
        1 -> Ip en binaire
    */
    var result = '';
    var i = 0;
    var j = 0;
    while (TableauDesIpEnBinaire[0][i] && TableauDesIpEnBinaire[1][i]) {
        if (TableauDesIpEnBinaire[0][i] == '1' && TableauDesIpEnBinaire[1][i] == '1')
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
        if (octet[i] == '1')
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
        if (j == 8){
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


// Fonction qui vérifie si les champs sont remplis

function isEmpty(ip1,ip2,ip3,ip4) {

    if (ip1=="" || ip2=='' || ip3=='' || ip4=='') {
        isAlerted = true;
        alert("Veuillez remplir tous les champs");

    }

}


// Fonction qui prévient l'utilisateur que l'octet entré est supérieur à 255

function octetLength(ip1,ip2,ip3,ip4, cidr) {

    if ((ip1 > 255 || ip2 > 255 || ip3 > 255 || ip4 > 255 )){
        isAlerted = true;
        $('.ipfield').val('');
        alert("Votre octet est trop grand. Veuillez entrer un nombre entre 0 et 255");


    }
    else if(cidr > 32){
        isAlerted = true;
        $('.ipfield').val('');
        alert("Votre masque CIDR doit être compris entre 1 et 31.");
    }
}


// Fonction qui retourne la classe d'une adresse IP selon son masque CIDR

function ipClass(ip1, cidr) {

    var classeA= "L'adresse ip est une adresse de classe A"
    var classeB= "L'adresse ip est une adresse de classe B"
    var classeC= "L'adresse ip est une adresse de classe C"
    var classLess= "L'adresse ip est une adresse class less"

    if ((ip1 >= 1 && ip1 <127) && (cidr == 8)) {

        return classeA;
    } 

    else if ((ip1 >= 128 && ip1 < 192) && (cidr == 16)) {

        return classeB;
    }

    else if ((ip1 >= 192 && ip1 < 224) && (cidr == 24)){

        return classeC }

    else {
        return classLess;
    }

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


// Attribuer un masque cidr par défaut si l'utilisateur n'en rentre pas
function defaultCidr(ip1,cidr) {

    if (cidr=='') {

        if (ip1 >= 1 && ip1 <127) {

            cidr =8;
            $('#cidr').val('8');

        }

        else if (ip1 >= 128 && ip1 < 192) {

            cidr =16;
            $('#cidr').val('16');
        }

        else if (ip1 >= 192 && ip1 < 224) {

            cidr =24;
            $('#cidr').val('24');
        }

    }

    if (cidr==32) {

        isAlerted = true;
        alert("CIDR impossible !");
    }

    return cidr;
}


// Fonction qui teste si il y a des lettres et envoie un message
function VerifNbr(Ip) {

    var i = 0;
    var j = 0;
    var valide = 0;
    var nbrvalide = '0123456789';
    while (Ip[i]) {
        while (nbrvalide[j] && valide == 0 ) {
            if (Ip[i] == nbrvalide[j])
                valide = 1;
            j++;
        }

        if (valide == 0) {
            isAlerted = true;
            alert('Veuillez entrer un nombre ! ');
            return;
        }
        valide = 0;
        i++;
        j = 0;
    }


    return true;
}


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

    privateClass = " L'adresse ip est une adresse privée"
    publicClass = "L'adresse ip est une adresse publique"


    if (ip1 == 10) {
        return privateClass;
    }

    else if ((ip1==172) && (ip2 >= 16 && ip2 <=31)) {

        return privateClass;
    }

    else if ((ip1 == 192) && (ip2 == 168)) {

        return privateClass; }

    else {

        return publicClass;
         }

}

$(document).ready(function(){



    $('#calc').click(function( event ) {
        event.preventDefault();
        var ip1 = $('#ip1').val();
        var ip2 = $('#ip2').val();
        var ip3 = $('#ip3').val();
        var ip4 = $('#ip4').val();
        var cidr = $('#cidr').val();
        var stop = false;
        cidr = defaultCidr(ip1,cidr);

        // On vérifie si l'utilisateur a bien rentré une adresse IP et si la taille des octets est bonne
        (isAlerted) ? stop = true : isEmpty(ip1,ip2,ip3,ip4);
        (isAlerted) ? stop = true : octetLength(ip1,ip2,ip3,ip4, cidr);
        (isAlerted) ? stop = true : VerifNbr(ip1+ip2+ip3+ip4+cidr);
        (isAlerted) ? stop = true : isAvailable(ip1,ip2,ip3,ip4);
        if (isAlerted == true){ 
            isAlerted = false;
            stop = false;
            return ;
        }
        // Si l'adresse IP entrée par l'utilisateur est privée, on lance les fonctions
        var ipbrut = ip1+"."+ip2+"."+ip3+"."+ip4+"/"+cidr;
        var ipfin = ipbrut.split('/')[0]; // On split en 2 parties avec le séparateur.
        var CompareTab = [];
        //Déclarations, c'est pas utile en JS mais bon
        var NetId = [];
        var MaskDec = [];
        var Bdcast = [];
        var FirstIp = [];
        var LastIp = [];
        CompareTab.push(GetBinMask(cidr));
        CompareTab.push(TransformIp(ipfin));
        NetId = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        FirstIp = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        FirstIp[3] += 1;
        //On bidouille le dernier octet... il va falloir faire des tests ici
        LastIp =  GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        LastIp[3] += FindNbHost(cidr) - 2;
        LastIp = Scope(LastIp);
        MaskDec = GimeIpDec(CutMyBigBin(CompareTab[0]));
        Bdcast = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        //On bidouille le nbHost... il va falloir faire des tests ici
        Bdcast[3] += FindNbHost(cidr) - 1;
        Bdcast = Scope(Bdcast);
        classeIp= ipClass(ip1,cidr);
        typeIp = isPrivate(ip1,ip2);
        NbHote = FindNbHost(cidr) - 2;
        //Affichage
        /*
        $('#resultClasse').text(classeIp);
        $('#resultType').text(typeIp);
        $('#resultNetID').text(NetId[0]+"."+NetId[1]+"."+NetId[2]+"."+NetId[3]+"/"+cidr);
        $('#resultMasque').text(MaskDec[0]+"."+MaskDec[1]+"."+MaskDec[2]+"."+MaskDec[3]);
        $('#resultPremierIP').text(FirstIp[0]+"."+FirstIp[1]+"."+FirstIp[2]+"."+FirstIp[3]+"/"+cidr);
        $('#resultNbIP').text(NbHote);
        $('#resultDernierIP').text(LastIp[0]+"."+LastIp[1]+"."+LastIp[2]+"."+LastIp[3]+"/"+cidr);
        $('#resultBroadcast').text(Bdcast[0]+"."+Bdcast[1]+"."+Bdcast[2]+"."+Bdcast[3]+"/"+cidr);
        */

        DoFade(classeIp, typeIp, NetId, FirstIp, LastIp, Bdcast, NbHote, MaskDec, cidr);

    });
});