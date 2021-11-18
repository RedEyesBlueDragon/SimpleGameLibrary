

const app = new Realm.App({ id: "cloud_hw-afjlh" });
			
var game_lts;
var index = 0;


$(document).ready(function(){
  getGame();
  
});



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




function setGame() {

	var count = 0;
	for (var i = 0 ; i < game_lts.length; i++) {
		if (i%4 == 0) {
			count++;
			setPlace(count);
			
			console.log("did")
		}
		setView(game_lts[i]["_id"], game_lts[i]["genre"], game_lts[i]["release"], game_lts[i]["photo"], count);
	}
}




function setPlace(count) {
	var tag = ""
	if (count == 1) {
		tag += "active "
	}
	var doc = document.createElement("div");
	var big_html = 		'<div class="' + tag +' item"> ' +
						'	<ul class="thumbnails" id="' + count + '">' +
						'		' +
						'	</ul>' +
						'</div> ' ;
			console.log(count)

	doc.innerHTML = big_html.trim();
	document.getElementById("bigger_lst").appendChild(doc.firstChild);						
}





function setView(game_name, game_genre, game_year, game_img, count) {

	var doc = document.createElement("div");
	var trimmed = game_name.trim().replace(/ /g, '%20');

	var html =  '<li class="span3" 	> ' +
				'	<div class="product-box style="margin-top:10px""> ' +
				'		<span class="sale_tag"></span>  ' +
				'		<p>	<a href="product_detail.html' + '?para=' + game_name  + '" >  ' +
				'		<img src="' + game_img + '" alt="" style="height: 300px; width: 250px; object-fit: fill;" /></a></p>  ' +
				'		<a class="title" style="font-size: 15px"> ' + game_name.toUpperCase() +  '   </a><br/> ' + 
				'		<a class="category" > ' + game_genre.toUpperCase() +  '</a> ' +
				'		<p class="price" > ' + game_year +  '</p> ' +
				'	</div> ' +
				'</li> ' ;

			console.log(count)

	doc.innerHTML = html.trim();
	document.getElementById(count).appendChild(doc);		

}











