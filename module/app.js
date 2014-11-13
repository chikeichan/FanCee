var mj = {};


//Initialize Sets ==============================================
//Original Full Sets
mj.fullSets = {
	bamboo : {
		'1': 4,
		'2': 4,
		'3': 4,
		'4': 4,
		'5': 4,
		'6': 4,
		'7': 4,
		'8': 4,
		'9': 4
	},
	man : {
		'1': 4,
		'2': 4,
		'3': 4,
		'4': 4,
		'5': 4,
		'6': 4,
		'7': 4,
		'8': 4,
		'9': 4
	},
	pin : {
		'1': 4,
		'2': 4,
		'3': 4,
		'4': 4,
		'5': 4,
		'6': 4,
		'7': 4,
		'8': 4,
		'9': 4
	},
	zdragon : {
		'chun': 4,
		'green': 4,
		'haku' : 4
	},
	wind : {
		'east' : 4,
		'north' : 4,
		'south' : 4,
		'west' : 4
	}
}

//Function to return a shuffled array of MahJong sets
mj.shuffleSets = function(){
	var sets = [];
		_.each(mj.fullSets, function(x,type){
			_.each(x, function(num,set){
				for(var i =0; i<num; i++){
					sets.push(type+'-'+set);
					mj.fullSets[type][set]--;
				}
			})
		})
	return _.shuffle(sets);
}

//Global variables Declaration;
mj.mySets = [];
mj.rSets = [];
mj.uSets = [];
mj.lSets = [];
mj.playedSets = [];
mj.currentPos = 'me';
mj.PongmySets = [];
mj.PongrSets = [];
mj.PonguSets = [];
mj.PonglSets = [];


//Starting at player's position, each position takes turn getting a card counter clockwise
//until player has 14 card.
mj.readySets = function(sets){
	while(this.gameSets.length > 83){
		this.mySets.push(this.gameSets.pop());
		if(this.mySets.length>13) {return};
		this.rSets.push(this.gameSets.pop());
		if(this.rSets.length>13) {return};
		this.uSets.push(this.gameSets.pop());
		if(this.uSets.length>13) {return};
		this.lSets.push(this.gameSets.pop());
		if(this.lSets.length>13) {return};
	}
}

//Rendering =======================================================================
//Display sets face up for one player
mj.displayCard = function(set, position){
	var $pos = $('div#'+position);
	set.sort();
	for (var i=0; i<set.length; i++){
		var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.append(mj);
	}
}

//Display sets face down for opponents
mj.displayOpponents = function(set, position) {
	var $pos = $('div#'+position);
	set.sort();
	for (var i=0; i<set.length; i++){
		var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.append(mj);
	}
}

//Display Ponged sets face up for everyone
mj.displayPong = function(set, position) {
	var $pos = $('div#'+position);
	for (var i=0; i<set.length; i++){
		var mj = '<img id="p'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.prepend(mj);
	}
}


//Refresh rendering for me, right, up, left, or field.
mj.refresh = function(position){
	var $pos = $('div#'+position);
	var set;
	if(position === 'right'){
		set = 'rSets';
	} else if (position === 'left'){
		set = 'lSets';
	} else if (position === 'up') {
		set = 'uSets';
	} else if (position === 'me') {
		set = 'mySets';
	} else if (position === 'field'){
		set = 'field';
	}

	$pos.html('');
	if(set === 'mySets'){
		mj.displayCard(mj[set], position);
	} else if (set === 'field') {
		_.each(mj.playedSets, function(set){
			$('div#field').append('<img id="field" src="../graphics/'+set+'.png"></img>');
		});
	} else {
		mj.displayOpponents(mj[set], position);
	}
}


//Game Logic ====================================================================
//Analyzed recently played set to see if a pause is needed.
mj.ifPause = function(position){
	var pong = false;
	var playerPong;
	var lastSet = mj.playedSets[mj.playedSets.length-1];
	var players;
		if(position === 'right'){
			players = ['lSets','mySets','uSets'];
		} else if (position === 'left'){
			players = ['rSets','mySets','uSets'];
		} else if (position === 'up') {
			players = ['lSets','mySets','rSets'];
		} else if (position === 'me') {
			players = ['lSets','uSets','rSets'];
		}

	_.each(players, function(player){
		var dup = _.filter(mj[player], function(set){
			return set === lastSet;
		});
		if(dup.length === 2){
			pong = true;
			playerPong = player;
		};
	});

	if(playerPong === 'lSets'){
		playerPong = 'left'
	} else if(playerPong === 'rSets'){
		playerPong = 'right'
	} else if(playerPong === 'uSets'){
		playerPong = 'up'
	} else if(playerPong === 'mySets'){
		playerPong = 'me'
	}

	return [pong, playerPong];
}


//AI to return boolean whether or not to pong.
mj.pongAI = function(position){
	return true;
}


//Execute Pong sequence
mj.pong = function(position){
	var set;
	if(position === 'right'){
			set = 'rSets';
	} else if (position === 'left'){
		set = 'lSets';
	} else if (position === 'up') {
		set = 'uSets';
	} else if (position === 'me') {
		set = 'mySets';
	}

	var slastSet = mj.playedSets.pop()

	mj[set] = _.without(mj[set],slastSet);

	mj['Pong'+set].push(slastSet);
	mj['Pong'+set].push(slastSet);
	mj['Pong'+set].push(slastSet);
	
	mj.refresh(position);
	mj.displayPong(mj['Pong'+set],position);
	mj.refresh('field');

	_.delay(function(){
			if(position === 'right'){
				mj.currentPos === 'right';
				mj.next('right',false);
			} else if (position === 'left'){
				mj.currentPos = 'left';
				mj.next('left',false);
			} else if (position === 'up') {
				mj.currentPos = 'up';
				mj.next('up',false);
			} else if (position === 'me') {
				mj.currentPos = 'me';
			}
	},500);

}


//When a pause is caused by Pong scenario, listen for Pong executive command.
mj.listenPong = function(position){
	var lastSet = mj.playedSets[mj.playedSets.length-1];

	if(position!=='me'){
		if(mj.pongAI(position)){
			mj.pong(position);
		} else {
		_.delay(function(){
			if(mj.gameSets.length > 4) {
				if(mj.currentPos === 'right'){
					mj.currentPos === 'up';
					mj.next('up');
				} else if (mj.currentPos === 'left'){
					mj.currentPos = 'me';
					mj.mySets.push(mj.gameSets.pop());
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.winningHand('me','mySets')|| mj.winningHand('me','mySets',true)){
						alert(position+' win!');
						return;
					}
				} else if (mj.currentPos === 'up') {
					mj.currentPos = 'left';
					mj.next('left');
				} else if (mj.currentPos ==='me') {
					mj.currentPos = 'right';
					mj.next('right');
				}
			}
		},500);
	}
}
	else {
		$('div#panel').fadeIn(200);
	}
}

//Return set string to [set Type, set Number]
mj.readSet = function(set){
	set = set.replace('.png','');
	set = set.split('/');
	set = set[set.length-1];
	return set.split('-');
};

var sound = new buzz.sound('../wood.mp3');
var sound2 = new buzz.sound('../wood.mp3');

var preSound = true;
var playWood = function(){
	if(preSound){
		sound.play();
		preSound = false;
	} else {
		sound2.play();
		preSound = true;
	}
}

//AI to select which piece to play
mj.nextAI = function(position, set){
	var answer = 'no';
	var AISet = [];
	_.each(mj[set], function(x,i){
		AISet.push({
			cardName: x,
			cardType: x.split('-')[0],
			cardNum: x.split('-')[1],
			cardVal: 0,
			cardIndex: i
		})
	})

	for (var i=0; i<AISet.length; i++){
		var select = AISet[i];
		var times = 0;
		if(select.cardType!=='wind'&&select.cardType!=='zdragon'){
			select.cardVal++;
			if(select.cardNum >= 3 && select.cardNum <= 7){
				select.cardVal++;
			}
		}
		for(var j=0; j<AISet.length; j++){
			if(i!==j){
				var compare = AISet[j]
				if(select.cardType === compare.cardType){
					if(select.cardNum === compare.cardNum){
						select.cardVal = select.cardVal+3;
						times++;
						if(times === 2){select.cardVal = select.cardVal+2;}
						if(times === 3){select.cardVal = select.cardVal+4;}
					};
					if(select.cardNum - compare.cardNum >= -1 && select.cardNum - compare.cardNum <= 1 ){
						select.cardVal++;
					};
					if(select.cardNum - compare.cardNum >= -2 && select.cardNum - compare.cardNum <= 2 ){
						select.cardVal++;
					}
				};
				
			}
		}
	}
	var lowest = _.sortBy(AISet, function(x){
		return x.cardVal;
	});

	return lowest;
};

mj.winningHand = function(position,set,reverse){
	var result = false;
	var theSet = {};
	var pair= [];
	var threes = [];
	var seq = [];
	var seq2 = [];
	var winHand = [];

	//Get Seq first
	var setArray = mj[set].slice();

	var sequenize = function(){
	
		//Get Seq 
		seq2 = [];
		var seqArray = _.uniq(setArray);

		var preValue = seqArray[0];
		var seqTimes = 1;

		for(var i=1;i<seqArray.length;i++){
			var selectKey = seqArray[i].split('-')[0];
			var selectProp = seqArray[i].split('-')[1];
			var compareKey = preValue.split('-')[0];
			var compareProp = preValue.split('-')[1];

			if(selectKey === compareKey){
				if(selectProp-1 === +compareProp){
					seqTimes++;
					preValue = seqArray[i];
					if(seqTimes===3){
						seq2.push(seqArray[i-2]);
						seq2.push(seqArray[i-1]);
						seq2.push(seqArray[i]);
						seqTimes = 0
						preValue = '-';
					}
				} else {
					seqTimes = 1;
					preValue = seqArray[i];
				}
			} else {
				seqTimes = 1;
				preValue = seqArray[i];
			}
		}
		//Take out Seq sets from original array

		_.each(seq2,function(set){
			var dup = false;
			_.each(setArray,function(mySet,i){
				if(mySet === set && dup === false){
					setArray.splice(i,1);
					dup=true;
				}
			})
		});

		_.each(seq2,function(x){
			seq.push(x);
		})
	}

	var revsequenize = function(){
	
		//Get Seq 
		seq2 = [];
		setArray.reverse();
		var seqArray = _.uniq(setArray);

		var preValue = seqArray[0];
		var seqTimes = 1;

		for(var i=1;i<seqArray.length;i++){
			var selectKey = seqArray[i].split('-')[0];
			var selectProp = seqArray[i].split('-')[1];
			var compareKey = preValue.split('-')[0];
			var compareProp = preValue.split('-')[1];

			if(selectKey === compareKey){
				if(+selectProp === +compareProp-1){
					seqTimes++;
					preValue = seqArray[i];
					if(seqTimes===3){
						seq2.push(seqArray[i-2]);
						seq2.push(seqArray[i-1]);
						seq2.push(seqArray[i]);
						seqTimes = 0
						preValue = '-';
					}
				} else {
					seqTimes = 1;
					preValue = seqArray[i];
				}
			} else {
				seqTimes = 1;
				preValue = seqArray[i];
			}
		}
		//Take out Seq sets from original array

		_.each(seq2,function(set){
			var dup = false;
			_.each(setArray,function(mySet,i){
				if(mySet === set && dup === false){
					setArray.splice(i,1);
					dup=true;
				}
			})
		});

		_.each(seq2,function(x){
			seq.push(x);
		})
	}

	if(reverse){
		revsequenize();
		revsequenize();
		revsequenize();
		revsequenize();
		revsequenize();
	} else {
		sequenize();
		sequenize();
		sequenize();
		sequenize();
		sequenize();
	}


	var lastValue = setArray[0];
	var repeat = 1;
	for(var i=1;i<setArray.length;i++){
		if(setArray[i]===lastValue){
			repeat++;
			lastValue = setArray[i];
			if(repeat === 3){
				threes.push(setArray[i]);
				threes.push(setArray[i]);
				threes.push(setArray[i]);
				lastValue = null;
				repeat = 0;
			}
		} else {
			lastValue = setArray[i];
			repeat = 1;
		}
	}

	_.each(threes,function(set){
		var dup = false;

		_.each(setArray,function(mySet,i){
			if(mySet === set && dup === false){
				setArray.splice(i,1);
				dup=true;
			}
		})
	});

	//
	var lastValue = setArray[0];
	var repeat = 1;
	for(var i=1;i<setArray.length;i++){
		if(setArray[i]===lastValue){
			repeat++;
			lastValue = setArray[i];
			if(repeat === 2){
				pair.push(setArray[i]);
				pair.push(setArray[i]);
				lastValue = null;
				repeat = 0;
			}
		} else {
			lastValue = setArray[i];
			repeat = 1;
		}
	}

	_.each(pair,function(set){
		var dup = false;

		_.each(setArray,function(mySet,i){
			if(mySet === set && dup === false){
				setArray.splice(i,1);
				dup=true;
			}
		})
	});

	console.log(position+' ======================================================');
	console.log('Seq                : '+seq);
	console.log('Threes             : '+threes);
	console.log('Pair               : '+pair);
	console.log('Rest of the card   : '+setArray);
	return setArray.length === 0;

};

mj.test = ["man-3", "man-4", "man-4",  "man-4","man-4", "man-5", "man-5","man-5","man-6", "man-6", "man-6", "man-7","man-7","man-8"]

//Main recursive logic to execute next round of playing until there are only 4
//cards left in the gamesets
mj.next = function(position, draw){
	var set;
	var $pos = $('div#'+position);
	if(position === 'right'){
		set = 'rSets';
	} else if (position === 'left'){
		set = 'lSets';
	} else if (position === 'up') {
		set = 'uSets';
	} else if (position === 'me') {
		mj.currentPos = 'me';
	}

	if(draw === false) {

	} else {
			mj[set].push(mj.gameSets.pop());
			mj.refresh(position);
			mj.displayPong(mj['Pong'+set],position);
			if(mj.winningHand(position,set) || mj.winningHand(position,set,true)){
			alert(position+' win!');
			return;
		}
	}

	

	var index = mj.nextAI(position, set)[0].cardIndex;

	if(typeof index !== 'number') return;

	var playedSet = mj[set].splice(index,1)[0];
	//console.log(playedSet);
	mj.playedSets.push(playedSet);

	playWood();

	mj.refresh('field');
	mj.refresh(position);
	mj.displayPong(mj['Pong'+set],position);


	if(mj.ifPause(position)[0]){
		mj.listenPong(mj.ifPause(position)[1]);
	} else {
		_.delay(function(){
			if(mj.gameSets.length > 4) {
				if(position === 'right'){
					mj.currentPos === 'up';
					mj.next('up');
				} else if (position === 'left'){
					mj.currentPos = 'me';
					mj.mySets.push(mj.gameSets.pop());
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.winningHand('me','mySets')|| mj.winningHand('me','mySets',true)){
						alert('You win!');
						return;
					}
				} else if (position === 'up') {
					mj.currentPos = 'left';
					mj.next('left');
				}
			}
		},500);
	}
}




//DOM Manipulation and Interactions
$(document).ready(function(){
	mj.gameSets = mj.shuffleSets();
	mj.readySets();
	mj.displayCard(mj.mySets, 'me');
	mj.displayOpponents(mj.rSets, 'right');
	mj.displayOpponents(mj.uSets, 'up');
	mj.displayOpponents(mj.lSets, 'left');

	$(document).on('mouseenter','img#me',function(){
		$(this).stop().animate({
			'top': '-20px'
		},100);
	});

	$(document).on('mouseleave','img#me',function(){
		$(this).stop().animate({
			'top': '0px'
		},100);
	});

	$(document).on('mouseenter','div#panel div',function(){
		$(this).css('background-color','rgba(255, 255, 255, 0.08)');
	});

	$(document).on('mouseleave','div#panel div',function(){
		$(this).css('background-color','');
	});

	$(document).on('click', 'div#Pong', function(){
		mj.pong('me');
		$('div#panel').fadeOut(200);
	})

	$(document).on('click', 'div#Null', function(){

		_.delay(function(){
			if(mj.gameSets.length > 4) {
				if(mj.currentPos === 'right'){
					mj.currentPos === 'up';
					mj.next('up');
				} else if (mj.currentPos === 'left'){
					mj.currentPos = 'me';
					mj.mySets.push(mj.gameSets.pop());
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.winningHand('me','mySets')|| mj.winningHand('me','mySets',true)){
						alert(position+' win!');
						return;
					}
				} else if (mj.currentPos === 'up') {
					mj.currentPos = 'left';
					mj.next('left');
				} else if (mj.currentPos ==='me') {
					mj.currentPos = 'right';
					mj.next('right');
				}
			}
		},500);

		$('div#panel').fadeOut(200);
	})

	$(document).on('click','img#me',function(){
		if(mj.currentPos === 'me') {
			var set = mj.readSet(this.src);
			var setStr = set[0]+'-'+set[1];
			var index = 0;
			_.find(mj.mySets, function(x,i){
					index = i;
					return x === setStr;
			})
			mj.mySets.splice(index,1);
			mj.playedSets.push(setStr);

			playWood();

			mj.refresh('field');
			mj.refresh('me');
			mj.displayPong(mj['PongmySets'],'me');
			mj.currentPos = 'right';

			if(mj.ifPause('me')[0]){
				mj.listenPong(mj.ifPause('me')[1]);
			} else {
				_.delay(function(){
					mj.next('right');
				},500);
			}
		}
	})





})