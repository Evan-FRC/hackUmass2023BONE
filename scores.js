var redScore = 1;
var blueScore = 1;
let strings = ["blue1", "blue2", "blue3", "red1", "red2", "red3"];
let playerXNotScanned = ["blue1", "blue2", "blue3", "red1", "red2", "red3"];
function qrScanned(qrString){
    const indexScanned = playerXNotScanned.indexOf(qrString);
    if (indexScanned >= 0){
        if (qrScanned.substring(0, 1) == "b" && playerColor == "Blue"){ 
            blueScore = blueScore + 1;
            playerXNotScanned.splice(indexScanned);
        }
        else if (qrScanned.substring(0, 1) == "r" && playerColor == "Red"){ 
            redScore = redScore + 1;
            playerXNotScanned.splice(indexScanned);
        }
    }
}