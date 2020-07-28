class RequestLimit {
    constructor (limit) {
        this.limit = limit || 2;
        this.waitQueue = [];
        this.currentNum = 0

    }
    async request(req) {
        if (!req) throw new Error('req is required.')
        if (Object.prototype.toString.call(req) !== '[object Function]') throw new Error ('Req must be a function.')
        if (this.currentNum >= this.limit) {
            await new Promise ((resolve) => this.waitQueue.push(resolve))
        }
        return this.handleReq(req)
    }
    async handleReq(req) {
        this.currentNum++
        try{
            return await req()
        } catch (err){
            return Promise.reject(err)
        }finally {
            this.currentNum--
            if(this.waitQueue.length) {
                this.waitQueue[0]()
                this.waitQueue.shift()
            }
        }

    }
}