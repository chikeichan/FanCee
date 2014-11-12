var mj = {};

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

mj.mySets = [];
mj.rSets = [];
mj.uSets = [];
mj.lSets = [];
mj.playedSets = [];
mj.currentPos = 'me';



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

mj.displayCard = function(set, position){
	var $pos = $('div#'+position);
	set.sort();
	for (var i=0; i<set.length; i++){
		var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.append(mj);
	}
}

mj.displayOpponents = function(set, position) {
	var $pos = $('div#'+position);
	set.sort();
	for (var i=0; i<set.length; i++){
		var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.append(mj);
	}
}

mj.displayPong = function(set, position) {
	var $pos = $('div#'+position);
	for (var i=0; i<set.length; i++){
		var mj = '<img id="p'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.prepend(mj);
	}
}

mj.ifPong = function(position){
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

mj.pongAI = function(position){
	return true;
}

mj.PongmySets = [];
mj.PongrSets = [];
mj.PonguSets = [];
mj.PonglSets = [];

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


mj.listenPong = function(position){
	var lastSet = mj.playedSets[mj.playedSets.length-1];

	
	if(position!=='me'){
		if(mj.pongAI(position)){
			mj.pong(position);
		}
	} else {
		$('div#panel').fadeIn(200);

	}
}

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


	mj.readSet = function(set){
		set = set.replace('.png','');
		set = set.split('/');
		set = set[set.length-1];
		return set.split('-');
	};

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
			mj.refresh('field');
			mj.refresh('me');
			mj.displayPong(mj['PongmySets'],'me');
			mj.currentPos = 'right';

			if(mj.ifPong('me')[0]){
				mj.listenPong(mj.ifPong('me')[1]);
			} else {
				_.delay(function(){
					mj.next('right');
				},500);
			}
		}
	})

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
		}

		var playedSet = mj[set].splice(5,1)[0]
		mj.playedSets.push(playedSet);

		mj.refresh('field');
		mj.refresh(position);
		mj.displayPong(mj['Pong'+set],position);


		if(mj.ifPong(position)[0]){
			mj.listenPong(mj.ifPong(position)[1]);
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
					} else if (position === 'up') {
						mj.currentPos = 'left';
						mj.next('left');
					}
				}
			},500);
		}
		

	}



})