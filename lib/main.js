


$(document).ready(function () {
    // Calcul du nombre d'hote contenu dans la plage IP.
    function NbHote(cidr) {
        var i = 0;
        var j = 1;
        // Tant que i est inférieur a 32 - CIDR
        while (i < (32 - cidr)) {
            j *= 2;
            i++;
        }
        // ON RETOURNE 2 ^ 32-CIDR
        return j;
    }

    function NetID(NbHote, newip, adip) {
        if (NbHote < 256) {
            console.log("ICI"+adip[3]);
            console.log(adip);
            while ((newip[3] + NbHote) < adip[3])
            {
                newip[3] += NbHote;
                console.log("A");
            }
            console.log("ICI"+newip[3]);
        }
        else {
            while ((newip[2] != adip[2]) && (newip[3] + NbHote < adip[3]))
            {
                newip[3] += NbHote;
                if (newip[3] >= 256) {
                    newip[2]++;
                    newip[3] = newip[3] % 256;
                }
            }
        }
        return newip;
    }

    // Pourquoi ne pas calculer le netID grâce au ETLOGIQUE avec l'adresse ip donnée et le masque de sous réseau en binaire? Plus simple, moins de risque d'erreurs

// function convBinaire (adrip){

//     arip = adrip.split('.')
//     console.log(arip)
//     var j = 0
//     var i = 128
//     var res = []

//     while (j < 4) {

//         while (i >= 1) {
//             if (arip[j] >= i) {
                
//                 arip[j] -= i
//                 res.push(1)
//                 i /= 2
//             }

//             else {
//                 res.push(0)
//                 i /= 2
//             }
        
//         }
        
//         j ++
//         return res
                
//     }

// }

// console.log(convBinaire("192.168.0.61"));



    $('#calc').click(function (event) {
        var adip = $("#ip").val();
        var cidr = $("#cidr").val();
        var array_ip = adip.split('.');
        var newip = [];
        if (NbHote(cidr) < 256)
            newip.push(array_ip[0], array_ip[1], array_ip[2], 0);
        else
            newip.push(array_ip[0], array_ip[1], 0, 0);
        console.log(NbHote(cidr));
        console.log(NetID(NbHote(cidr), newip, array_ip));
        event.preventDefault();
    });
});