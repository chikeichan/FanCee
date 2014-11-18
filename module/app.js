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

mj.initialize = function(){
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

	$('#wMsg').html('');
	$('.wSet').html('');
	$('table#winning').html('');
	$('div#winning').hide();
	$('.myCanvas img').remove();


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
	mj.sKongmySets = [];
	mj.sKongrSets = [];
	mj.sKonguSets = [];
	mj.sKonglSets = [];
	showOppo = false;
	mj.mePoints = 0;
	mj.rightPoints = 0;
	mj.upPoints = 0;
	mj.leftPoints = 0;
	mj.KongStatus = 'none';
	mj.meCover = '';
	mj.upCover = '';
	mj.rightCover = '';
	mj.leftCover = '';
	mj.mepCover = '';
	mj.uppCover = '';
	mj.rightpCover = '';
	mj.leftpCover = '';



	mj.gameSets = mj.shuffleSets();
	mj.readySets();
	mj.refresh('me');
	mj.refresh('left');
	mj.refresh('right');
	mj.refresh('up');
	mj.refresh('field');
	mj.displayGameSets();
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
mj.sKongmySets = [];
mj.sKongrSets = [];
mj.sKonguSets = [];
mj.sKonglSets = [];
mj.KongStatus = 'none';
mj.house = ['me','mySets'];
mj.meCover = '';
mj.upCover = '';
mj.rightCover = '';
mj.leftCover = '';
mj.mepCover = '';
mj.uppCover = '';
mj.rightpCover = '';
mj.leftpCover = '';
mj.mePoints = 0;
mj.rightPoints = 0;
mj.upPoints = 0;
mj.leftPoints = 0;
mj.meMoney = 50;
mj.rightMoney = 50;
mj.upMoney = 50;
mj.leftMoney = 50;



//Starting at player's position, each position takes turn getting a card counter clockwise
//until player has 14 card.
mj.readySets = function(sets){
	//mj.displayGameSets();


	while(this.gameSets.length > 84){
		this.mySets.push(this.gameSets.pop());
		this.mySets.sort();
		//if(this.mySets.length>13) {return};

		this.rSets.push(this.gameSets.pop());
		this.rSets.sort();
		//if(this.rSets.length>13) {return};

		this.uSets.push(this.gameSets.pop());
		this.uSets.sort();
		//if(this.uSets.length>13) {return};

		this.lSets.push(this.gameSets.pop());
		this.lSets.sort();
		//if(this.lSets.length>13) {return};
	}

	mj[mj.house[1]].push(mj.gameSets.pop());
	mj.currentPos = mj.house[0];
	if(mj.currentPos!=='me'){
		mj.next(mj.house[0],false);
	};
}



//Roll Dice
var roll = new buzz.sound('../diceroll.mp3');
mj.rollDice = function(time){



	var dice1 = _.shuffle(['one','two','three','four','five','six'])[0];
	var dice2 = _.shuffle(['one','two','three','four','five','six'])[0];

	roll.play();
	
	var rolling = setInterval(function(){
		var random1 = _.shuffle(['one','two','three','four','five','six'])[0];
		var random2 = _.shuffle(['one','two','three','four','five','six'])[0];
		$('div#dice1>img').attr('id',random1);
		$('div#dice2>img').attr('id',random2);
	},50);
	
	_.delay(function(){
		clearInterval(rolling);
		$('div#dice1>img').attr('id',dice1);
		$('div#dice2>img').attr('id',dice2);
	},time)

	_.delay(function(){
		mj.initialize();
		$('div.diceset').hide();
	},time+250)

	
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
	var set;
	if(position === 'right'){
			set = 'rSets';
	} else if (position === 'left'){
		set = 'lSets';
	} else if (position === 'up') {
		set = 'uSets';
	} else if (position === 'me') {
		set = 'mySets';
	} else if (position === 'test') {
		set = 'test';
	}

	var currentProb = mj.winProb(position,set);


	if(DevStatus){
		console.log(mj[set]);
		console.log('current Prob ===============')
		console.log(currentProb);
	}

	var nextProb = -1;

	var target = mj.playedSets[mj.playedSets.length-1]
	if(set === 'test') target = mj.testPong;

	if(DevStatus){
		console.log('Should we pong '+target+'?');
	}

	mj[set] = _.without(mj[set], target);
	this['Pong'+set].push(target);
	this['Pong'+set].push(target);
	this['Pong'+set].push(target);

	if(DevStatus){
		console.log(this['Pong'+set])
		console.log('If we do, we will have...');
		console.log(mj[set]);
	}

	_.each(mj[set],function(x,i){
		var temp = mj.winProb(position,set,x);
		//console.log(temp);
		if(temp.total > nextProb){
			nextProb = mj.winProb(position,set,x).total;
		}
	});

	mj['Pong'+set] = _.without(mj['Pong'+set], target);
	mj[set].push(target);
	mj[set].push(target);
	if(DevStatus){
		console.log(currentProb.total)
		console.log(nextProb);
	}
	mj[set].sort();

	if(currentProb.total!== 0 || nextProb !== 0){
		
		return nextProb >= currentProb.total;
	
	}


	var cAvg1 = mj.winningHand(position,set)
	var cAvg2 = mj.winningHand(position,set,true);
	var cTest1 = cAvg1[1].length*3+cAvg1[2].length*3+cAvg1[3].length*2+cAvg1[4].length;
	var cTest2 = cAvg2[1].length*3+cAvg2[2].length*3+cAvg2[3].length*2+cAvg2[4].length;
	var cTest = cTest1 > cTest2 ? cTest1 : cTest2;

	if(DevStatus){
		console.log('If we do not pong, our score is...')
		console.log(cTest);
	}
	
	mj[set] = _.without(mj[set], target);
		
	var nAvg1 = mj.winningHand(position,set)
	var nAvg2 = mj.winningHand(position,set,true);
	var nTest1 = nAvg1[1].length*3+nAvg1[2].length*3+nAvg1[3].length*2+nAvg1[4].length+9;
	var nTest2 = nAvg2[1].length*3+nAvg2[2].length*3+nAvg2[3].length*2+nAvg2[4].length+9;
	var nTest = nTest1 > nTest2 ? nTest1 : nTest2;

	mj[set].push(target);
	mj[set].push(target);
	mj[set].sort();

	if(DevStatus){
		console.log('If we do pong, our score is...');
		console.log(nTest)
		console.log('And to show that mj[set] is back to normal...');
		console.log(mj[set]);
	}
	return nTest >= cTest;

}

mj.returnScore = function(set){
	var AISet = [];

	_.each(set, function(x,i){
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
						if(times === 1){select.cardVal = select.cardVal+1;}
						if(times === 2){select.cardVal = select.cardVal+1;}
						if(times === 3){select.cardVal = select.cardVal+1;}
					};
					if(select.cardNum - compare.cardNum >= -1 && select.cardNum - compare.cardNum <= 1 ){
						select.cardVal++;
					};
					if(select.cardNum - compare.cardNum >= -2 && select.cardNum - compare.cardNum <= 2 ){
						select.cardVal = select.cardVal+1;
					}
				};
				
			}
		}
	}
	return AISet;
}

//determine if a special kong is possible
mj.ifSpecialKong = function(position,set,last){
	var action;

	var dup = 0;
	for(var i=0;i<mj[set].length;i++){
		if(mj[set][i]===last){
			dup++;
			if(dup===4){
				action = 'sKong';
			}
		}
	}

	if(!action){
		if(_.contains(mj['Pong'+set],last)){
			action = 'aKong';
		}
	}

	if(position === 'me'){
		if(action === 'sKong'){
			mj.KongStatus = 'sKong';
			$('div#panel').show();
		} else if (action === 'aKong'){
			mj.KongStatus = 'aKong';
			$('div#panel').show();
		}


	} else {
		return action;
	}
}

//Kong AI just return true for now
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

	var length = _.uniq(mj['Pong'+set]).length;
	if(length>=4){
		mj[position+'pCover'] = mj.currentPos;
	}
	
	mj.refresh(position);
	mj.displayPong(mj['Pong'+set],position);
	mj.refresh('field');

	_.delay(function(){
			if(position === 'right'){
				mj.currentPos = 'right';
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

	mj[position+'Cover'] = mj.currentPos;

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
				mj.currentPos = 'right';
				mj.next('right',true);
			} else if (position === 'left'){
				mj.currentPos = 'left';
				mj.next('left',true);
			} else if (position === 'up') {
				mj.currentPos = 'up';
				mj.next('up',true);
			} else if (position === 'me') {
				mj.currentPos = 'me';
				var last = mj.gameSets.pop();
				mj.mySets.push(last);
				mj.displayGameSets();
				mj.refresh('me');
				mj.displayPong(mj['PongmySets'],'me');
				if(mj.ifWinLoop(mj['mySets'])[0]){
					mj.win('me','mySets');
					return;
				}
				mj['meCover'] = '';
				mj.ifSpecialKong('me','mySets',last);
			}
	},intv());

}
//

mj.sKong = function(position,set,last){
	
		
			mj[set].sort();
			mj[set] = _.without(mj[set],last);

			mj['Pong'+set].push('facedown');
			mj['Pong'+set].push('facedown');
			mj['Pong'+set].push('facedown');
			mj['Pong'+set].push('facedown');

			mj['sKong'+set].push(last);
			mj['sKong'+set].push(last);
			mj['sKong'+set].push(last);
			mj['sKong'+set].push(last);
			

			mj.refresh(position);
			mj.displayPong(mj['Pong'+set],position);

			mj[position+'Points'] = mj[position+'Points'] + 6;
			console.log(mj[position+'Points'])
			var winds = ['me','up','right','left'];
			_.each(winds,function(x,i){
				if(x!== position){
					mj[x+'Points'] = mj[x+'Points'] - 2;
				}
			})


			_.delay(function(){
				if(position === 'right'){
					mj.currentPos = 'right';
					mj.next('right',true);
				} else if (position === 'left'){
					mj.currentPos = 'left';
					mj.next('left',true);
				} else if (position === 'up') {
					mj.currentPos = 'up';
					mj.next('up',true);
				} else if (position === 'me') {
					mj.currentPos = 'me';
					var last = mj.gameSets.pop();
					mj.mySets.push(last);
					mj.displayGameSets();
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.ifWinLoop(mj['mySets'])[0]){
						mj.win('me','mySets');
						return;
					}
					mj.ifSpecialKong('me','mySets',last);
				}
			},intv());
	
}

mj.stealaKong = function(position,piece){
	var steal = false;
	var setStolen;
	var posStolen;
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

		

	_.each(players,function(setStr,i){
		var adjSet = mj[setStr].slice();
		
		adjSet.push(piece);
		adjSet.sort();

		if(mj.ifWinLoop(adjSet)[0]){
			steal = true;
			setStolen = setStr;
		}
	})

	
	if(steal){
		if(setStolen === 'lSets'){
			posStolen = 'left'
		} else if(setStolen === 'rSets'){
			posStolen = 'right'
		} else if(setStolen === 'uSets'){
			posStolen = 'up'
		} else if(setStolen === 'mySets'){
			posStolen = 'me'
		}

		mj[posStolen+'pCover']= position;

		mj[setStolen].push(piece);
		mj.win(posStolen,setStolen);
		mj.currentPos = 'win';
		return true;

	}

	return steal;

}

mj.aKong = function(position,set,last){

			var need = [];
			var key = last.split('-')[0];
			var val = parseInt(last.split('-')[1]);

			var answer = {total: 0};

			if(key!== 'wind' && key !=='zdragon'){
				if(val > 1) need.push(key+'-'+(val-1));
				if(val < 9) need.push(key+'-'+(val+1));

				

				_.each(need,function(x,i){
					answer[x] = 4;
					answer.total = answer.total + 4;
				})

				var knowSet = mj[set].slice();
				knowSet.push(mj.PongmySets);
				knowSet.push(mj.PonglSets);
				knowSet.push(mj.PongrSets);
				knowSet.push(mj.PonguSets);
				if(set === 'test'){
					knowSet.push(mj.Pongtest);
				}
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

				console.log(need)
				console.log(answer);
			}

			var threshold = 99;
			if(mj.gameSets.length < 41){
				threshold = 4;
			} if (mj.gameSets.length <21){
				threshold = 1;
			}

			console.log(threshold);
			console.log(answer.total);

			if(answer.total < threshold || position === 'me'){

		
				mj[set].sort();
				mj[set] = _.without(mj[set],last);


				mj['Pong'+set].push(last);

				mj.refresh(position);
				mj.displayPong(mj['Pong'+set],position);

				if(mj.stealaKong(position,last)){
					console.log('Stolen!')
					return;
				}

				mj[position+'Points'] = mj[position+'Points'] + 3;
				
				var winds = ['me','up','right','left'];
				_.each(winds,function(x,i){
					if(x!== position){
						mj[x+'Points'] = mj[x+'Points'] - 1;
					}
				})



				_.delay(function(){
					if(position === 'right'){
						mj.currentPos = 'right';
						mj.next('right',true);
					} else if (position === 'left'){
						mj.currentPos = 'left';
						mj.next('left',true);
					} else if (position === 'up') {
						mj.currentPos = 'up';
						mj.next('up',true);
					} else if (position === 'me') {
						mj.currentPos = 'me';
						var last = mj.gameSets.pop();
						mj.mySets.push(last);
						mj.displayGameSets();
						mj.refresh('me');
						mj.displayPong(mj['PongmySets'],'me');
						if(mj.ifWinLoop(mj['mySets'])[0]){
							mj.win('me','mySets');
							return;
						}
						mj.ifSpecialKong('me','mySets',last);
					}
				},intv());
			} else {
				mj.next(position,false);
			}
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
					mj.currentPos = 'up';
					mj.next('up');
				} else if (mj.currentPos === 'left'){
					mj.currentPos = 'me';
					var last = mj.gameSets.pop();
					mj.mySets.push(last);
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.ifWinLoop(mj['mySets'])[0]){
						mj.win('me','mySets');
						return;
					}
					mj.ifSpecialKong('me','mySets',last);
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
		mj.KongStatus = 'none';
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
					mj.currentPos = 'up';
					mj.next('up');
				} else if (mj.currentPos === 'left'){
					mj.currentPos = 'me';
					var last = mj.gameSets.pop();
					mj.mySets.push(last);
					mj.refresh('me');
					mj.displayPong(mj['PongmySets'],'me');
					if(mj.ifWinLoop(mj['mySets'])[0]){
						mj.win('me','mySets');
						return;
					}
					mj.ifSpecialKong('me','mySets',last);
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
		mj.KongStatus = 'none';
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
//Simple WinProb for AI
//Winning Probility
mj.simpleWinProb = function(position,set,piece){
	var mj = this;
	var winSet = mj.winningHand(position,set,false,true,piece);
	var revWinSet = mj.winningHand(position,set,true,true,piece);
	var need = [];

	//console.log(winSet);
	//console.log(revWinSet);

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
					if(yvalue > 1) need.push(ykey+'-'+(parseInt(yvalue)-1));
					if(xvalue < 9) need.push(xkey+'-'+(parseInt(xvalue)+1));
				} else if(xvalue - yvalue === -1 ){
					if(xvalue > 1) need.push(ykey+'-'+(parseInt(xvalue)-1));
					if(yvalue < 9) need.push(xkey+'-'+(parseInt(yvalue)+1));
				}
			}

		} else if(pairs.length === 0 && singles.length === 1){
			need.push(singles);
		}
	}

	getNeed(winSet);
	getNeed(revWinSet);
	need = _.flatten(need);
	need = _.uniq(need);

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
	if(set === 'test'){
		knowSet.push(mj.Pongtest);
	}
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

	//console.log(answer);
	return answer;

}
//AI to select which piece to play
mj.nextAI = function(position, set){
	var answer = 'no';
	var AISet = [];
	var realSet = [];

	var groupSet = this.winningHand(position,set);

	var lprob = -1;
	var lindex;
	_.each(mj[set],function(x,i){

		if(mj.simpleWinProb(position,set,x).total > lprob){

			lindex = i;
			lprob = mj.winProb(position,set,x).total;

		}
	})

	if(lprob > 0){
		return lindex;
	}

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
						select.cardVal = select.cardVal+2;
						times++;
						if(times === 1){select.cardVal = select.cardVal+1;}
						if(times === 2){select.cardVal = select.cardVal+1;}
						if(times === 3){select.cardVal = select.cardVal+1;}
					};
					if(select.cardNum - compare.cardNum >= -1 && select.cardNum - compare.cardNum <= 1 ){
						select.cardVal++;
					};
					if(select.cardNum - compare.cardNum >= -2 && select.cardNum - compare.cardNum <= 2 ){
						select.cardVal = select.cardVal+1;
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
	var avg = 0;
	var playIndex = 0;
	

	_.each(AISet,function(x,i){
		var temp = mj.getAvg(AISet,i);
		if(avg < temp){
			avg = temp;
			playIndex = i;
		}
	})

	var playThis = AISet[playIndex];
	//console.log(playThis);
	//console.log(avg);

	for (var i=0;i<this[set].length;i++){
		if(playThis.cardName === this[set][i]){
			return i;
		}
	}
};


//Get average points for the nested Sets, sans a specific index
mj.getAvg = function(nestedSet,withoutIndex){
	var total = 0;
	_.each(nestedSet, function(x,i){
		if(i !== withoutIndex){
			total = total + x.cardVal;
		}
	})
	//console.log(nestedSet);



	if(!withoutIndex) {
		//console.log(total/nestedSet.length);
		return total/nestedSet.length;
	} else {
		//console.log(total/(nestedSet.length-1));
		return total/(nestedSet.length-1);
	}
}



//Winning Probility
//New Win Prob
mj.winProb = function(position,set,piece){
	var mj = this;
	var Set = mj[set].slice();
	var need = [];

	var findAndReplace = function(find,testArray){
		var dup = false;
		_.each(testArray,function(set,i){
			if(find===set && !dup){
				testArray.splice(i,1);
				dup = true;
			}
		})
		return testArray;
	}

	var potential = [];

	var getPot = function(){
		//console.log(Set);
		var calc = _.groupBy(Set,function(x,i){
			return x.split('-')[0];
		})
		
		_.each(calc,function(arr,type){
			_.each(arr,function(set,i){
				potential.push(set);
				if(type !== 'wind' && type !== 'zdragon'){
					var val = set.split('-')[1];
					var pval = set.split('-')[1]-1;
					var nval = pval+2;
					if(val!=1)potential.push(type+'-'+pval);
					if(val!=9)potential.push(type+'-'+nval);
				}
			})
		})

	}

	getPot();
	potential = _.uniq(potential);

	//console.log(potential);


	Set = findAndReplace(piece,Set);
	//console.log(Set);

	_.each(potential,function(potSet,i){
		Set.push(potSet);
		Set.sort();
		
		if(mj.ifWinLoop(Set)[0]){
			need.push(potSet);
			//console.log(Set);
		}
		findAndReplace(potSet,Set);
		Set.sort();
	})

	//console.log(need);

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
	if(set === 'test'){
		knowSet.push(mj.Pongtest);
	}
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

	//console.log(answer);
	return answer;
}

mj.getString = function(){
	var result = [];
	_.each(mj.fullSets,function(x,i){
		_.each(x,function(y,j){
			result.push(i+'-'+j);
		})
	})
	return result;
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


//New winning logic using recursion
mj.ifWin = function(setArray,index){
	var seq = [];
	var threes = [];
	var pairs = [];
	var singles = [];
	var result = false;
	var test= setArray.slice().sort();

	//console.log(test);

	var test = setArray.slice(index,setArray.length);
	test.push(setArray.slice(0,index));
	test = _.flatten(test);

	//console.log(test);

	var findAndReplace = function(find,testArray){
		var dup = false;
		_.each(testArray,function(set,i){
			if(find===set && !dup){
				testArray.splice(i,1);
				dup = true;
			}
		})
		return testArray;
	}

	var findSets = function(sets) {
		var repeat = 0;
		var consec = 0;

		if(sets.length === 2 && singles.length === 0){

			pairs = [sets[0],sets[1]]
			result = sets[0]===sets[1];			

		} else {
			for (var i=1;i<sets.length;i++){
				var pkey = sets[i-1].split('-')[0];
				var pval = sets[i-1].split('-')[1];
				var key = sets[i].split('-')[0];
				var val = sets[i].split('-')[1];

				if(key === pkey && val === pval){
					repeat++;
					if(repeat === 2){

						if(i<sets.length-1 && consec === 1 ){
							var nkey = sets[i+1].split('-')[0];
							var nval = sets[i+1].split('-')[1];

							if(nkey === key && nval-val === 1){
								repeat = 0;
								consec = 0;
								ppval = (val-1).toString();
								var temp = [key+'-'+ppval,key+'-'+val,key+'-'+nval]
								
								_.each(temp,function(x,j){
									sets = findAndReplace(x,sets);
									seq.push(x);
								})
								findSets(sets);
							} else {
								repeat = 0;
								consec = 0;
								var temp = [key+'-'+val,key+'-'+val,key+'-'+val]
								
								_.each(temp,function(x,j){
									sets = findAndReplace(x,sets);
									threes.push(x);
								})
								findSets(sets);
							}
						} else {
							repeat = 0;
							consec = 0;
							var temp = [key+'-'+val,key+'-'+val,key+'-'+val]
							
							_.each(temp,function(x,j){
								sets = findAndReplace(x,sets);
								threes.push(x);
							})
							findSets(sets);
						}
					}
				} else if(key===pkey && key !== 'zdragon' && key !== 'wind' && val-pval == 1){
					repeat = 0;
					consec++;
					if(consec === 2){
						repeat = 0;
						consec = 0;
						ppval = (val-2).toString();

						var temp = [key+'-'+ppval,key+'-'+pval,key+'-'+val]
						
						_.each(temp,function(x,j){
							sets = findAndReplace(x,sets);
							seq.push(x);
						})
						findSets(sets);
					}
				} else {
					repeat = 0;
					consec = 0;
					var temp = pkey+'-'+pval;
					
					sets = findAndReplace(temp,sets);
					singles.push(temp);
					findSets(sets);
				}
			}
		}
	}

	findSets(test);

	return [result,seq,threes,pairs,singles];

}


//run ifWin recursively until a win combo is achieved, or return false
mj.ifWinLoop = function(setArray){
	for(var i=0;i<setArray.length;i++){
		var result = mj.ifWin(setArray,i);
		if(result[0]){
			return result;
		}
	}
	return [false];
}

mj.test = ["bamboo-9", "bamboo-9", "bamboo-9",
					"wind-east","wind-east","wind-east",
					"wind-west","wind-west","wind-west",
					"pin-9",'bamboo-1',"pin-9",'bamboo-1'];
mj.Pongtest = [];
mj.testPong = 'wind-east';
mj.testLast = 'bamboo-1'
mj.test.sort();
mj.sKongtest = [];


//Winning Screen
mj.win = function(position,sets){
	this.currentPos = 'win';
	
	showOppo = true;
	this.refresh('left');
	this.refresh('right');
	this.refresh('up');
	this.refresh('me');


	this.PonglSets = _.without(this.PonglSets,'facedown');
	this.PongrSets = _.without(this.PongrSets,'facedown');
	this.PonguSets = _.without(this.PonguSets,'facedown');
	this.PongmySets = _.without(this.PongmySets,'facedown');

	this.PonglSets.push(this.sKonglSets);
	this.PongrSets.push(this.sKongrSets);
	this.PonguSets.push(this.sKonguSets);
	this.PongmySets.push(this.sKongmySets);

	this.PonglSets = _.flatten(this.PonglSets);
	this.PongrSets = _.flatten(this.PongrSets);
	this.PonguSets = _.flatten(this.PonguSets);
	this.PongmySets = _.flatten(this.PongmySets);


	this.displayPong(this['PonglSets'],'left');
	this.displayPong(this['PongrSets'],'right');
	this.displayPong(this['PonguSets'],'up');
	this.displayPong(this['PongmySets'],'me');

	var winds = ['me','right','up','left'];
	var mj = this;

	$('#winning').show();
	$('#wMsg').append(position+' Win!!');


	if(position !== "No Body") {

		var result = mj.ifWinLoop(mj[sets]);
		
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
	  var jp = '<img id="jackpot" src="../graphics/facedown.png"></img>'

	  var winnings = 2;

	  var rjp;
	  var ujp;
	  var ljp;
	  var mjp;
	  if(this.house[0]==='me'){
	  	mjp = ['1','5','9','north'];
	  	rjp = ['2','6','east','chun'];
	  	ujp = ['3','7','south','green'];
	  	ljp = ['4','8','west','haku'];
	  } else if(this.house[0]==='right'){
	  	rjp = ['1','5','9','north'];
	  	ujp = ['2','6','east','chun'];
	  	ljp = ['3','7','south','green'];
	  	mjp = ['4','8','west','haku'];
	  } else if(this.house[0]==='up'){
	  	ujp = ['1','5','9','north'];
	  	ljp = ['2','6','east','chun'];
	  	mjp = ['3','7','south','green'];
	  	rjp = ['4','8','west','haku'];
	  } else if(this.house[0]==='left'){
	  	ljp = ['1','5','9','north'];
	  	mjp = ['2','6','east','chun'];
	  	rjp = ['3','7','south','green'];
	  	ujp = ['4','8','west','haku'];
	  }

	  this.house = [position,sets];



	  _.each(jackpot,function(jpot,i){
	  	if(position === 'me'){
	  		pot = jpot.split('-')[1];

	  		_.each(mjp,function(val,index){
	  			if(pot === val){
	  				winnings = winnings +2;
	  			}
	  		})
	  	} else if (position === 'right'){
	  		pot = jpot.split('-')[1];
	  		_.each(rjp,function(val,index){
	  			if(pot === val){
	  				winnings = winnings +2;
	  			}
	  		})
	  	} else if (position === 'up'){
	  		pot = jpot.split('-')[1];
	  		_.each(ujp,function(val,index){
	  			if(pot === val){
	  				winnings = winnings +2;
	  			}
	  		})
	  	} else if (position === 'left'){
	  		pot = jpot.split('-')[1];
	  		_.each(ljp,function(val,index){
	  			if(pot === val){
	  				winnings = winnings +2;
	  			}
	  		})
	  	}
	  })

	  

	  mj = this;

	  $('.wSet').before(jp);
	  $('.wSet').before(jp);
	  $('.wSet').before(jp);
	  $('.wSet').before(jp);

			
		_.delay(function(){
			$('img#jackpot').remove();
			$('.wSet').before(jp0);
			$('.wSet').before(jp);
		  $('.wSet').before(jp);
		  $('.wSet').before(jp);
		},500)

		_.delay(function(){
			$('img#jackpot').remove();
			$('.wSet').before(jp0);
			$('.wSet').before(jp1);
		  $('.wSet').before(jp);
		  $('.wSet').before(jp);
		},1000)

		_.delay(function(){
			$('img#jackpot').remove();
			$('.wSet').before(jp0);
			$('.wSet').before(jp1);
		  $('.wSet').before(jp2);
		  $('.wSet').before(jp);
		},1500)

		_.delay(function(){
			$('img#jackpot').remove();
			$('.wSet').before(jp0);
			$('.wSet').before(jp1);
		  $('.wSet').before(jp2);
		  $('.wSet').before(jp3);
		},2000)


		_.each(winds,function(pos){
	  	if(pos === position){
	  		mj[pos+'Points'] = mj[pos+'Points'] + winnings+ winnings+ winnings;
	  		

	  	} else {
	  		var cover = mj[position+'Cover'];
	  		var pcover = mj[position+'pCover'];
	  		console.log(cover);
	  		console.log(pcover);
	  		if(pcover!==''){
	  			mj[pcover+'Points'] = mj[pcover+'Points'] - winnings;
	  		} else if(cover!==''){
	  			mj[cover+'Points'] = mj[cover+'Points'] - winnings;
	  		} else {
	  			mj[pos+'Points'] = mj[pos+'Points'] - winnings;
	  		}
	  		
	  	}
	  })

		_.delay(function(){	
			var color;

		  _.each(winds,function(pos){
		  	
		  	mj[pos+'Money'] = mj[pos+'Money'] + mj[pos+'Points'];
		  	if(mj[pos+"Points"] > 0) {
		  		color = 'green';
		  	} else {
		  		color = 'red';
		  	}
		  	$('table#winning').append('<tr>'+
		  													'<td>'+pos+'</td>'+
		  													'<td id="number"><font color="'+color+'">'+mj[pos+"Points"]+'</font></td>'+
		  													'<td id="bank">'+mj[pos+"Money"]+'</td>'+
		  													'</td>');

		  	
		  })
	  },2500)
	} else {
		
		_.each(winds,function(pos){
			
	  	$('table#winning').append('<tr>'+
	  													'<td>'+pos+'</td>'+
	  													'<td id="bank">'+mj[pos+"Money"]+'</td>'+
	  													'</td>');
	  })
	  

	}



}
//calcualte interval score
var intv = function(pos){
	return 500;
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
		set = 'mySets';
		mj.currentPos = 'me';
	}

	if (mj.gameSets.length < 5) {
		mj.currentPos = 'over';
		mj.displayGameSets();
		mj.win('No Body');
		return;
	}

	var last;
	if(draw === false) {

	} else {
		last = mj.gameSets.pop()
		mj[set].push(last);
		mj.displayGameSets();
		mj.refresh(position);
		mj.displayPong(mj['Pong'+set],position);
		if(mj.ifWinLoop(mj[set])[0]){
			mj.win(position,set);
			return;
		}
		mj[position+'Cover'] = '';
	}

	if (mj.gameSets.length < 5) {
		mj.currentPos = 'over';
		mj.displayGameSets();
		mj.win('No Body');
		return;
	}

	if(mj.ifSpecialKong(position,set,last) === 'sKong'){

		mj.sKong(position,set,last);
	
	} else if (mj.ifSpecialKong(position,set,last) === 'aKong'){

		mj.aKong(position,set,last);

	} else {

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
						mj.currentPos = 'up';
						mj.next('up');

					} else if (position === 'left'){
						mj.currentPos = 'me';
						var last = mj.gameSets.pop();
						mj.mySets.push(last);
						if(DevStatus){
							Dev.me = mj.nextAI('me','mySets')
						}
						mj.displayGameSets();
						
						mj.refresh('me');
						mj.displayPong(mj['PongmySets'],'me');
						if(mj.ifWinLoop(mj['mySets'])[0]){
							mj.win('me','mySets');
							return;
						}
						if (mj.gameSets.length < 5) {
							mj.currentPos = 'over';
							mj.displayGameSets();
							mj.win('No Body');
							return;
						}
						mj.ifSpecialKong('me','mySets',last);

					} else if (position === 'up') {
						mj.currentPos = 'left';
						mj.next('left');
					}
				}
			},intv(position));
		}
	}
}






//DOM Manipulation and Interactions
$(document).ready(function(){
	mj.gameSets = mj.shuffleSets();
	mj.gameSets.length = 96;
	mj.displayGameSets();

	$(document).on('click','.diceset',function(){
		
		mj.rollDice(1000);
	})
	

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
		if(mj.KongStatus==='none'){
			mj.pong('me',mj.addOneBack);
			$('div#panel').fadeOut(200);
		}
	})
	$(document).on('click', 'div#Kong', function(){
		if(mj.addOneBack){
			mj.kong('me');
			$('div#panel').fadeOut(200);
		} else if (mj.KongStatus === 'sKong'){
			mj.sKong('me','mySets',mj.meLast);
			mj.KongStatus = 'none';
			$('div#panel').fadeOut(200);
		} else if (mj.KongStatus === 'aKong'){
			mj.aKong('me','mySets',mj.meLast);
			mj.KongStatus = 'none';
			$('div#panel').fadeOut(200);
		}
	})

	$(document).on('click', 'div#replay', function(){
		$('div.myCanvas img').remove();
		mj.gameSets = mj.shuffleSets();
		mj.gameSets.length = 96;
		mj.displayGameSets();

		if(mj.house[0]!=='me'){
			$('div#winning').hide();
			$('div.diceset').show();
			mj.rollDice(1000);
		} else {
			$('div#winning').hide();
			$('div.diceset').show();
		}
	})

	$(document).on('click', 'div#Null', function(){
		if(mj.KongStatus==='none'){
			_.delay(function(){
				if(mj.gameSets.length > 4) {
					if(mj.currentPos === 'right'){
						mj.currentPos = 'up';
						mj.next('up');
					} else if (mj.currentPos === 'left'){
						mj.currentPos = 'me';
						var last = mj.gameSets.pop();
						mj.mySets.push(last);
						mj.refresh('me');
						mj.displayPong(mj['PongmySets'],'me');
						if(mj.ifWinLoop(mj['mySets'])[0]){
							mj.win('me','mySets');
							return;
						}
						mj.ifSpecialKong('me','mySets',last);
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
		}
	})

	$(document).on('click','img#me',function(){
		$('img#selected').attr('id','me');
		$('img#me').stop().animate({
			'top': '0px'
		},100);
		$(this).attr('id','selected')
		$(this).stop().animate({
			'top': '-20px'
		},100);
	});

	
	$(document).on('click','#selected',function(){
		if(mj.currentPos === 'me') {
			var set = mj.readSet(this.src);
			var setStr = set[0]+'-'+set[1];
			var index = 0;
			_.find(mj.mySets, function(x,i){
					index = i;
					return x === setStr;
			})

			$('div#panel').fadeOut(200);
			

			mj.mySets.splice(index,1);
			mj.playedSets.push(setStr);

			playWood();

			mj.refresh('field');
			mj.refresh('me');
			mj.displayPong(mj['PongmySets'],'me');
			

			if(mj.ifPause('me')[0]==='pong'){
				mj.listenPong(mj.ifPause('me')[1]);
			} else if(mj.ifPause('me')[0]==='kong'){
				mj.listenKong(mj.ifPause('me')[1]);
			} else {
				mj.currentPos = 'right';
				_.delay(function(){
					mj.next('right');
				},intv('me'));
			}
		}
	})
	




})