// Initialize Firebase
var config = {
	apiKey : "AIzaSyBF4uNVQBmC8vAvxmKVcPDrTgDaYUC_g6E",
	authDomain : "test-82867.firebaseapp.com",
	databaseURL : "https://test-82867.firebaseio.com",
	projectId : "test-82867",
	storageBucket : "",
	messagingSenderId : "786406546651"
};
firebase.initializeApp(config);

// code
var database = firebase.database()

// write
function writeData(path, data) {
	return database.ref(path).set(data)
}

var data = {
		test : true,
		object : {
			a : 'test a',
			b : 'test b',
			c : 'test c'
		}
	}


writeData('test/path', data).then(function(){
	console.log('added data to test/path')
})

// onchange DB test/path
var meuh = database.ref('test/path')
	meuh.on('value', function (res) {
		console.log(res.val())
		if (res.val().test) {
			$('#test').text(res.val().object.a)
		}
	})

	// read once
function readOnce(path) {
	database.ref(path).once('value').then(function (res) {
		$('#test2').text(res.val())
	})
}
readOnce('nowrite')

// update without overwriting
function addNode(path, node) {
	// get a key for a new path/node
	var newKey = database.ref().child(path).push().key

	return database.ref(path + '/' + newKey).set(node)
}
addNode('test', data)

// bulk update
function updateNodes(path1, path2, data) {
	// Get a key for a new node
	var newKey = database.ref().child(path1).push().key

	// Write the new x simulatneously on path
	var updates = {}
	updates[path1+'/'+newKey] = data
	updates[path2+'/'+newKey] = data

	return database.ref().update(updates)
}
updateNodes('test','no_test/pouet',data)
updateNodes('test','no_test/meuh',data)

// delete data
function removeNode(path) {
	return database.ref(path).remove()
}
removeNode('no_test/pouet')