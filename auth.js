const auth = firebase.auth();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

signInButton.onclick = () => auth.signInWithPopup(provider);
signOutButton.onclick = () => auth.signOut();

unsubscribe = undefined;
unsubscribe2 = undefined;
auth.onAuthStateChanged(async user => {
    if (user) {
        // signed in
        var pointsref = db.collection("points");
        if (await pointsref.doc(user.uid).get().then((doc) => {
            return doc.data();
        }) == undefined) {
            pointsref.doc(user.uid).set({
                uid: user.uid,
                points: 0,
                team: Math.random() > 0.5 ? "Red" : "Blue",
                finishedCodes: []
            });
        }
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        unsubscribe = pointsref.doc(user.uid).onSnapshot(querySnapshot => {
            userDetails.innerHTML = `<p>Your name: ${user.displayName}</p>
            <p>Your points: ${querySnapshot.data().points}</p>`;
        });
        unsubscribe2 = pointsref.doc(user.uid).onSnapshot(querySnapshot => {
              document.getElementById("opener").innerHTML = "You are on team " + querySnapshot.data().team + ". Use the clues to find QR codes around campus. ";
        });
    } else {
        // signed out
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        unsubscribe && unsubscribe();
        unsubscribe2 && unsubscribe();
    }
});

/*
var userPoints = await pointsref.doc(user.uid).get().then((doc) => {
    return doc.data().points;
});
*/