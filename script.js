var database = firebase.database()

function writeData(path, data) {
	database.ref(path).set(data)
}

writeData('test/path',{test:true,object:{a:'test'})
