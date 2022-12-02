import { useEffect, useState } from 'react'
import { collection, doc, query, orderBy, deleteDoc, getDocs, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import app from 'gatsby-plugin-firebase-v9.0'

export const addDoc = async ( colname, addDoc ): Promise<void> => {
  const db = getFirestore(app)
  const docRef = doc(collection(db, colname))
  await setDoc(docRef,
    addDoc,
    { merge: true /* ドキュメントが存在する場合はフィールドを追記 */ }
  )
}

export const updateDoc = async ( colname, updateDoc ): Promise<void> => {
  const db = getFirestore()
  const docRef = doc(db, colname)
  await setDoc(docRef,
    updateDoc,
    { merge: true /* ドキュメントが存在する場合はフィールドを追記 */ }
  ).then(
    () => {}
  ).catch(
    (error) => {
      alert( '文章が長すぎます。' );
    }
  )
}

export const delDoc = async ( colname, id ): Promise<void> => {
  const db = getFirestore()
  const userDocumentRef = doc(db, colname, id)
  await deleteDoc(userDocumentRef);
};

export const getDoc = async ( colname ) => {
  let output = [{}]
  const db = getFirestore()
  await getDocs(collection(db, colname)).then((querySnapshot) => {
    output = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  })
  return output
}

export const getDocOnSnapshot =  ( colname ) => {
  const [output, setOutput] = useState([{}])
  useEffect(() => {
    const db = getFirestore()
    const usersCollectionRef = collection(db, colname)
    const q = query(usersCollectionRef, orderBy("createAt"))
    onSnapshot(q, (querySnapshot) => {
      setOutput(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [colname]);

  return output
}
