import NetworkSpeed from 'network-speed';


async function main(){
const test = new NetworkSpeed();
const speed = await test.checkDownloadSpeed('https://avatars.githubusercontent.com/u/124164882?v=4', 4);
return speed
} 
main().then(r=>{
    console.log(r)
}).catch(e=>{
    console.error(e)
})
