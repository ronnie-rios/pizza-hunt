//create a variable to hold the db connection
let db;
//establish a connecation to IndexedDB database called pizza hunt
const request = indexedDB.open('pizza_hunt', 1)

//this event will emit if athe db version changes
request.onupgradeneeded = function(event) {
    //save a ref to db
    const db = event.target.result;
    //create an object store(index db version of table) and set ti to have auto inc
    db.createObjectStore('new_pizza', {autoIncrement: true });
}

//succesful
request.onsuccess = function(event) {
    db = event.target.result;
    //check if app is online, if yes run upload to send all data
    if (navigator.onLine) {
        uploadPizza();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode)
};

//this fucntion will be executed if we attempt to submit a new pizza
function saveRecord(record) {
    //opens a new transaction with the db with read and write permission
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //access the object store for new_pizza
    const pizzaObjectStore = transaction.objectStore('new_pizza');
    //add record to your store with add method
    pizzaObjectStore.add(record)
};

function uploadPizza() {
     //opens a new transaction with the db with read and write permission
     const transaction = db.transaction(['new_pizza'], 'readwrite');

     //access the object store for new_pizza
     const pizzaObjectStore = transaction.objectStore('new_pizza');

     //get all records from store ad set to a variable
     const getAll = pizzaObjectStore.getAll();

     // upon a successful .getAll() execution, run this function
getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/pizzas', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_pizza'], 'readwrite');
          // access the new_pizza object store
          const pizzaObjectStore = transaction.objectStore('new_pizza');
          // clear all items in your store
          pizzaObjectStore.clear();

          alert('All saved pizza has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}

window.addEventListener('online', uploadPizza);