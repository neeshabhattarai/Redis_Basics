const {randomBytes} = require('crypto');
const redisClient = require("../model/redisConnector");
const createLock = async (key,cb) => {
    const releaseTimeout=200;
    let retryCount=25;
    const lockKey=`lock:${key}`;
    const lockValue=randomBytes(16).toString('hex');
    while(retryCount>0){
        retryCount-=1;
        const lockResult=await redisClient.set(lockKey,lockValue,{
            NX:true,
            PX:5000
        });
        if(!lockResult){
          await acquire(releaseTimeout);
            continue;
        }
        try{
          return await cb();
             
        }finally{
            await redisClient.del(lockKey);
        }
    }
};

const acquire=async(timeout)=>{
    await new Promise(resolve=>{
       setTimeout(resolve,timeout);
    });
}
module.exports={
    createLock
}