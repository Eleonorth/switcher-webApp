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
    $('#resultNetID').text(NetId[0]+"."+NetId[1]+"."+NetId[2]+"."+NetId[3]+"/"+cidr);
    $('#resultMasque').text(MaskDec[0]+"."+MaskDec[1]+"."+MaskDec[2]+"."+MaskDec[3]);
    $('#resultPremierIP').text(FirstIp[0]+"."+FirstIp[1]+"."+FirstIp[2]+"."+FirstIp[3]+"/"+cidr);
    $('#resultNbIP').text(NbHote);
    $('#resultDernierIP').text(LastIp[0]+"."+LastIp[1]+"."+LastIp[2]+"."+LastIp[3]+"/"+cidr);
    $('#resultBroadcast').text(Bdcast[0]+"."+Bdcast[1]+"."+Bdcast[2]+"."+Bdcast[3]+"/"+cidr);

    $('#res1').fadeIn(500);
    $('#res2').delay(150).fadeIn(500);
    $('#res3').delay(250).fadeIn(500);
    $('#res4').delay(350).fadeIn(500);
    $('#res5').delay(450).fadeIn(500);
    $('#res6').delay(550).fadeIn(500);
    $('#res7').delay(650).fadeIn(500);
    $('#res8').delay(750).fadeIn(500);

}

$(document).ready(function(){
    $('#res1').hide();
    $('#res2').hide();
    $('#res3').hide();
    $('#res4').hide();
    $('#res5').hide();
    $('#res6').hide();
    $('#res7').hide();
    $('#res8').hide();

    $('.ipfield').click(function(){
        $('#res1').hide();
        $('#res2').hide();
        $('#res3').hide();
        $('#res4').hide();
        $('#res5').hide();
        $('#res6').hide();
        $('#res7').hide();
        $('#res8').hide();



    });
});
