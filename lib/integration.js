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
