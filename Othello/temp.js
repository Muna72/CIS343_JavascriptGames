// JavaScript Document

var db = firebase.database();
var rootRef = db.ref();
//friendRef = rootRef.child(“friend”);

rootRef.on('child_added', addTable);
rootRef.on('child_removed', removeRow);
rootRef.on('value', addFriend);

function processUpload() {
    var uploadInfo = document.getElementById('upload');
    if ('files' in uploadInfo) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var jsonObj = JSON.parse(event.target.result); //an array of objects
            /* put your code here, whatever you need to do with jsonObj */
            for(var i = 0; i < jsonObj.length; i++) {
                rootRef.push().set(jsonObj[i]);
            }
        };
        /* file is an array and we are interested only in the first element */
        reader.readAsText(uploadInfo.files[0]);
    }
}

function addTable() {

    var myTableDiv = document.getElementById("friendTable")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')

    table.border = '1'
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "Name"
    heading[1] = "Phone Number"
    heading[2] = "Age"
    heading[3] = "Action"

    var stock = new Array();

    //creates an array of arrays that are a name->value pairs
    for(var x in jsonObj) {
        //if var is a phone number, then take value and format it
        if (jsonObj.hasOwnProperty(x)) {
            if(x.replace(/[^0-9]/g,"").length >= 7) {
                if(x.length == 7) {
                    var temp = x.substring(0,3) + "-" + x.substring(4);
                }
                if(x.length == 10) {
                    var temp = "(" + x.substring(0,3) + ")" + x.substring(4,8) + "-" + x.substring(8);
                }
                console.log(temp);
                stock.push(x, temp);
            } else {
                stock.push(x, jsonObj[x]);
            }
            console.log(stock);
        }
    }


    //stock[0] = new Array("Cars", "88.625", "85.50", "85.81", "987")
    //stock[1] = new Array("Veggies", "88.625", "85.50", "85.81", "988")

    //TABLE COLUMNS
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }

    //TABLE ROWS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (i = 0; i < stock.length; i++) {
        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            if(true) { //TODO change to correct conditional
                td.appendChild(document.createTextNode(stock[i][j]));
            } else {
                //create button for deleting rows
            }
            td.appendChild(td)
        }
    }

    myTableDiv.appendChild(table)

    var deleteAll = document.createElement('button');
    deleteAll.id = "deleteAll";
    var body = document.getElementByTagName("BODY");
    body.appendChild(deleteAll);
    addInsertData();

}

function validateInputData() {

    var nameValue = document.getElementById("nameField").value;
    var numberValue = document.getElementById("numberField").value;
    var ageValue = document.getElementById("ageField").value;

    var allPassed = true;

    if(/^[A-Z][a-z]$/.test(nameValue)) {

    } else {
        allPassed = false;
        alert("Name formatting incorrect. Please re-enter.");
    }
    if(/(^[0-9]{7} | ^[0-9]{10})$/.test(numberValue)) {

    } else {
        allPassed = false;
        alert("Invalid phone number. Please re-enter.");
    }
    if(/^[0-9]{1,2}$/.test(ageValue)) {

    } else {
        allPassed = false;
        alert("Inavlid age. Please re-enter.");
    }

    if(allPassed) {

        var usersRef = ref.child("users");
        usersRef.set({
            alanisawesome: {
                date_of_birth: "June 23, 1912",
                full_name: "Alan Turing"
            }
        });
    }

    //first letter up, others lower: /^[A-Z][a-z]$/.test(nameValue);
    //to read already-formatted 10 digit number: ^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$
    //Check phone number: (^[0-9]{7} | ^[0-9]{10})$
    //Age: ^[0-9]{1,2}$

}

function searchDatabase() {

    console.log('Record found ', snap.key, ' data is ', snap.val());

    rootRef.orderByChild("age").startAt(25).on("child_added",
        snapshot => {
            var st = snapshot.val();
            //access st.name and st.age
        });

    rootRef.orderByChild("age").equalTo(21).on("child_added",
        snapshot => {
            // students whose age == 21
        });

    // SQL: SELECT name FROM faculty WHERE name = 'Roger Ferguson'
    facultyRef
        .orderByChild('name')
        .equalTo('Roger Ferguson')
        .on('child_added', searchResult);

    // SQL: SELECT name FROM faculty WHERE name > 'A" AND name < 'M'
    facultyRef
        .orderByChild('name')
        .startAt('A')
        .endAt('M')
        .on('child_added', searchResult);


}

function removeRow(snapshot) {

    console.log('A node removed ', snap.key);

    ref.on("child_removed", function(snapshot) {
        var deletedPost = snapshot.val();
        console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
    });

}

function addFriend(snapshot) {
    console.log('A new node added ', snap.key, snap.val());

    // retrieve the last record from `ref`
    rootRef.endAt().limitToLast(1).on('child_added', function(snapshot) {

        // all records after the last continue to invoke this function
        console.log(snapshot.name(), snapshot.val());

    });
    rootRef.push().set({ name: nameValue, phone: numberValue, age: ageValue });

}
