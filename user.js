
const app = new Realm.App({ id: "cloud_hw-afjlh" });
			
var user_lst;
var index = 0;


$(document).ready(function(){
  getUser();
  
});




async function getUser() {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	
	dbname = "user";
	obj = {};

	try{
		const resultOfCallFunction = await user.functions.getQuery(dbname, obj);
		console.log(resultOfCallFunction);
		user_lst = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}
	setUser();
}




function setUser() {

	var count = 0;
	for (var i = 0 ; i < user_lst.length; i++) {
		if (i%4 == 0) {
			count++;
			setPlace(count);
			
			console.log("did")
		}
		setView(user_lst[i]["_id"], count);
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





function setView(user_name, count) {

	var doc = document.createElement("div");
	var trimmed = user_name.trim().replace(/ /g, '%20');

	var html =  '<li class="span3" 	> ' +
				'	<div class="product-box style="margin-top:10px""> ' +
				'		<span class="sale_tag"></span>  ' +
				'		<p>	<a href="user_detail.html' + '?para=' + user_name + '" >  ' +
				'		<img src="themes/images/cloth/user.jpg" alt="" style="height: 300px; width: 250px; object-fit: fill;" /></a></p>  ' +
				'		<a class="title" style="font-size: 15px"> ' +  '   </a><br/> ' + 
				'		<a class="category" > User Name:' +  '</a> ' +
				'		<p class="price" > ' + user_name +  '</p> ' +
				'	</div> ' +
				'</li> ' ;

			console.log(count)

	doc.innerHTML = html.trim();
	document.getElementById(count).appendChild(doc);		

}











