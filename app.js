const draggableList = document.querySelectorAll('.draggable');
const droggableList = document.querySelectorAll('.droggable');

draggableList.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

droggableList.forEach(item => {
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
    item.addEventListener('dragleave', dragLeave);
});

function dragStart(event){
    event.dataTransfer.setData('type', event.target.getAttribute('data-bs-type'));
    event.dataTransfer.setData('function', event.target.getAttribute('data-bs-function'));
}

function dragEnter(event){
   event.preventDefault();
   if(event.target.classList){
        if(!event.target.classList.contains('over'))
            event.target.classList.add('over');
   }
  
   
}
function dragOver(event){
    event.preventDefault();
    if(event.target.classList){
        if(!event.target.classList.contains('over'))
            event.target.classList.add('over');
    }
    
}
function drop(event){
    event.preventDefault();
    if(event.target.classList){
        if(event.target.classList.contains('over'))
            event.target.classList.remove('over');
    }
    const scope = angular.element(document.getElementById('app_main')).scope();
    const type = event.dataTransfer.getData('type');
    const func = event.dataTransfer.getData('function');
    scope.addQuestion(modelGenerator(type, func));
    console.log(scope.questions);
}
function dragLeave(event){
    event.preventDefault();
    if(event.target.classList){
        if(event.target.classList.contains('over'))
            event.target.classList.remove('over');
    }
}

function modelGenerator(type, func){
    switch(type){
        case 'Divier': return divierModel(func);
        case 'Exponential': return exponentialModel(func);
        case 'Combination': return combinationModel();
        case 'Permutation': return permutationModel();
        case 'Functions': return functionsModel();
    }
}
function divierModel(func){
    return {
        type: 'Divier',
        function: func,
        input: '',
        output: ''
    };
}
function exponentialModel(func){
    return {
        type: 'Exponential',
        function: func,
        exponentials: [{
            base: '',
            pow: '',
            isBrackets: false
        },
        {
            base: '',
            pow: '',
            isBrackets: false
        }],
        optLength: 2,
        output: ''
    }
}
function combinationModel(){
    return {
        type: 'Combination',
        function: 'base',
        opts: [
            {
                N:'',
                R:''
            }
        ],
        optLength: 1,
        isCluster: false,
        cluster: '',
        subClusterCount: 0,
        included: '',
        notIncluded: '',
        output: ''
    }
}
function permutationModel(){
    return {
        type: 'Permutation',
        function: 'base',
        opts: [
            {
                N:'',
                R:'',
                identicalCount: 1,
                indenticals: [{
                    identical: ''
                }]
            }
        ],
        optLength: 1,
        isIdentical: false
    }
}
function functionsModel(){
    return {
        type: 'Functions',
        function: 'base',
        opts: [
            {
                parameters:[
                    {
                        param: '',
                        value: ''
                    }
                ],
                parametersLenght: 1,
                function: ''
            }
        ],
        optLength: 1,
        output:''
    }
}


angular.module('app_main', [])
.filter('divierFunctions', function(){
    return function(item){
        switch(item.function){
            case '2':return divier2(item);
            case '3':return divier3(item);
            case '4':return divier4(item);
            case '5':return divier5(item);
            case '6':return divier6(item);
            case '7':return divier7(item);
            case '8':return divier8(item);
            case '9':return divier9(item);
            case '10':return divier10(item);
            case '11':return divier11(item);
            case '12':return divier12(item);
        }
    }
    function divier2(item){
        const input = item.input;
        if(input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        const num = Number(input.charAt(input.length-1));
        const result = num % 2 === 0;
        if(result){
            return item.input + ' Say??s?? 2\' ye tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 2\' ye tam b??l??nm??yor. 2\' ye tam b??l??nebilmesi i??in girilen say??n??n birler basama???? 2 nin kat?? olmal??d??r.';
        }
    }
    function divier3(item){
        let sum = 0;
        if(item.input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        for(let i = 0; i < item.input.length; i++){
            sum += Number(item.input.charAt(i));
        }
        const result = sum % 3 === 0;
        if(result){
            return item.input + ' Say??s?? 3\'e tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 3\' e tam b??l??nm??yor. 3\' e tam b??l??nebilmesi i??in girilen say??n??n rakamlar?? toplam?? 3 ve 3\' ??n kat?? olmal??d??r.';
        }
    }
    function divier4(item){
        const input = item.input;
        if(input.length < 2){
            return item.input + ' Say??s?? en az 2 basamakl?? olmal??d??r.';
        }
        const num = Number(input.substring(input.length - 2, input.length));
        const result = num % 4 === 0;
        if(result){
            return item.input + ' Say??s?? 4\' e tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 4\' e tam b??l??nm??yor. 4\' e tam b??l??nebilmesi i??in girilen say??n??n birler ve onlar basama???? 00 ya da 4\' ??n kat?? olmal??d??r.';
        }
    }
    function divier5(item){
        const input = item.input;
        if(input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        const num = Number(input.charAt(input.length -1));
        console.log(num);
        const result = (num === 0 || num === 5);
        if(result){
            return item.input + ' Say??s?? 5\' e tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 5\' e tam b??l??nm??yor. 5\' e tam b??l??nebilmesi i??in girilen say??n??n birler basama???? 0 veya 5 olmal??d??r.';
        }
    }
    function divier6(item){
        const input = item.input;
        if(input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        const num = Number(input);
        const result = (num % 2 == 0 && num % 3 === 0);
        if(result){
            return item.input + ' Say??s?? 6\' ya tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 6\' ya tam b??l??nm??yor. 6\' ya tam b??l??nebilmesi i??in girilen say??n??n hem 2\'ye hem 3\'e kalans??z b??l??nebiliyor olmal??d??r.';
        }
    }
    function divier7(item){ // alternative Number(item.input) % 7 === 0
        const input = item.input;
        if(input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        let sum = 0;
        let subSum = 0;
        const weights = [1, 3, 2];
        let count = 0;
        let weight = 1;
        for(let i = input.length -1;  i >= 0; i--){
            subSum += (Number(input.charAt(i))*weights[count % 3]);
            count++;
            if(count % 3 === 0){
                sum += weight * subSum;
                subSum = 0;
                weight *= -1;
            }
        }
        sum += weight * subSum;
        const result = sum % 7 == 0;
        if(result){
            return item.input + ' Say??s?? 7\' ya tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 7\' ya tam b??l??nm??yor. 7\' ya tam b??l??nebilmesi i??in girilen say??n??n hem 7\' hem 7\' ye kalans??z b??l??nebiliyor olmal??d??r.';
        }
    }
    function divier8(item){ // alternative Number(item.input) % 8 === 0
        const input = item.input;
        if(input.length < 3){
            return item.input + ' Say??s?? en az 3 basamakl?? olmal??d??r.';
        }
        const num = Number(input.substring(input.length - 3, input.length));
        const result = num % 8 === 0;
        if(result){
            return item.input + ' Say??s?? 8\' e tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 8\' e tam b??l??nm??yor. 8\' e tam b??l??nebilmesi i??in girilen say??n??n birler, onlar  ve y??zler basama???? 000 ya da 8\' in kat?? olmal??d??r.';
        }
    }
    function divier9(item){
        let sum = 0;
        if(item.input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        for(let i = 0; i < item.input.length; i++){
            sum += Number(item.input.charAt(i));
        }
        const result = sum % 9 === 0;
        if(result){
            return item.input + ' Say??s?? 9\' a tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 9\' a tam b??l??nm??yor. 9\' a tam b??l??nebilmesi i??in girilen say??n??n rakamlar?? toplam?? 9 ve 9\' un kat?? olmal??d??r.';
        }
    }
    function divier10(item){
        const input = item.input;
        if(input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        const num = Number(input.charAt(input.length -1));
        const result = (num === 0);
        if(result){
            return item.input + ' Say??s?? 10\' a tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 10\' a tam b??l??nm??yor. 10\' a tam b??l??nebilmesi i??in girilen say??n??n birler basama???? 0 olmal??d??r.';
        }
    }
    function divier11(item){
        const input = item.input;
        if(input.length == 0){
            return 'En az 1 basamakl?? olmal??d??r.';
        }
        const num = Number(input.charAt(input.length -1));
        let sum = 0;
        let weight = 1;
        for(let  i = input.length -1; i >= 0; i--){
            sum  += Number(input.charAt(i)) * weight;
            weight *= -1;
        }
        const result = sum % 11 === 0;
        if(result){
            return item.input + ' Say??s?? 11\' e tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 11\' e tam b??l??nm??yor. 11 ile tam olarak b??l??nebilmesi i??in, say??n??n rakamlar??n??n alt??na birler basama????ndan ba??layarak s??ras??yla +, -, +, -, ... i??aretleri yaz??l??r, art??l?? gruplar kendi aras??nda ve eksili gruplar kendi aras??nda toplan??r, fark?? al??n??r. Genel toplam??n 11 e b??l??m??nde kalan 0 ise say?? 11\'e tam b??l??n??r. Sonu?? negatif ????karsa sonuca +11 eklenir. ';
        }
    }
    function divier12(item){
        const input = item.input;
        if(input.length < 2){
            return item.input + ' Say??s?? en az 2 basamakl?? olmal??d??r.';
        }
        const num = Number(input);
        const result = (num % 3 == 0 && num % 4 === 0);
        if(result){
            return item.input + ' Say??s?? 12\' ye tam b??l??n??yor.';
        }else{
            return item.input + ' Say??s?? 12\' ye tam b??l??nm??yor. 12\' ye tam b??l??nebilmesi i??in girilen say??n??n hem 3\'e hem 4\'e kalans??z b??l??nebiliyor olmal??d??r.';
        }
    }
})
.filter('ExponentialFunctions', function(){
    return function(item){
        switch(item.function){
            case 'sum': return '????lem Sonucu: ' + sumOpt(item);
            case 'sub': return '????lem Sonucu: ' + subOpt(item);
            case 'mul': return '????lem Sonucu: ' + mulOpt(item);
            case 'div': return '????lem Sonucu: ' + divOpt(item);
        }
    }
    function sumOpt(item){
        const exponentials = item.exponentials;
        let sum = 0.0;
        for (let i = 0; i < exponentials.length; i++){
            sum += Math.pow(exponentials[i].base, exponentials[i].pow);
        }
        return exponentialPrime(sum);
    }
    function subOpt(item){
        const exponentials = item.exponentials;
        let sub = Math.pow(exponentials[0].base, exponentials[0].pow);
        for (let i = 1; i < exponentials.length; i++){
            sub -= Math.pow(exponentials[i].base, exponentials[i].pow);
        }
        console.log(sub);
        return exponentialPrime(sub);
    }
    function mulOpt(item){
        const exponentials = item.exponentials;
        if(baseEqual(exponentials)){
            let sumPow = 0;
            for (let i = 0; i < exponentials.length; i++){
                sumPow += Number(exponentials[i].pow);
            }
            return exponentials[0].base + '^' + sumPow;
        }else if(powEqual(exponentials)){
            let mulBase = 1;
            for (let i = 0; i < exponentials.length; i++){
                mulBase *= Number(exponentials[i].base);
            }
            return mulBase + '^' + exponentials[0].pow;
        }else{
            let mul = 1;
            for (let i = 0; i < exponentials.length; i++){
                mul *= Math.pow(exponentials[i].base, exponentials[i].pow);
            }
            return exponentialPrime(mul);
        }
    }
    function divOpt(item){
        const exponentials = item.exponentials;
        if(baseEqual(exponentials)){
            let subPow = Number(exponentials[0].pow);
            for (let i = 1; i < exponentials.length; i++){
                subPow -= Number(exponentials[i].pow);
            }
            return exponentials[0].base + '^' + subPow;
        }else if(powEqual(exponentials)){
            let divBase = exponentials[0].base;
            for (let i = 1; i < exponentials.length; i++){
                divBase /= Number(exponentials[i].base);
            }
            return divBase + '^' + exponentials[0].pow;
        }else{
            let div = Math.pow(exponentials[0].base, exponentials[0].pow);
            for (let i = 1; i < exponentials.length; i++){
                div /= Math.pow(exponentials[i].base, exponentials[i].pow);
            }
            return exponentialPrime(sub);
        }
    }
    function baseEqual(exponentials){
        if(exponentials.length === 0){
            return false;
        }
        let result = true;
        const firstBase = exponentials[0].base;
        for(let i = 1; i < exponentials.length; i++){
            result &= (firstBase === exponentials[i].base);
        }
        return result;
    }
    function powEqual(exponentials){
        if(exponentials.length === 0){
            return false;
        }
        let result = true;
        const firstPow = exponentials[0].pow;
        for(let i = 1; i < exponentials.length; i++){
            result &= (firstPow === exponentials[i].pow);
        }
        return result;
    }
    function exponentialPrime(num){
        let bolen = 2;
        const map = new Map();
        let newNum = Math.abs(num);
        while(newNum >= 2){
          if(newNum % bolen === 0){
              if(map.has(bolen)){
                  map.set(bolen, (map.get(bolen) + 1));
              }else{
                  map.set(bolen, 1);
              }
              newNum /= bolen;
            }else{
              bolen++;
            }
        }
        return exponentialPrimeToString(num < 0, map);
    }
    function exponentialPrimeToString(isNegative = false, map){
        let result = '';
      	map.forEach((pow, base) =>{
          if(result !== ''){
                result += '*';
            }
            result += base + '^' + pow;
        });
        if(isNegative){
            result  = '-' + result;
        }
        return result;
    }
})
.filter('ExponentialFunctionLabel', function(){
    return function(func){
        switch(func){
            case 'sum': return 'toplama';
            case 'sub': return '????karma';
            case 'mul': return '??arpma';
            case 'div': return 'b??lme';
        }
    }
})
.filter('ExponentialFunctionOpt', function(){
    return function(func){
        switch(func){
            case 'sum': return '+';
            case 'sub': return '-';
            case 'mul': return 'x';
            case 'div': return '/';
        }
    }
})
.filter('CombinationFunctions',function(){
    return function(item){
        const optLabel = '????lem Sonucu: ';
        if(!item.isCluster){
            switch(item.function){
                case 'base':return optLabel + baseOpt(item);
                case 'sum':return optLabel + sumOpt(item);
                case 'mul':return optLabel + mulOpt(item);
            }
        }else{
            return optLabel + clusterOpt(item);
        }
        
    }
    function clusterOpt(item){
        if(item.cluster.length > 1){
            const valid = validClusters(item);
            if(valid != null){
                return valid;
            }
            if(!Boolean(item.included) && !Boolean(item.notIncluded)){
                const clusterCount = clusterElementCount(item.cluster);
                return (factoriel(clusterCount)/(factoriel(clusterCount - item.subClusterCount) * factoriel(item.subClusterCount)));
            }else{
                let clusterCount =  clusterElementCount(item.cluster);
                let subClusterCount = item.subClusterCount;
                if(item.included.length > 0){
                    const includedCount = clusterElementCount(item.included);
                    clusterCount -= includedCount;
                    subClusterCount -= includedCount;
                }
                if(item.notIncluded.length > 0){
                    clusterCount -= clusterElementCount(item.notIncluded);
                }
                console.log(clusterCount);
                console.log(subClusterCount);
                return (factoriel(clusterCount)/(factoriel(clusterCount - subClusterCount) * factoriel(subClusterCount)));
            }
        }else{
            const cluster = clusterElementCount(item.cluster);
            if(cluster < item.subClusterCount){
                return 'Hata: Alt k??me eleman say??s?? en fazla k??me eleman?? kadar olabilir.'; 
            }
            return (factoriel(cluster.length)/(factoriel(cluster.length - item.subClusterCount) * factoriel(item.subClusterCount)));
        }
    }
    function validClusters(item){
        const pattern = /^([a-zA-z0-9]+,)*([a-zA-Z0-9])$/;
        if(item.cluster.length === 0){
            return 'Hata: K??me bo?? olamaz.';
        }
        if(!pattern.test(item.cluster)){
            return 'Hata: K??me elemanlar?? \',\' ile ayr??lmal??d??r.';
        }
        if(clusterElementCount(item.cluster) < item.subClusterCount){
            return 'Hata: Alt k??me eleman say??s?? en fazla k??me eleman?? kadar olabilir.';
        }
        if(Boolean(item.included) && clusterElementCount(item.included) > 0 && !pattern.test(item.included)){
            return 'Hata: Bulunacak eleman k??mesi hatal??.';
        }
        if(Boolean(item.notIncluded) && clusterElementCount(item.notIncluded) > 0 && !pattern.test(item.notIncluded)){
            return 'Hata: Bulunmayacak eleman k??mesi hatal??.';
        }
        if(Boolean(item.included) && clusterElementCount(item.included) > 1  && !availableClusterElement(item.cluster, item.included)){
            return 'Hata: Bulunacak eleman k??mesinde ge??ersiz k??me eleman??.';
        }
        if(Boolean(item.notIncluded) && clusterElementCount(item.notIncluded) > 1 && !availableClusterElement(item.cluster, item.notIncluded)){
            return 'Hata: Bulunmayacak eleman k??mesinde ge??ersiz k??me eleman??.';
        }
        return null;
    }
    function availableClusterElement(cluster, testCluster){
        const clusterArr = cluster.split(',');
        const testClusterArr = testCluster.split(',');
        let result = true;
        for(let i = 0; i < testClusterArr.length; i++){
            result &= clusterArr.includes(testClusterArr[i]);
        }
        return result;
    }
    function clusterElementCount(cluster){
        if(cluster.includes(',')){
            return cluster.split(',').length;
        }else{
            return 1;
        }
    }
    function baseOpt(item){
        if(item.opts === 0){
            return '-';
        }
        const opt = item.opts[0];
        return factoriel(Number(opt.N))/(factoriel(Number(opt.N) - Number(opt.R)) * factoriel(Number(opt.R)));
    }
    function sumOpt(item){
        if(item.opts === 0){
            return '-';
        }
        let sum = 0;
        const opts = item.opts;
        for(let i = 0; i < opts.length; i++){
            const opt = opts[i];
            sum += (factoriel(Number(opt.N))/(factoriel(Number(opt.N) - Number(opt.R)) * factoriel(Number(opt.R))));
        }
        return sum;
    }
    function mulOpt(item){
        if(item.opts === 0){
            return '-';
        }
        let mul = 1;
        const opts = item.opts;
        for(let i = 0; i < opts.length; i++){
            const opt = opts[i];
            mul *= (factoriel(Number(opt.N))/(factoriel(Number(opt.N) - Number(opt.R)) * factoriel(Number(opt.R))));
        }
        return mul;
    }
    function factoriel(num){
        let result = 1;
        for(let i = 2; i <= num; i++){
            result *= i;
        }
        return result;
    }
})
.filter('CombinationFunctionOpt', function(){
    return function(func){
        switch(func){
            case 'sum': return '+';
            case 'mul': return '*';
            default: return '';
        }
    }
})
.filter('Functions', function(){
    return function(item){
        const labelOpt = '????lem sonucu: ';
        switch(item.function){
            case 'base': return labelOpt + baseOpt(item);
        }
    }
    function baseOpt(item){
        const opt = item.opts[0];
        let optFunction = opt.function;
        const functionToPostFix = infixToPostfix(optFunction);
        console.log(functionToPostFix);
        return evaluatePostfix(opt.parameters, functionToPostFix);
    }
    function evaluatePostfix(parameters, exp){
        let stack = [];
        for(let i = 0; i < exp.length; i++)
        {
            let character = exp[i];
            if(isNumber(character)){
                stack.push(Number(character));
            }else if(isLetter(character)){
                for(let j = 0; j < parameters.length; j++){
                    if(parameters[j].param === character){
                        console.log(parameters[j].value);
                        stack.push(Number(parameters[j].value));
                    }
                }
            }else{
                let val1 = stack.pop();
                let val2 = stack.pop();
                switch(character){
                    case '+':
                        stack.push(val2+val1);
                        break;
                    case '-':
                        stack.push(val2- val1);
                        break;
                    case '/':
                        stack.push(val2/val1);
                        break;
                    case '*':
                        stack.push(val2*val1);
                        break;
                    case '^':
                        stack.push(Math.pow(val2,val1));
                        break;    
                }
            }
        }
        console.log(stack);
        return stack.pop();  
    }
    function infixToPostfix(exp){
        let stack = [];
        let result = '';
        for(let chr of exp){
            if(isLetter(chr) || isNumber(chr)){
                result += chr;
            }else if(chr === '('){
                stack.push(chr);
            }else if(chr === ')'){
                while(stack.length !== 0 && stack[stack.length-1] !== '('){
                    result += stack.pop();
                }
              	stack.pop();
            }else{
                while(stack.length !== 0 && prec(chr) <= prec(stack[stack.length-1])){
                  result += stack.pop();
                }
                stack.push(chr);
            }
        }
  			while(stack.length !== 0){
           if(stack[stack.length -1] === '('){
                return 'Ge??ersiz ifade';
           }
           result += stack.pop();
        }
        return result;
    }
    function isLetter(chr){
        if(chr.toUpperCase() !== chr.toLowerCase())
            return true;
        return false;    
    }
    function isNumber(chr){
        if(!isNaN(parseInt(chr))){
            return true;
        }
        return false;
    }
    function prec(chr){
        switch (chr){
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
          	default: return -1;    
        }
    }
})
.filter('PermutationFunctions', function(){
    return function(item){
        const message = isValid(item);
        const optLabel = '????lem sonucu: ';
        if(message != null){
            return optLabel + message;
        }
        if(item.isIdentical){
            switch(item.function){
                case 'base':
                    return optLabel + identicalOpt(item.opts[0]);
                case 'sum':
                    return optLabel + identicalSumOpt(item);
                case 'mul':
                    return optLabel + identicalMulOpt(item);
                default:
                    return optLabel + 'Hata: ge??ersiz i??lem.';    
            }
        }else{
            switch(item.function){
                case 'base':
                    return optLabel + permutation(item.opts[0]);
                case 'sum':
                    return optLabel + sumOpt(item);
                case 'mul':
                    return optLabel + mulOpt(item);
                default:
                    return optLabel + 'Hata: ge??ersiz i??lem.';    
            }
        }
    }
    function sumOpt(item){
        let sum = 0;
        const opts = item.opts;
        for(let i = 0; i < opts.length; i++){
            sum += permutation(opts[i]);
        }
        return sum;
    }
    function mulOpt(item){
        let mul = 1;
        const opts = item.opts;
        for(let i = 0; i < opts.length; i++){
            mul *= permutation(opts[i]);
        }
        return mul;
    }
    function identicalSumOpt(item){
        let sum = 0;
        const opts = item.opts;
        for(let i = 0; i < opts.length; i++){
            sum += identicalOpt(opts[i]);
        }
        return sum;
    }
    function identicalMulOpt(item){
        let mul = 1;
        const opts = item.opts;
        for(let i = 0; i < opts.length; i++){
            mul *= identicalOpt(opts[i]);
        }
        return mul;
    }
    function identicalOpt(opt){
        const nFactoriel = factoriel(Number(opt.N));
        let mul = 1;
        const indenticals = opt.indenticals;
        for(let i = 0; i < indenticals.length; i++){
            mul *= factoriel(Number(indenticals[i].identical));
        }
        return nFactoriel / mul;
    }
    function permutation(opt){
        const nFactoriel = factoriel(Number(opt.N));
        return nFactoriel / factoriel(Number(opt.N) - Number(opt.R));
    }
    function isValid(item){
        if(item.opts.length === 0) {
            return 'Hata: ????lem adedi minimum 1 olmal??d??r.';
        }
        for(let i = 0; i < item.opts.length; i++){
            const opt = item.opts[i];
            if(!Boolean(opt.N)){
                return 'Hata: N de??eri bo?? b??rak??lamaz';
            }
            if(item.isIdentical){
                if(opt.indenticals.length === 0){
                    return 'Hata: ??zde?? say??s?? 0 olamaz';
                }
                for(let j = 0 ; j < opt.indenticals.length; j++){
                    const indentical = opt.indenticals[j];
                    if(!Boolean(indentical)){
                        return 'Hata: ??zde?? eleman?? bo?? b??rak??lamaz';
                    }
                }
            }else{
                if(!Boolean(opt.R)){
                    return 'Hata: R de??eri bo?? b??rak??lamaz';
                }
            }
        }
        return null;
    }
    function factoriel(num){
        let result = 1;
        for(let i = 2; i <= num; i++){
            result *= i;
        }
        return result;
    }
})
.filter('PermutationFunctionOpt', function(){
    return function(func){
        switch(func){
            case 'sum': return '+';
            case 'mul': return '*';
            default: return '';
        }
    }
})
.controller('app_controller', function($http, $scope, $filter){
    $scope.questions = [];
    $scope.properties = null;
    $scope.propertiesIndex = null;
    $scope.addQuestion = function(item){
        $scope.questions.push(item);
        $scope.$apply();
    }

    $scope.calculator = function(index){
        const item = $scope.questions[index];
        $scope.questions[index].output = calculatorOpt(item);
    }
    $scope.openProperties = function(index){
        $scope.properties = $scope.questions[index];
        $scope.propertiesIndex = index;
    }
    function calculatorOpt(item){
        switch(item.type){
            case 'Divier': return $filter('divierFunctions')(item);
            case 'Exponential': return $filter('ExponentialFunctions')(item);
            case 'Combination': return $filter('CombinationFunctions')(item);
            case 'Permutation': return $filter('PermutationFunctions')(item);
            case 'Functions': return $filter('Functions')(item);
        }
    }

    //Change Listener
    $scope.propertiesChange = function(){
        const item = $scope.questions[$scope.propertiesIndex];
        if(!Boolean(item.optLength)){
            return;
        }
        if(Number(item.optLength) === 0){
            item.optLength = 1;
        }
        if(Number(item.optLength) > 1 && item.function === 'base'){
            item.function = 'sum';
        }
        if(item.optLength === 1 && ((item.function ==='sum') ||(item.function === 'mul'))){
            item.optLength = 2;
        }
        switch(item.type){
            case 'Exponential':
                item.exponentials = [];
                for(let i = 0; i < item.optLength; i++){
                    item.exponentials.push(modelGenerator(item.type, item.function));
                }
                break;
            case 'Combination':
                item.opts = [];
                for(let i = 0; i < item.optLength; i++){
                    item.opts.push({
                        N: '',
                        R: ''
                    });
                }
                break;    
            case 'Permutation':
                    item.opts = [];
                    for(let i = 0; i < item.optLength; i++){
                        item.opts.push({
                            N:'',
                            R:'',
                            identicalCount: 1,
                            indenticals: [{
                                identical: ''
                            }]
                        });
                    }
                    break;   
            case 'Functions':
                    item.opts = [];
                    for(let i = 0; i < item.optLength; i++){
                        item.opts.push({
                            parameters:[
                                {
                                    param: '',
                                    value: ''
                                }
                            ],
                            function: ''
                        });
                    }
                    break;              
        }
    }
    $scope. functionsParamsChange = function(item){
        if(!Boolean(item.parametersLenght)){
            return;
        }
        if(item.parametersLenght < 1){
            item.parametersLenght = 1;
        }
        item.parameters = [];
        for(let i = 0; i < item.parametersLenght; i++){
            item.parameters.push({
                param: '',
                value: ''
            });
        }
    }
    $scope.changeIndeticalCount = function(item){
        const opt = item;
        if(!Boolean(opt.identicalCount)){
            return;
        }
        opt.identicalCount = Number(opt.identicalCount);
        if(opt.identicalCount === 0){
            opt.identicalCount = 1;
        }
        opt.indenticals = [];
        for(let i = 0; i < opt.identicalCount; i++){
            opt.indenticals.push({
                identical: ''
            });
        }
    }
});