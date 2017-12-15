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

// On récupère l'adresse ip sous la forme w.x.y.z et on la convertir en binaire sans les "."

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

// On applique le et logique sur l'adresse ip rentrée par l'user

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

//Le main jQuery
// Var1 = ip1
// Var2 = ip2
// Var3 = ip3
// Var4 = ip4
// Var5 = cidr
// ip1.ip2.ip3.ip4/cidr
/* Ip privé :
    * _ 10.0.0.0 <-> 126.0.0.0
    * _ 172.16.0.0 <-> 172.31.255.254
    * _ 192.168.0.0 <-> 192.168.255.254
* APIPA :
* _ 127.0.0.X
* _ 169.254.X.X
*
    */
function ExceptClassA() {

}

$(document).ready(function(){
    $('#calc').click(function( event ) {

            event.preventDefault();

        var ip1 = $('#ip1').val();
        var ip2 = $('#ip2').val();
        var ip3 = $('#ip3').val();
        var ip4 = $('#ip4').val();
        var cidr = $('#cidr').val();

        // Test Class A
        ExceptClassA();

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

        //Affichage
        console.log(NetId);
        console.log(MaskDec);
        console.log(Bdcast);
        console.log(FirstIp);
        console.log(LastIp);
    });
});