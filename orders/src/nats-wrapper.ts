import nats, {Stan} from "node-nats-streaming"
class NatsWrapper{
      private _client? :Stan

      get client(){
            if(!this._client){
                  throw new Error("Cannot access _client before connect success")
            }
            return this._client
      }
      connect(clusterId: string, clientId:string, url:string ){
            this._client = nats.connect(clusterId, clientId, {url})
            return new Promise((resolve,reject) =>{
                  this._client!.on("connect", ()=>{
                        resolve(1)
                  });
                  this._client!.on("error",()=>{
                        reject()
                  })
            })
           
      }
}
export const natsWrapper = new NatsWrapper()