
const convertedtimeDuration = (totalSeconds) => {
    const Hours = Math.floor(totalSeconds/3600);
    const minutes = Math.floor((totalSeconds%3600)/60); // this will give you the remaining minutes
    const seconds= Math.floor((totalSeconds%3600)%60); // will give you about the reminaing seconds 

    if(Hours > 0){
        return  `${Hours}h ${minutes}m` ;

    }
    else if(minutes > 0){
        return `${minutes}m ${seconds}s` ;
    }
    else {
    return `${seconds}s` ;

    }
}


module.exports = {
    convertedtimeDuration , 
}