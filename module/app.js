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
mj.meLast = '';
mj.rightLast = '';
mj.upLast = '';
mj.leftLast = '';
mj.playedSets = [];
mj.currentPos = 'me';
mj.PongmySets = [];
mj.PongrSets = [];
mj.PonguSets = [];
mj.PonglSets = [];
mj.mePoints = 0;
mj.rightPoints = 0;
mj.upPoints = 0;
mj.leftPoints = 0;


//Starting at player's position, each position takes turn getting a card counter clockwise
//until player has 14 card.
mj.readySets = function(sets){
	//mj.displayGameSets();


	while(this.gameSets.length > 83){
		this.mySets.push(this.gameSets.pop());
		this.mySets.sort();
		if(this.mySets.length>13) {return};

		this.rSets.push(this.gameSets.pop());
		this.rSets.sort();
		if(this.rSets.length>13) {return};

		this.uSets.push(this.gameSets.pop());
		this.uSets.sort();
		if(this.uSets.length>13) {return};

		this.lSets.push(this.gameSets.pop());
		this.lSets.sort();
		if(this.lSets.length>13) {return};
	}
}

//Rendering =======================================================================
mj.displayGameSets = function(){
	var mStack = 0;
	var rStack = 0;
	var uStack = 0;
	var lStack = 0;
	var max = mj.gameSets.length < 24 ? mj.gameSets.length : 24;
	var max2 = mj.gameSets.length < 48 ? mj.gameSets.length : 48;
	var max3 = mj.gameSets.length < 72 ? mj.gameSets.length : 72;


	for(var i=0;i<max;i++){
		rStack++;
	}
	for(var i=24;i<max2;i++){
		uStack++;
	}
	for(var i=48;i<max3;i++){
		lStack++;
	}
	for(var i=72;i<mj.gameSets.length;i++){
		mStack++;
	}

	var fillStack = function(stack,pos){
		var $pos = $('div#'+pos);
		$pos.html('')

		if(pos!=='gme'){
			for (var i=0; i<stack; i++){
				var mj = '<img id="'+pos+'" src="../graphics/facedown.png"></img>';
				$pos.append(mj);
			}
		} else {
			for (var i=0; i<stack; i++){
				var mj = '<img id="'+pos+'" src="../graphics/facedown.png"></img>';
				$pos.append(mj);
			}
		}
	}


	fillStack(rStack,'gright');
	fillStack(uStack,'gup');
	fillStack(lStack,'gleft');
	fillStack(mStack,'gme');

}






//Display sets face up for one player
mj.displayCard = function(set, position,faceUp){
	var $pos = $('div#'+position);
	this[position+'Last'] = set[set.length-1];

	if(faceUp){
		for (var i=0; i<set.length; i++){
			var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
			$pos.append(mj);
		}
	} else {
		for (var i=0; i<set.length; i++){
			var mj = '<img id="'+position+'" src="../graphics/facedown.png"></img>';
			$pos.append(mj);
		}
	}
	set.sort();

}

//Display Ponged sets face up for everyone
mj.displayPong = function(set, position) {
	var $pos = $('div#'+position);
	for (var i=0; i<set.length; i++){
		var mj = '<img id="p'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.prepend(mj);
	}

}

showOppo = false;

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
		mj.displayCard(mj[set], position,true);
	} else if (set === 'field') {
		_.each(mj.playedSets, function(set){
			$('div#field').append('<img id="field" src="../graphics/'+set+'.png"></img>');
		});
	} else {
		mj.displayCard(mj[set], position,showOppo);
	}
}



//Development Tools==============================================================
var Dev = {};
Dev.me= [];
Dev.up = [];
Dev.right = [];
Dev.left = [];
var DevStatus = false;

Dev.devMode = function(dev){
	showOppo = dev;
	DevStatus = dev;
	mj.refresh('me')
	mj.refresh('left')
	mj.refresh('right')
	mj.refresh('up');
}

Dev.pointStats = function(position, set){
	var sets = mj.nextAI(position,set);
	var points = [];
	var sets = _.groupBy(sets, function(set){
		points.push(set.cardVal);
		return set.cardVal;
	})
	console.log(sets);

	var avg = _.reduce(points,function(memo,num){
		return memo+num;
	},0)

	console.log(avg/points.length);
}


//Game Logic ====================================================================
//Analyzed recently played set to see if a pause is needed.
mj.ifPause = function(position){
	var pause = false;
	var playerPause;
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
			pause = 'pong';
			playerPause = player;
		} else if (dup.length === 3){
			pause = 'kong';
			playerPause = player;
		}
	});

	if(playerPause === 'lSets'){
		playerPause = 'left'
	} else if(playerPause === 'rSets'){
		playerPause = 'right'
	} else if(playerPause === 'uSets'){
		playerPause = 'up'
	} else if(playerPause === 'mySets'){
		playerPause = 'me'
	}

	return [pause, playerPause];
}


//AI to return boolean whether or not to pong.
mj.pongAI = function(position){
	return true;
}

mj.kongAI = function(position){
	return 'kong';
}

//Execute Pong sequence
mj.pong = function(position, addOneBack){
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

	if(addOneBack){
		mj[set].push(slastSet);
	}
	
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

//Execute PKng sequence
mj.kong = function(position){
	var set;

	mj[mj.currentPos+'Points'] = mj[mj.currentPos+'Points']-3;
	mj[position+'Points'] = mj[position+'Points'] + 3;

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
	mj['Pong'+set].push(slastSet);
	
	mj.refresh(position);
	mj.displayPong(mj['Pong'+set],position);
	mj.refresh('field');

	_.delay(function(){
			if(position === 'right'){
				mj.currentPos === 'right';
				mj.next('right',true);
			} else if (position === 'left'){
				mj.currentPos = 'left';
				mj.next('left',true);
			} else if (position === 'up') {
				mj.currentPos = 'up';
				mj.next('up',true);
			} else if (position === 'me') {
				mj.currentPos = 'me';
				mj.mySets.push(mj.gameSets.pop());
				mj.displayGameSets();
				mj.refresh('me');
				mj.displayPong(mj['PongmySets'],'me');
				if(mj.winningHand('me','mySets')[0]|| mj.winningHand('me','mySets',true)[0]){
					mj.win('me','mySets');
					return;
				}
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
					if(mj.winningHand('me','mySets')[0]|| mj.winningHand('me','mySets',true)[0]){
						mj.win('me','mySets');
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
} else {
		mj.addOneBack = false;
		$('div#panel').fadeIn(200);
	}
}

//When a pause is caused by Kong scenario, listen for Kong executive command.
mj.listenKong = function(position){
	var lastSet = mj.playedSets[mj.playedSets.length-1];

	if(position!=='me'){
		if(mj.kongAI(position)==='pong'){

			mj.pong(position, true);

		} else if(mj.kongAI(position)==='kong'){

			mj.kong(position);

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
					if(mj.winningHand('me','mySets')[0]|| mj.winningHand('me','mySets',true)[0]){
						mj.win('me','mySets');
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
} else {
		mj.addOneBack = true;
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
	var realSet = [];

	var groupSet = this.winningHand(position,set);

	var probSet = this.winProb(position,set,groupSet);

	realSet.push(groupSet[3])
	realSet.push(groupSet[4]);
	realSet = _.flatten(realSet);


	_.each(realSet, function(x,i){
		AISet.push({
			cardName: x,
			cardType: x.split('-')[0],
			cardNum: x.split('-')[1],
			cardVal: 0
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
						select.cardVal = select.cardVal+1;
						times++;
						if(times === 1){select.cardVal = select.cardVal+2;}
					};
					if(select.cardNum - compare.cardNum >= -1 && select.cardNum - compare.cardNum <= 1 ){
						select.cardVal++;
					};
					if(select.cardNum - compare.cardNum >= -2 && select.cardNum - compare.cardNum <= 2 ){
						select.cardVal = select.cardVal+2;
					}
				};
				
			}
		}
	}



	var sortedList = _.groupBy(AISet, function(x){
		return x.cardVal;
	});
	
	var keyArray = _.keys(sortedList);
	var lowestKey = keyArray[0];
	var lowestArray = sortedList[lowestKey];
	var lowestArray = _.shuffle(lowestArray);
	var playThis = lowestArray[0];

	console.log(playThis);

	for (var i=0;i<this[set].length;i++){
		if(playThis.cardName === this[set][i]){
			return i;
		}
	}
};

mj.winProb = function(position,set){
	var mj = this;
	var winSet = mj.winningHand(position,set,false,true,mj[position+'Last']);
	var revWinSet = mj.winningHand(position,set,true,true,mj[position+'Last']);
	var need = [];

	var getNeed = function(nestedSet){
		var pairs = nestedSet[3];
		var singles = nestedSet[4];
		if(pairs.length === 4 && singles.length === 0){
			need.push(_.unique(pairs));
		} else if (pairs.length === 2 && singles.length === 2){
			var xkey = singles[0].split('-')[0];
			var xvalue = singles[0].split('-')[1];
			var ykey = singles[1].split('-')[0];
			var yvalue = singles[1].split('-')[1];

			if(xkey === ykey){
				if(xvalue - yvalue === 1 ){
					need.push(ykey+'-'+(yvalue-1));
					need.push(xkey+'-'+(-xvalue+1));
				} else if(xvalue - yvalue === -1 ){
					need.push(ykey+'-'+(xvalue-1));
					need.push(xkey+'-'+(-yvalue+1));
				}
			}

		}
	}

	getNeed(winSet);
	getNeed(revWinSet);
	need = _.flatten(need);
	need = _.uniq(need);
	console.log(need);

	var answer = {total: 0};

	_.each(need,function(x,i){
		answer[x] = 4;
		answer.total = answer.total + 4;
	})

	var knowSet = mj[set].slice();
	knowSet.push(mj.PongmySets);
	knowSet.push(mj.PonglSets);
	knowSet.push(mj.PongrSets);
	knowSet.push(mj.PonguSets);
	knowSet.push(mj.playedSets);
	knowSet = _.flatten(knowSet);


	_.each(need,function(set,index){
		_.each(knowSet,function(exist,i){
			if(set === exist){
				answer[set]--;
				answer.total --;
			}
		})
	})

	return answer;

}


mj.winningHand = function(position,set,reverse,pop,piece){
	var result = false;
	var theSet = {};
	var pair= [];
	var threes = [];
	var seq = [];
	var seq2 = [];
	var winHand = [];

	//Get Seq first
	var setArray = mj[set].slice();
	
	if(pop){
		var done = false;
		_.each(setArray,function(x,i){
			if(x === piece && !done){
				setArray.splice(i,1)
				done = true;
				return;
			}
		})
	}
	
	setArray.sort();
	

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

	/*
	if(DevStatus){
		console.log(position+' ======================================================');
		console.log('Seq                : '+seq);
		console.log('Threes             : '+threes);
		console.log('Pair               : '+pair);
		console.log('Rest of the card   : '+setArray);
		Dev.pointStats(position,set);
	}
	*/
	
	if(setArray.length === 0 && pair.length === 2){
		return [true,seq,threes,pair,setArray];
	} else {
		return [false,seq,threes,pair,setArray];
	}

};

mj.test = ["bamboo-4", "bamboo-4", "bamboo-5", 
					"bamboo-5","bamboo-6", "bamboo-6", 
					"man-3","man-3",
					"pin-3","pin-3","man-3"];
mj.Pongtest = ['man-7','man-7','man-7'];

mj.testLast = 'man-3'


//Winning Screen
mj.win = function(position,sets){
	this.currentPos = 'win';
	showOppo = true;
	this.refresh('left');
	this.refresh('right');
	this.refresh('up');
	this.displayPong(this['PonglSets'],'left');
	this.displayPong(this['PongrSets'],'right');
	this.displayPong(this['PonguSets'],'up');

	$('#winning').show();
	$('#wMsg').append(position+' Win!!');

	var result = this.winningHand(position,sets);
	if(!result[0]){
		result = this.winningHand(position,sets);
	}
	for(var i=0;i<result[1].length;i++){
		var mj = '<img id="wCard" src="../graphics/'+result[1][i]+'.png"></img>';
		$('.wSet').append(mj);
		if(i===2||i===5||i===8||i===11){
			$('.wSet').append('  <p> </p>  ');
		}
	}
	for(var i=0;i<result[2].length;i++){
		var mj = '<img id="wCard" src="../graphics/'+result[2][i]+'.png"></img>';
		$('.wSet').append(mj);
		if(i===2||i===5||i===8||i===11){
			$('.wSet').append('  <p> </p>  ');
		}
	}
	for(var i=0;i<result[3].length;i++){
		var mj = '<img id="wCard" src="../graphics/'+result[3][i]+'.png"></img>';
		$('.wSet').append(mj);
		if(i===2||i===5||i===8||i===11){
			$('.wSet').append('  <p> </p>  ');
		}
	}
	for(var i=0;i<result[4].length;i++){
		var mj = '<img id="wCard" src="../graphics/'+result[4][i]+'.png"></img>';
		$('.wSet').append(mj);
		if(i===2||i===5||i===8||i===11){
			$('.wSet').append('  <p> </p>  ');
		}
	}

	$('.wSet').append('<br/>');

	var pset = this['Pong'+sets];
	$('.wSet').append('  <p> </p>  ');
	for(var i=0;i<pset.length;i++){
		var mj = '<img id="wCard" src="../graphics/'+pset[i]+'.png"></img>';
		$('.wSet').append(mj);
	}

	var jackpot = this.gameSets.splice(0,4);
	this.displayGameSets();


	$('.wSet').append('<br/>');
  var jp0 = '<img id="jackpot" src="../graphics/'+jackpot[0]+'.png"></img>';
  var jp1 = '<img id="jackpot" src="../graphics/'+jackpot[1]+'.png"></img>';
  var jp2 = '<img id="jackpot" src="../graphics/'+jackpot[2]+'.png"></img>';
  var jp3 = '<img id="jackpot" src="../graphics/'+jackpot[3]+'.png"></img>';

  var winnings = 2;

  _.each(jackpot,function(jpot,i){
  	if(position === 'me'){
  		pot = jpot.split('-')[1];

  		if(pot === '1' || pot === '5' || pot === '9' || pot === 'north'){
  			winnings = winnings +2;
  		}
  	} else if (position === 'right'){
  		pot = jpot.split('-')[1];
  		if(pot === '2' || pot === '6' || pot === 'east' || pot === 'chun'){
  			winnings = winnings +2;
  		}
  	} else if (position === 'up'){
  		pot = jpot.split('-')[1];
  		if(pot === '3' || pot === '7' || pot === 'south' || pot === 'green'){
  			winnings = winnings +2;
  		}
  	} else if (position === 'left'){
  		pot = jpot.split('-')[1];
  		if(pot === '4' || pot === '8' || pot === 'west' || pot === 'haku'){
  			winnings = winnings +2;
  		}
  	}
  })

  var winds = ['me','right','up','left'];

  mj = this;

  
		
	_.delay(function(){
		$('.wSet').before(jp0);
	},500)

	_.delay(function(){
		$('.wSet').before(jp1);
	},1000)

	_.delay(function(){
		$('.wSet').before(jp2);
	},1500)

	_.delay(function(){
		$('.wSet').before(jp3);
	},2000)
		
	_.delay(function(){	
		_.each(winds,function(pos){
	  	if(pos === position){
	  		mj[pos+'Points'] = mj[pos+'Points'] + winnings+ winnings+ winnings;

	  	} else {
	  		mj[pos+'Points'] = mj[pos+'Points'] - winnings;
	  	}
	  	console.log(pos+':'+mj[pos+'Points']);
	  	$('table#winning').append('<tr>'+
	  													'<td>'+pos+'</td>'+
	  													'<td id="number">'+mj[pos+"Points"]+'</td>'+
	  													'</td>');
	  })
  },2500)

}


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
			mj.displayGameSets();
			mj.refresh(position);
			mj.displayPong(mj['Pong'+set],position);
			if(mj.winningHand(position,set)[0] || mj.winningHand(position,set,true)[0]){
				mj.win(position,set);
			return;
		}
	}

	

	var index = mj.nextAI(position, set);

	if(typeof index !== 'number') return;

	var playedSet = mj[set].splice(index,1)[0];
	//console.log(playedSet);
	mj.playedSets.push(playedSet);

	playWood();

	mj.refresh('field');
	mj.refresh(position);
	mj.displayPong(mj['Pong'+set],position);


	if(mj.ifPause(position)[0]==='pong'){
		mj.listenPong(mj.ifPause(position)[1]);
	} else if(mj.ifPause(position)[0]==='kong'){
		mj.listenKong(mj.ifPause(position)[1]);
	} else {
		_.delay(function(){
			if(mj.gameSets.length > 4) {
				if(position === 'right'){
					mj.currentPos === 'up';
					mj.next('up');
				} else if (position === 'left'){
					mj.currentPos = 'me';
					mj.mySets.push(mj.gameSets.pop());
					if(DevStatus){
						Dev.me = mj.nextAI('me','mySets')
					}
					mj.displayGameSets();
					
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.winningHand('me','mySets')[0]|| mj.winningHand('me','mySets',true)[0]){
						mj.win('me','mySets');
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
	mj.displayGameSets();
	mj.refresh('me');
	mj.refresh('left');
	mj.refresh('right');
	mj.refresh('up');

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
		mj.pong('me',mj.addOneBack);
		$('div#panel').fadeOut(200);
	})
	$(document).on('click', 'div#Kong', function(){
		if(mj.addOneBack){
			mj.kong('me');
			$('div#panel').fadeOut(200);
		}
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
					if(mj.winningHand('me','mySets')[0]|| mj.winningHand('me','mySets',true)[0]){
						mj.win('me','mySets');
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