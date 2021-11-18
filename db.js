
const app = new Realm.App({ id: "cloud_hw-afjlh" });
			
var game_lts;
var index = 0;

//background-image: url('themes/images/bg.png');

async function getGame() {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	
	dbname = "game";
	obj = {};

	try{
		const resultOfCallFunction = await user.functions.getQuery(dbname, obj);
		console.log(resultOfCallFunction);
		game_lts = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}
	setGame();
}





$(document).ready(function(){
  
});











//async function myFunction() {
//	//var result = Realm.user.functions.execute("addUser", { _id : "user"});		
//	const credentials = Realm.Credentials.anonymous();
//	const user = await app.logIn(credentials);
//	try{
//		const resultOfCallFunction = await user.functions.addUser({ _id : "user9"});
//		console.log(resultOfCallFunction)
//	}
//	catch (e){
//		console.log("error")	
//	}
//}


async function getData(dbname, obj) {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	try{
		const resultOfCallFunction = await user.functions.getQuery(dbname, obj);
		console.log(resultOfCallFunction)
	}
	catch (e){
		console.log("error")	
	}
}


async function addUser() {
	console.log("funciton call")
	var gusername = document.getElementById("user_name").value ;
	var gpassword = document.getElementById("user_password").value ;

	if (gusername.length == 0 || gpassword.length == 0) {
		alert("Fill in the Blanks");
		return
	}

	var uflag =  await insertUser(gusername, gpassword);

	if (uflag == true) {
		window.alert("User was Succesfully Added");
	} else {
		window.alert("Something gone wrong");
	}

}



async function insertUser(username, password) {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":username,"pasw":password,"total_play_time": 0,"average_rate":0,"most_played_game":""}
	try{
		const resultOfCallFunction = await user.functions.addUser(obj);
		console.log(resultOfCallFunction)
		return true
	}
	catch (e){
		console.log("error")	
		return false
	}
}





async function addGame() {
	console.log("funciton call")
	var gname = document.getElementById("game_name").value ;
	if (gname.length == 0) {
		alert("Game Name Cannot be Empty");
		return
	}
	var ggenre = document.getElementById("game_genre").value ;
	var gphoto = document.getElementById("game_photo").value ;
	var grelease = document.getElementById("game_release").value ;
	var gdescription = document.getElementById("game_description").value; 

	var flag =  await insertGame(gname, ggenre, gphoto, grelease, gdescription);

	if (flag == true) {
		window.alert("Game was Succesfully Added");
	} else {
		window.alert("Something gone wrong");
	}

}





async function insertGame(name, genre, photo, release, description) {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":name,"genre":genre,"photo": photo,"play_time":0,"rate":0, "release":release, "desc":description}
	try{
		const resultOfCallFunction = await user.functions.addGame(obj);
		console.log(resultOfCallFunction);

		return true;
	}
	catch (e){
		console.log("error");
		return false;	
	}

}















async function removeGame() {
	
	var gdname = document.getElementById("delete_game_name").value ;
	if (gdname.length == 0) {
		alert("Game Name Cannot be Empty");
		return
	}


	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);
	var obj = {"_id":gdname};
		console.log(obj);
	try{
		const resultOfCallFunction = await user.functions.removeGame(obj);
		console.log(resultOfCallFunction);
		if (resultOfCallFunction == true) {
			window.alert("Succesfully Removed");
		}
		return true;
	}
	catch (e){
		window.alert("Error Occured");
		console.log("error",e);
		return false;	
	}

}




async function removeUser() {
	
	var udname = document.getElementById("delete_user_name").value ;
	if (udname.length == 0) {
		alert("User Name Cannot be Empty");
		return
	}


	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":udname}
	try{
		const resultOfCallFunction = await user.functions.removeUser(obj);
		console.log(resultOfCallFunction);
		window.alert("Succesfully Removed");

		return true;
	}
	catch (e){
		window.alert("Error Occured");

		console.log("error");
		return false;	
	}

}





async function disableGame() {
	
	var dis = document.getElementById("disable_id").value ;
	if (dis.length == 0) {
		alert("Game Name Cannot be Empty");
		return
	}


	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":dis }
	try{
		const resultOfCallFunction = await user.functions.addDisable(obj, 0);
		console.log(resultOfCallFunction);
		if (resultOfCallFunction == true) {
		window.alert("Succesfully Disabled");
		}
		else {
		window.alert("Error Occured");
		}
	}
	catch (e){
		window.alert("Error Occured");

		console.log("error", e);
		return false;	
	}

}


async function enableGame() {
	
	var ena = document.getElementById("disable_id").value ;
	if (ena.length == 0) {
		alert("Game Name Cannot be Empty");
		return
	}


	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":ena}
	try{
		const resultOfCallFunction = await user.functions.addDisable(obj, 1);
		console.log(resultOfCallFunction);
		if (resultOfCallFunction == true) {
		window.alert("Succesfully Enabled");
		}
		else {
		window.alert("Error Occured");
		}
	}
	catch (e){
		window.alert("Error Occured");

		console.log("error", e);
		return false;	
	}
	
}




