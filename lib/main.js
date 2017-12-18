/*
--------------- Switcher web-app -----------------

Created by :    Anathole Piveteau,
                Eleonore Dehombreux,
                Killiann Hervagault,
                François Gazaube,
                Clémence Briteau,
                   Dylan Lalande

                    ＼(￣▽￣)/
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


function octetLength(ip1,ip2,ip3,ip4, cidr) {

    if ((ip1 > 255 || ip2 > 255 || ip3 > 255 || ip4 > 255 || cidr > 32)){
        isAlerted = true;
        alert("Votre octet est trop grand. Veuillez entrer un nombre entre 0 et 255");
        $('.ipfield').text("");

    }

}


// Fonction qui retourne la classe d'une adresse IP selon son masque CIDR

function ipClass(ip1, ip2, cidr) {

    var classeA= "L'adresse ip est une adresse de classe A"
    var classeB= "L'adresse ip est une adresse de classe B"
    var classeC= "L'adresse ip est une adresse de classe C"
    var classLess= "L'adresse ip est une adresse class less"

    if ((ip1 == 10) && (cidr == 8)) {
        
        return classeA;
    }

    else if ((ip1==172) && (ip2 >= 16 && ip2 <=31) && (cidr == 16)) {
        
        return classeB;   
         }

    else if ((ip1 == 192) && (ip2 == 168) && (cidr == 24)){

        return classeC }

    else {
        return classLess;
        }

}


// Fonction qui teste si l'IP entrée par l'utilisateur est privée
function isPrivate(ip1, ip2) {

    if (ip1 == 10) {
        return true;
    }

    else if ((ip1==172) && (ip2 >= 16 && ip2 <=31)) {
        
        return true;   
         }

    else if ((ip1 == 192) && (ip2 == 168)) {

        return true; }

    else if (isAlerted === false) {

        alert("Votre IP n'est pas privée, vous ne pouvez pas l'utiliser.");
        return false; }

        else {
            return false;
        }

}

$(document).ready(function(){

    

    $('#calc').click(function( event ) {

            event.preventDefault();

        var ip1 = $('#ip1').val();
        var ip2 = $('#ip2').val();
        var ip3 = $('#ip3').val();
        var ip4 = $('#ip4').val();
        var cidr = parseInt($('#cidr').val());

        
        // Test Class A
        
        octetLength(ip1,ip2,ip3,ip4, cidr); 

        if (isPrivate(ip1,ip2) == true) {
            
        

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

            MaskDec = GimeIpDec(CutMyBigBin(CompareTab[0]));
            Bdcast = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));

            //On bidouille le nbHost... il va falloir faire des tests ici
            Bdcast[3] += FindNbHost(cidr) - 1;
            classeIp= ipClass(ip1,ip2, cidr);

            //Affichage
            console.log(NetId);
            console.log(MaskDec);
            console.log(Bdcast);
            console.log(FirstIp);
            console.log(LastIp);
            console.log(classeIp);
                
    
        }
    });
});