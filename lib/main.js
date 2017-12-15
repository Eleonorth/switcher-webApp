function FindNbHost( cidr ) {
    var i = 1;
    var NbHoteBit = 32 - cidr;
    while (NbHoteBit != 0) {
        i *= 2;
        NbHoteBit--;
    }
    return i;
}

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

function GimeIpDec( tab ) {
    var i = 0;
    var result = [];
    while (tab[i]) {
        result.push(ConvertDec(tab[i]));
        i++;
    }
    return result;
}

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

$(document).ready(function(){
    $('#calc').click(function( e ) {
        e.preventDefault();
        var ipbrut = $('#ip').val();
        var ipfin = ipbrut.split('/')[0];
        var cidr = ipbrut.split('/')[1];

        var CompareTab = [];
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
        LastIp =  GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        LastIp[3] += FindNbHost(cidr) - 2;
        MaskDec = GimeIpDec(CutMyBigBin(CompareTab[0]));
        Bdcast = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        Bdcast[3] += FindNbHost(cidr) - 1;
        console.log(NetId);
        console.log(MaskDec);
        console.log(Bdcast);
        console.log(FirstIp);
        console.log(LastIp);
    });
});