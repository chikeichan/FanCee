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
	for (var i=0; i<set.length; i++){
		var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
		$pos.append(mj);
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

	mj.readSet = function(set){
		set = set.replace('.png','');
		set = set.split('/');
		set = set[set.length-1];
		return set.split('-');
	};

	mj.refresh = function(position){
		var $pos = $('div#'+position);
		$pos.html('');
		mj.displayCard(mj.mySets, position);
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
			$('div#field').append('<img id="field" src="../graphics/'+setStr+'.png"></img>');
			mj.refresh('me');
			mj.currentPos = 'right';
			mj.next('right');
		}
	})

	mj.next = function(position){
		var set;
		if(position === 'right'){
			set = 'rSets';
		} else if (position === 'left'){
			set = 'lSets';
		} else if (position === 'up') {
			set = 'uSets';
		} else if (position === 'me') {
			mj.currentPos = 'me';
		}

		mj[set].push(mj.gameSets.pop());
		var $pos = $('div#'+position);
		$pos.html('');
		mj.displayOpponents(mj[set], position);

		var playedSet = mj[set].splice(5,1)
		mj.playedSets.push(playedSet);
		$('div#field').append('<img id="field" src="../graphics/'+playedSet+'.png"></img>');
		$pos.html('');
		mj.displayOpponents(mj[set], position);
		
		if(mj.gameSets.length > 0) {
			if(position === 'right'){
				mj.currentPos === 'up';
				mj.next('up');
			} else if (position === 'left'){
				mj.currentPos = 'me';
				mj.mySets.push(mj.gameSets.pop());
				mj.refresh('me');
			} else if (position === 'up') {
				mj.currentPos = 'left';
				mj.next('left');
			}
		} 
		

	}



})