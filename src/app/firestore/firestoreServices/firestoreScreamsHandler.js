import firebase from '../../config/firebase';

const db = firebase.firestore();

export function fetchScreamsFromFirestore(limit, lastDocSnapshot = null) {
  // const user = firebase.auth().currentUser;
//   let next;
  let lastVisible;
  var first = db.collection("screams")
  .orderBy("createdAt", "desc")
  .limit(2);

lastVisible = first.get().then(  (documentSnapshots) => {
// Get the last visible document
  lastVisible =  documentSnapshots.docs[documentSnapshots.docs.length-1];
 console.log("last", lastVisible);
 return  lastVisible
  });
  // console.log(await lastVisible)
//   next = db.collection("screams")
//   .orderBy("createdAt")
//   // .startAfter(lastVisible ? lastVisible : null)
//   .limit(2);
  
//   // console.log(await next.get())
// return next;
console.log("outside", lastVisible);

let screamsRef =  db
    .collection('screams')
    .orderBy('createdAt')
    .startAfter( lastDocSnapshot )
    // .startAfter(lastDocSnapshot ?  lastDocSnapshot :lastVisible )
    .limit(limit);
  return screamsRef;
}


export function listenToScreamFromFirestore(screamId) {
  return db.collection('screams').doc(screamId);
}

export function addScreamToFirestore(scream,imgUrlList) {
  const user = firebase.auth().currentUser;
  return db.collection('screams').add({
    ...scream,
    createdAt: new Date(),
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    screamImages:[...imgUrlList]
  });
}

export function updateScreamInFirestore(scream,imgUrlList) {
  // console.log(scream);
  scream = {...scream, screamImages: [...scream.screamImages,...imgUrlList]}
  return db.collection('screams').doc(scream.id).update(scream);
}

export function deleteScreamInFirestore(screamId) {
  return db.collection('screams').doc(screamId).delete();
}

export async function updateScreamPhoto(downloadURL, filename, screamId,screamImages) {
  try {
    console.log({screamImages})
    let scream = await (await db.collection('screams').doc(screamId).get()).data();
    console.log({scream})
    // addScreamToFirestore(scream, downloadURL)
      let screamData = db
      .collection('screams')
      .doc(screamId)
      // .collection('photos')
      .update({
       screamImages: (scream.screamImages && scream.screamImages.length > 0) ? [...scream.screamImages,downloadURL] : [downloadURL] 
      //  screamImages: [...screamImages]
      });
      screamData = await screamData.get().data();
      console.log({screamData});
      return screamData
  } catch (error) {
    throw error;
  }
}

export function getScreamPhotos(screamId) {
  return db.collection('screams').doc(screamId).collection('photos');
}

// Like scream 
export const likeScreamService =  async (scream)  =>  {
  const user = firebase.auth().currentUser;
  console.log({user})
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", user.uid,)
    .where("screamId", "==", scream.id)
    .limit(1);

    const screamDocument = db.doc(`/screams/${scream.id}`);
    let screamData;

    screamDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          screamData = doc.data();
          // screamData.screamId = doc.id;
          screamData.likeCount = screamData.likeCount ? screamData.likeCount : 0 ;
          console.log(  "likeDocument",likeDocument.get())
          return likeDocument.get();
        } else {
          return ({ error: "Scream not found" });
        }
      })
      .then((data) => {
        console.log({data})
        if (data.empty) {
          return db
            .collection("likes")
            .add({
              screamId: scream.id,
              userHandle: user.uid,
            })
            .then(() => {
              screamData.likeCount++;
           console.log({screamData})
               return screamDocument.update({ likeCount: screamData.likeCount });
              
            })
             .then(() => {
          console.log("screamDoc",screamData);
         return screamData;
        });
        } else {
          console.log({error: "Scream already liked"})
          return ({ error: "Scream already liked" });
        }
      })
      .catch((err) => {
        console.error(err);
        return ({ error: err.code });
      });
}



// Unlike Scream 
export function unLikeScreamService(scream) {
  const user = firebase.auth().currentUser;

  const likeDocument = db
  .collection("likes")
  .where("userHandle", "==", user.uid )
  .where("screamId", "==",  scream.id)
  .limit(1);

const screamDocument = db.doc(`/screams/${scream.id}`);

let screamData;

screamDocument
  .get()
  .then((doc) => {
    if (doc.exists) {
      screamData = doc.data();
      // screamData.screamId = doc.id;
      return likeDocument.get();
    } else {
      return ({ error: "Scream not found" });
    }
  })
  .then((data) => {
    if (data.empty) {
      return ({ error: "Scream not liked" });
    } else {
      console.log("unlikeData",data)
      return db
        .doc(`/likes/${data.docs[0].id}`)
        .delete()
        .then(() => {
          screamData.likeCount--;
           console.log({screamData})
           return screamDocument.update({ likeCount: screamData.likeCount });
           
        })
        .then(() => {
          console.log("screamDoc",screamData);
         return screamData;
        });
    }
  })
  .catch((err) => {
    console.error(err);
    return({ err });
  });
}    

export function fetchLikes () {
  let likesRef = db
    .collection('likes')
    return likesRef
}