var isRectified = false;

$(document).ready(function(){
    // Fonction pour le link-scrolling
    $('a[href^="#"]').click(function(){
        var the_id = $(this).attr("href");
        if (the_id == "#demo")
            return;
        $('html, body').animate({
            scrollTop:$(the_id).offset().top
        }, 'slow');
        return false;
    });

    // Fonction principal d'execution de notre calcul
    $('#calc').click(function( event ) {
        event.preventDefault();
        var ip1 = $('#ip1').val();
        var ip2 = $('#ip2').val();
        var ip3 = $('#ip3').val();
        var ip4 = $('#ip4').val();
        var cidr = $('#cidr').val();
        var stop = false;
        cidr = defaultCidr(ip1,cidr);
        // Commencement des vérifications nécessaires pour le calcul d'adressage IP
        // Ici on test si les blocs ont bien été renseignés
        (isAlerted) ? stop = true : isEmpty(ip1,ip2,ip3,ip4);
        // Ici on test si les valeurs des blocs sont bien inferieur a 256 et 32 pour le CIDR
        (isAlerted) ? stop = true : octetLength(ip1,ip2,ip3,ip4, cidr);
        // Ici on test si ce sont bien uniquement des nombres qui ont été renseignés
        (isAlerted) ? stop = true : VerifNbr(ip1+ip2+ip3+ip4+cidr);
        // Ici on test si l'adresse IP est valide pour notre calcul
        (isAlerted) ? stop = true : isAvailable(ip1,ip2,ip3,ip4);
        // Si il y a une erreur
        if (isAlerted == true){
            // Dans le cas où il y a une erreur on masque les divs Résultats
            $('#res1').hide();
            $('#res2').hide();
            $('#res3').hide();
            $('#res4').hide();
            $('#res5').hide();
            $('#res6').hide();
            $('#res7').hide();
            $('#res8').hide();
            isAlerted = false;
            stop = false;
            // On quitte le calcul
            return ;
        }
        // L'IP est valide, donc on peut calculer
        // Ont force l'apparition des divs Résultat
        $('#res1').show();
        $('#res2').show();
        $('#res3').show();
        $('#res4').show();
        $('#res5').show();
        $('#res6').show();
        $('#res7').show();
        $('#res8').show();

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
        //On convertit les valeurs du masque et de l'adresse IP saisit en binaire de 32 bits
        CompareTab.push(GetBinMask(cidr));
        CompareTab.push(TransformIp(ipfin));
        // On récupère tout les résultats nécessaires
        // Premierement on applique le ET LOGIQUE pour avoir le NetID et la première IP disponible
        NetId = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        FirstIp = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        FirstIp[3] += 1;
        // On se sert du NetID et du nombre d'hôte pour avoir la dernière adresse IP valide
        LastIp =  GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        LastIp[3] += FindNbHost(cidr) - 2;
        // On convert l'adresse ip de type 192.168.0.1024 en 192.168.4.0
        LastIp = Scope(LastIp);
        MaskDec = GimeIpDec(CutMyBigBin(CompareTab[0]));
        // On récupère l'IP du Broadcast grâce a celle du NetId et du nombre d'hôte
        Bdcast = GimeIpDec(CutMyBigBin(EtLogique(CompareTab)));
        Bdcast[3] += FindNbHost(cidr) - 1;
        Bdcast = Scope(Bdcast);
        classeIp= ipClass(ip1,cidr);
        typeIp = isPrivate(ip1,ip2);
        NbHote = FindNbHost(cidr) - 2;
        //Affichage
        DoFade(classeIp, typeIp, NetId, FirstIp, LastIp, Bdcast, NbHote, MaskDec, cidr);

    });

    // User friendly stuff Here

    $('.ipfield').click(function( event ) {
        if (isRectified == true)
        {
            console.log("bibi");
            jQuery(function () {
                jQuery('#calc').click();
                isRectified = false;
            });
        }
        if(isAlerted == true && isRectified==false)
        {
            return;

        }
    });

});