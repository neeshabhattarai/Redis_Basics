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
            const signal={expired:false};
            setTimeout(()=>{
                signal.expired=true;
            },4000);
            const proxy=await buildProxy(3000);
        //    await acquire(3500);

          return await cb(proxy,signal);
             
        }finally{
            await redisClient.releaseLock(lockKey,lockValue);
        }
    }
};

const acquire=async(timeout)=>{
 return await new Promise(resolve=>{
       setTimeout(resolve,timeout);
    });
}

const buildProxy=async(timeout)=>{
    const startTime=Date.now();
    const handler={
        get:(target,prop)=>{
            if(Date.now()>=startTime+timeout){
                throw new Error('Lock timeout');
            }
            const value=target[prop];
          return  typeof value==='function'?value.bind(target):value;
        }
    }
    return new Proxy(redisClient,handler);
}

module.exports={
    createLock
}