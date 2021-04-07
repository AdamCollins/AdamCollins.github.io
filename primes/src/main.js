const maxNum = 10000;
const primeList = document.getElementById("prime-list");
const nextBtn = document.getElementById("next-btn");
const nextN = document.getElementById("next-n");
const infoElm = document.getElementById("info")
let numSet = new Set();

nextBtn.addEventListener('click',elimNext);


init();
function init(){
    // get list of nums from 0-maxNum
    numSet = new Set([...Array(maxNum+1).keys()]);

    // get rid of 0
    numSet.delete(0);
    // get rid of 1
    numSet.delete(1);

    numSet.forEach((n)=>{
        let elm = document.createElement('div');
        elm.textContent = n;
        elm.dataset['key'] = n;
        primeList.appendChild(elm);
    })
}



const cnmGen = elimNextGenerator();
function elimNext(){
    
    let data = cnmGen.next().value;
    setTimeout(()=>{
        nextN.textContent = data.nextNum;
        infoElm.textContent = `${data.numRemoved} numbers eliminated in ${Math.floor(data.time)} ms`;
    },500); 


}




function* elimNextGenerator(){
    // Create iterator of multiplicand
    let multicandItr = numSet.values();
    let nextN = multicandItr.next(); 

    while(!nextN.done){
        let n = nextN.value;
        // Make new iterator of multiples
        let multiplierItr = [...numSet].values();
        let multiplier = multiplierItr.next();

        let numRemoved = 0;
        let startTime = performance.now();
        while(!multiplier.done){
            let prod = n*multiplier.value;
            if(numSet.has(prod)){
                numSet.delete(prod);
                primeList.querySelector(`div[data-key="${prod}"]`).classList.add('hide');
                numRemoved++;
            }
            multiplier = multiplierItr.next();
        }
        primeList.querySelector(`div[data-key="${n}"]`).classList.add('isPrime');
        numSet.delete(n);
        nextN = multicandItr.next();
        let endTime = performance.now() 

        yield {nextNum:nextN.value, numRemoved, time:endTime-startTime};
    }
}
