const MC_DAY = 1200000
const MC_MONTH = 37200000
const MC_YEAR = 446400000 //Real Life ms
const MC_HOUR = MC_DAY/24
const MC_MINUTE = MC_HOUR/60
const SB_NEWYEAR = 1560275700000 //Skyblock Year 1
// const IRL_HOUR = 3600000

// var CUSTOM_OFFSET = 0;

export function sbGetYear(time:number){
    var sbCurtime = (time-SB_NEWYEAR) % MC_YEAR
	var sbCurYear = time - sbCurtime;
	return 1+(sbCurYear-SB_NEWYEAR)/MC_YEAR
}
// var curtime = new Date().getTime() + CUSTOM_OFFSET;
// var SB_YEAR = sbGetYear(curtime);
