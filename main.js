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

//////////////////////////////////////////////////// Display Here //////////////////////////////////////////////////

function DoFade(classeIp, typeIp, NetId, FirstIp, LastIp, Bdcast, NbHote, MaskDec, cidr) {
    $('#resultClasse').text(classeIp);
    $('#resultType').text(typeIp);
    $('#resultNetID').text(NetId[0] + "." + NetId[1] + "." + NetId[2] + "." + NetId[3] + "/" + cidr);
    $('#resultMasque').text(MaskDec[0] + "." + MaskDec[1] + "." + MaskDec[2] + "." + MaskDec[3]);
    $('#resultPremierIP').text(FirstIp[0] + "." + FirstIp[1] + "." + FirstIp[2] + "." + FirstIp[3] + "/" + cidr);
    $('#resultNbIP').text(NbHote);
    $('#resultDernierIP').text(LastIp[0] + "." + LastIp[1] + "." + LastIp[2] + "." + LastIp[3] + "/" + cidr);
    $('#resultBroadcast').text(Bdcast[0] + "." + Bdcast[1] + "." + Bdcast[2] + "." + Bdcast[3] + "/" + cidr);
}

// Fonction qui retourne la classe d'une adresse IP selon son masque CIDR

function ipClass(ip1, cidr) {
    var classeA= "L'adresse ip est une adresse de classe A";
    var classeB= "L'adresse ip est une adresse de classe B";
    var classeC= "L'adresse ip est une adresse de classe C";
    var classLess= "L'adresse ip n'a pas de classe";
    if ((ip1 >= 1 && ip1 <127) && (cidr == 8))
        return classeA;
    else if ((ip1 >= 128 && ip1 < 192) && (cidr == 16))
        return classeB;
    else if ((ip1 >= 192 && ip1 < 224) && (cidr == 24))
        return classeC;
    else
        return classLess;
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