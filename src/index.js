import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc, doc
} from 'firebase/firestore'
import CONFIG from '../env'
console.log(CONFIG.CONFIG)
initializeApp(CONFIG.CONFIG)


const db = getFirestore()
const colRef = collection(db, 'books')

const addBookFor = document.getElementById("add")
addBookFor.addEventListener('submit', (e)=>{
    e.preventDefault()
    addDoc(colRef, {
        title: addBookFor.title.value,
        author:addBookFor.author.value
    })
        .then(()=>{
            addBookFor.reset()
        })
})
const deleteBookFor =  document.getElementById("delete")
deleteBookFor.addEventListener('submit', (e)=>{
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookFor.id.value)
    deleteDoc(docRef)
        .then(()=>{
            deleteBookFor.reset()
        })})

// Old way to get data that you have to refresh after the data received
// getDocs(colRef)
//     .then((snapshot) => {
//       let books = snapshot.docs.map(d => {
//         return {
//           ...d.data(), id:
//           d.id
//         }
//       })
//       console.log(books)
//     })

// real time collection data (update automatically the data one delete and post)
onSnapshot(colRef, (snapshot)=>{
      let books = snapshot.docs.map(d => {
        return {
          ...d.data(), id:
          d.id
        }
      })
          console.log(books)

})
