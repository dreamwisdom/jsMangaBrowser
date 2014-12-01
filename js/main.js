'use strict'; // Remonte d'avantage les erreurs de code

 //Nombre de page dans chaque chapitre.
var chapterNb = [[0,'0'],[32,'jpg'],[33,'jpg'],[31,'png'],[34,'png']];
//------------------------------------------------------------------------ Chargement initial
//----------------------------------------------------------------------------------------------------------------------------Active
$(document).ready(function(){
//-------------------------------------------On Start
	
//------------------------------------------------------------OnStart------------Header Search Box Focus & Clear

	var msgDefault = 'Rechercher';
	
	//Clear search text on focus
	$( "#headerSearch" ).focus(function() {
		$( "#headerSearch" ).val('');
	});
	
	//Toggle show/hide login box with
	$('#btn_login_register').click(function(){
		$('#login_form').css('display')=='none' ? $('#login_form').css('display','inline-block') : $('#login_form').css('display','none');
	})
	
	//Form login verification
	$('#login_form').submit(login);
//--------------------------------------------------------------OnStart-------------------------------------index.html
	if (window.location.pathname.indexOf('/index.html') >= 0){
		generateTopList();
		generateLatestMangaList();
		
		//Boutton Random
		$("#btn_random").click(function(){
			
			emptyM1();
			generateRandomMangaList();
			$("#main_div_p1_2").show("slow");
			fakeLoading();
		});

		//Boutton Latest
		$("#btn_latest").click(function(){
			generateLatestMangaList();
			fakeLoading();
		});
		
		//Boutton A-Z
		$("#btn_az").click(function(){
			$container.isotope({ sortBy: 'name' })
		});
		
		//Boutton Collapse
		$("#btn_collapse").click(function(){
			
			var height = parseInt($("#main_div_p1_2").height());
			//alert(height);
			if(height>10){
				$("#main_div_p1_2").hide("slow", emptyM1);
			}else{
				generateLatestMangaList();
				fakeLoading();
			}
		});
		
	//------------------------------------------------------------------------Isotope
		// init Isotope
		var $container = $('#main_div_p2_2').isotope({
		itemSelector: '.m2',
		layoutMode: 'fitRows',
		getSortData: {
			name: '.m2_t'
		}
	  });

	  // bind sort button click
		$('#sorts').on( 'click', 'button', function() {
			var sortValue = $(this).attr('data-sort-value');
			$container.isotope({ sortBy: sortValue });
		});

	  // change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
			});
		});
	}
//----------------------------------------------Fin Isotope
//--------------------------------------------------------------OnStart-------------------------------------manga/somemanga.html

	if (window.location.pathname.indexOf('/somemanga.html') >= 0){
		
		// Add click listener to images
		$("#manga_img").click(loadNextMangaPage);	
		
		// Generates the navigation li
		liUpdate();
	
	
		//Add click listener to next chapters button
		$( ".next_chapter li" ).click(loadNextChapter);
		
		//Add click listener to previous chapters button
		$( ".pre_chapter li" ).click(loadPreviousChapter);
		
		//Add change listener on select
		$( "#chapter_select" ).change(selectChapter);
		
		//Keyboard left and right arrow listener
		$("body").keydown(function(e) {
		  if(e.keyCode == 37) { // left
			loadPreviousMangaPage();
		  }
		  else if(e.keyCode == 39) { // right
			loadNextMangaPage();
		  }
		});
		
		//Zoom Button
		$( "#zoom_btn" ).click(toggleImgZoom);
	}
//--------------------------------------------------------------OnStart--------------------------------------register.html
	if (window.location.pathname.indexOf('register.html') >= 0){
		
		//Form submit verification
		$("form[name='register_form']").submit(register);
		
		//Password validation $( "#register-form input[name=password1]" ).keyup(validatePassword);
		//$( "#id_password1" ).keyup(validatePassword);
		$("form[name='register_form'] input[name='password1']").keyup(validatePassword);
		//Password 2 validation
		$( "form[name='register_form'] input[name=password2]" ).keyup(comparePassword);
	}
});	//--On start End
//----------------------------------------------------------------------------------------------------------------------------------End On start
//------------------------------------------------------Header
//Login button
function login(){
	if($('#login_form input[name="user"]').val()!=''){
		$('#btn_login_register').css('display','none');
		$('#div_login_register').append('<div id="div_login_temp"><p>Welcome, ' + $('#login_form input[name="user"]').val() + '</p></div>');
		$('#div_login_temp').append('<input type="button" value="Logout" />');
		$('#login_form').css('display','none');
		
		//Logout button listener
		$("#div_login_temp input").click(function(){
			$('#div_login_temp').remove();
			$('#btn_login_register').css('display','inline-block');
		});
			
		return false; //False to avoid page from reloading
	}else{
		//empty username
		return false;
	}
	

	
}
//----------------------------------------------index.html
//------------------------------------------------------------------------Creation d'une liste random
function generateRandomMangaList(){
	var div = '';
	var randomId = '';
	var id = '';
	for(var i = 0; i < 12; i++){
		randomId = getRandomMangaId();
		div = '<div id="m' + i + '" class="m1">' + 
		'<div class="m1_img">' +
		'<a href="manga/somemanga.html"><img class="thumb" src="' + getRandomThumbnail() + '"/></a></div>' +
		'<p class="m1_t">' + getTrimMangaTitle(getMangaTitleById(randomId),11) + '</p>' +
		'<p class="m1_d">' + getMangaYearById(randomId) + '</p>' +
		'<p class="m1_c">Vol: ' + getMangaChapterById(randomId) +'</p>' +
		'</div>';
		
		$( "#main_div_p1_2" ).append( div );
		id = '#m' + i;
		$( id ).css( "background", getRandomColor() );
	}
}
//------------------------------------------------------------------------Creation de latest list
function generateLatestMangaList(){
	var div = '';
	var randomId = '';
	var id = '';
	
	emptyM1();
	
	for(var i = 0; i < 12; i++){
		randomId = getRandomMangaId();
		div = '<div id="m' + i + '" class="m1">' +
		'<div class="m1_img">' +
		'<a href="manga/somemanga.html"><img class="thumb" src="' + getRandomThumbnail() + '"/></a></div>' +
		'<p class="m1_t">' + getTrimMangaTitle(getMangaTitleById(randomId),11) + '</p>' +
		'<p class="m1_d">' + getRandomReleaseTime() + '</p>' +
		'<p class="m1_c">Vol: ' + getMangaChapterById(randomId) +'</p>' +
		'</div>';
		
		$( "#main_div_p1_2" ).append( div );
		id = '#m' + i;
		$( id ).css( "background", getRandomColor() );
	}
	
	$("#main_div_p1_2").show("slow");
}
//------------------------------------------------------------------------Creation d'une liste top
function generateTopList(){
	var div = '';
	var randomId = '';
	var id = '';
	for(var i = 0; i <= 50; i++){
		div = '<div id="m2_' + i + '" class="m2">' + 
		'<div class="m2_1">' +
		'<div class="m2_img"></div>' +
		'<a href="manga/somemanga.html" class="m2_link"><p class="m2_t ">' + getTrimMangaTitle(getMangaTitleById(i),30) + '</p></a>' +
		'<p class="m2_c">Vol: ' + 	getMangaChapterById(i) + '</p>' +
		'</div>' +
		'<div class="m2_2">' +
		'<p class="m2_d">' + getMangaYearById(i) + '</p>' +
		'</div>' +
		'</div>';
		
		$( "#main_div_p2_2" ).append( div );
	}
}

//getRandomMangaId
function getRandomMangaId(){
	var id = 0;
	id = Math.floor(Math.random() * mangaList.length);
	return id;
}

//getMangaTitleById
function getMangaTitleById(id){
	var title = mangaList[id][0];
	return title;
}

//getTrimMangaTitle
function getTrimMangaTitle(mTitle, t){
	var trimTitle = mTitle.length > t ? mTitle.substring(0,t) + '...' : mTitle;
	return trimTitle;
}

//getMangaChapterById
function getMangaChapterById(id){
	var mChapter = mangaList[id][3];
	return mChapter;
}

//getMangaYearById
function getMangaYearById(id){
	var mYear = mangaList[id][4];
	return mYear;
}

//getRandomReleaseTime
function getRandomReleaseTime(){
	var mTime = '';
	var rnd = Math.floor(Math.random()*5 + 1);
	
	if (rnd ==1){
		mTime = 1 + ' hour ago';
	}else{
		mTime = rnd + ' hours ago';
	}
	return mTime;
}

//getRandomReleaseTime
function getRandomThumbnail(){
	var rnd = Math.floor(Math.random()*70 + 1);
	return 'images/small/' + rnd + '.jpg'
}

//Vider la div p1_2
function emptyM1(){
	$("#main_div_p1_2").empty();
}
//Fake Loading bar
function fakeLoading(){

	$( "#main_div_p1_2" ).append( '<div id="progress_bar"></div>' );

	$("#progress_bar").animate({
      width:'+=50%',
    }, 300, function() {
   $( "#progress_bar" ).remove();
  });

}
//Creer une couleur hexadecimal au hazard
function getRandomColor() {
    var lettres = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += lettres[Math.round(Math.random() * 15)];
    }
    return color;
}

//-----------------------------------------------------------------------manga/somemanga.html
function loadNextMangaPage(){
	
	var curChapter = getChapterCurNb();
	var curPage = getPageCurNb();

	//Shrink image if x_large
	if ( $("#div_manga_img").hasClass('x_large') ){ 
		
		//Necessary for smooth transition
		$( "#manga_img" ).hide( 0, function() {
			toggleImgZoom();
		});
		$( "#manga_img" ).show(1);
	}
	
	//Change chapter when the end is reach
	if((curPage == chapterNb[curChapter][0]) && (curChapter != chapterNb.length-1)){ 

		curChapter++;
		curPage=0;
		//Change select state
		setSelectState(curChapter);
		$('#cur_chapter').html(curChapter);

	}else if (curChapter == chapterNb.length-1 && curPage== chapterNb[curChapter][0]){
		alert('No next chapter');
		return 0;
	}
	//var type = chapterNb[c-1][1]; //get jpg or png
	var ext = getMangaExtension(curChapter);
	// Add padding to the page number -1 > 001
	curPage++;
	var page = getPadding(curPage);
	$('#manga_img').attr('src', '../m/shinozaki/'+ curChapter +'/' + page + '.' + ext);
	
	
	
	liUpdate();
}
function loadPreviousMangaPage(){
	
	var curChapter = getChapterCurNb();
	var curPage = getPageCurNb();
	
	//Change to previous chapter
	if((curPage == 1) && (curChapter > 1) && (chapterNb.length > 1)){ 
		curChapter--;
		curPage=chapterNb[curChapter][0] +1;
		//Change select state
		setSelectState(curChapter);
		$('#cur_chapter').html(curChapter);
	}else if (curChapter==1 & curPage==1){
		alert('No previous page');
		return 0;
	}
	//var type = chapterNb[c-1][1]; //get jpg or png
	var ext = getMangaExtension(curChapter);
	// Add padding to the page number -1 > 001
	curPage--;
	var page = getPadding(curPage);
	$('#manga_img').attr('src', '../m/shinozaki/'+ curChapter +'/' + page + '.' + ext);
	
	liUpdate();
}

function loadThisMangaPage(z){

	var c = getChapterCurNb();
	var page = getPadding(z.innerHTML);
	var ext = getMangaExtension(c);

	if(page != '...'){
		$('#manga_img').attr('src', '../m/shinozaki/'+ c +'/' + page + '.' + ext);
	}

	liUpdate();
}
function selectChapter(){
	var sIndex = $("#chapter_select").prop("selectedIndex");
	var ext = getMangaExtension(sIndex+1);
	$('#manga_img').attr('src', '../m/shinozaki/'+ (sIndex+1) +'/' + '001' + '.' + ext);
	
	//h1 update
	$('#cur_chapter').html(sIndex+1);
	
	liUpdate();
	
	//Remove focus
	$('#chapter_select').blur();
}
function loadNextChapter(){
	var chapter = getChapterCurNb();
 
	if(chapter<chapterNb.length-1){
		var ext = getMangaExtension(chapter+1);
		$('#manga_img').attr('src', '../m/shinozaki/'+ (chapter+1) +'/' + '001' + '.' + ext);
		$('#cur_chapter').html(chapter+1);
		//Change select state
		setSelectState(chapter+1);
	}else{
		alert('No next chapter');
	}
}
function loadPreviousChapter(){
	var chapter = getChapterCurNb();
 
	if(chapter>1){
		var ext = getMangaExtension(chapter-1);
		$('#manga_img').attr('src', '../m/shinozaki/'+ (chapter-1) +'/' + '001' + '.' + ext);
		$('#cur_chapter').html(chapter-1);
		//Change select state
		setSelectState(chapter-1);
	}else{
		alert("Can't go lower");
	}
}
function setSelectState(a){
	
	var id = '#chapter_select option:nth-child(' + (a) +')';
	$(id).prop('selected', true);
}
function getMangaExtension(chapter){
	var ext = chapterNb[chapter][1];
	
	return ext;
}
function getPadding(a){
	var page = "" + a;
	var pad = "000";
	page = pad.substring(0, pad.length - page.length) + page;

	return page;
}

function getPageCurNb(){
	var a = $('#manga_img')[0].src;
	var b = a.indexOf('/',a.indexOf('/m/')+3); //First '/' after /m/
	var page = parseInt(a.substr(b+3,3)); // get current page number
	
	return page;
}

function getChapterCurNb(){
	var a = $('#manga_img')[0].src;
	var b = a.indexOf('/',a.indexOf('/m/')+3); //First '/' after /m/
	var chapter = parseInt(a.substr(b+1,1));// get current chapter number
	
	return chapter;
}

function liUpdate(){
	
	/*var ali = '</li><!--';
	var lia= '--><li>'*/
	var liGroup = '<!--';
	var curPage = getPageCurNb();
	var chapter = getChapterCurNb();
	
	$( ".btn_mid" ).empty();// Step 1: remove all li
	
	if( curPage < 5){ //Display 1-5 & last 2
		for(var i = 1;i<=5;i++) liGroup += '--><li>' + i + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		liGroup +=  '--><li>' + (chapterNb[chapter][0]-1) + '</li><!--';
		liGroup +=  '--><li>' + chapterNb[chapter][0] + '</li><!--';
	}else if(curPage > chapterNb[chapter][0]-5){ // display first 2 and last 5
		liGroup +=  '--><li>' + 1 + '</li><!--';
		liGroup +=  '--><li>' + 2 + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		for(var i = (chapterNb[chapter][0]-5);i<=(chapterNb[chapter][0]);i++) liGroup += '--><li>' + i + '</li><!--';
	}else{ // Display first 2 & last 2 & 5 pages centered on current page
		liGroup +=  '--><li>' + 1 + '</li><!--';
		liGroup +=  '--><li>' + 2 + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		for(var i = (curPage-2);i<=(curPage+2);i++) liGroup += '--><li>' + i + '</li><!--';
		liGroup +=  '--><li>' + '...' + '</li><!--';
		liGroup +=  '--><li>' + (chapterNb[chapter][0]-1) + '</li><!--';
		liGroup +=  '--><li>' + chapterNb[chapter][0] + '</li><!--';	
	}

	$( ".btn_mid" ).append( liGroup );
	
	//Attach click to the li
	$( ".btn_mid li" ).click(function() {
	  //console.log(this);
	  loadThisMangaPage(this);
	  
	});

	//current page highlighted on the li bar
	var liNb = $('#btn_mid').children().length; //number of li
	
	//Comparing the text in the li with the current page. Test need to be done on an individual ul. #btn_mid
	for(i = 1; i <= liNb; i++){
		var curLi = '#btn_mid li:nth-child(' + i + ')';
		if($(curLi).text() == curPage){
			var allLi = '.btn_mid li:nth-child(' + i + ')'; //This one is the class
			$( allLi ).addClass( 'ch_selected' );
		}
	}	
}
function toggleImgZoom(){


	if ( $("#div_manga_img").hasClass('x_large') ){
		var image = $('#manga_img');
		var originalWidth = image[0].naturalWidth; 
		var originalHeight = image[0].naturalHeight;
		
		$("#div_manga_img").removeClass('x_large');
		$("#div_manga_img").css('position','static');
		$("#div_p_div_manga_img").height('auto');
		$("#div_manga_img").width('auto');

		
	} else {

		var width = $("#manga_img").width();
		var height = $("#manga_img").height();
		var proportion =  height / width;
	
		width = $("body").width();
		$("#div_manga_img").addClass('x_large');
		$("#div_manga_img").css('position','absolute');
		$("#div_manga_img").css('left','0');
		$("#div_manga_img").width(width);
		$("#div_p_div_manga_img").height(width * proportion);
	}
}
//-----------------------------------------------------------------------manga/register.html
function register(){
	
	var username = $('#id_username').val();
	
	if (!validateEmail()){
		$('#id_email ~ span').html('Invalid email');

		return false;
	}else if(!validateUsername(username)){
		var name = $('#id_email').val();
		if (!validateUsername(name)){
			$('#id_username ~ span').html('Invalid (3-16 characters)');
		}
		return false;
	}else if(!validatePassword()){
		return false;
	}else if(!comparePassword()){
		return false;
	}else{
		return true;
	}
}
function comparePassword(){
	var pwd1 = $('#id_password1').val();
	var pwd2 = $('#id_password2').val();
	
	if(pwd1!=pwd2){
		$('#id_password2 ~ span').css('color','red');
		$('#id_password2 ~ span').html('Passwords not matching');
		return false;
	}else{
		$('#id_password2 ~ span').css('color','green');
		$('#id_password2 ~ span').html('Ok');	
		return true;
	}
}
function validateEmail(email) { 
	var email = $('#id_email').val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (!re.test(email)){
		$('#id_email ~ span').html('Invalid email');
		return false;
	}else{
		$('#id_email ~ span').html('');
		return true;
	}
} 

//3-16 letters validation
function validateUsername(user){
	var re = /^[a-z0-9_-]{3,16}$/
	return re.test(user);
}

//6-18 letters validation
function validatePassword(){	
	//alert();
	var password = $('#id_password1').val();
	var re = /^[a-z0-9_-]{6,18}$/;
	
	if (!re.test(password)){
		$('#id_password1 ~ span').css('color','red');
		$('#id_password1 ~ span').html('Invalid (6-18 characters)');
		return false;
	}else{
		$('#id_password1 ~ span').css('color','green');
		$('#id_password1 ~ span').html('Ok');
		return true;
	}
}
























