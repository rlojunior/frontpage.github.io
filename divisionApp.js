function generateQuestion(){

    var numOfQuestions = 20;
    
    createQuestionElement(numOfQuestions,".row");
    createQuestionElement(numOfQuestions,".rowAnswer");

    for(var i=0; i<numOfQuestions;i++){
        createDivisionElements("#here"+i);  }

    
   populateQuestions(numOfQuestions );
    
}



function populateQuestions(numQuestions){

    var userFont = "Verdana";
    var userSizeFont = "20px";

    for(var i=0; i<numQuestions;i++){
        var selectedNumbers = selectTwoNumbers(3,2,true); // Remainders = 0 AND remainder != 0 (All mixed)
                    //CASES     
                //selectTwoNumbers(3,2,true); // Remainders = 0 AND remainder != 0 (All mixed)
            // selectTwoNumbers(3,2,false); //(RUNS INFINITY LOOP) Remainders = 0  ONLY 
            
            // selectTwoNumbers(3,1,true); // Remainders = 0 AND remainder != 0 (All mixed)
            // selectTwoNumbers(3,1,false); // Remainders = 0  ONLY 

            // selectTwoNumbers(2,1,true);  // Remainders = 0 AND remainder != 0 (All mixed)
            //selectTwoNumbers(2,1,false); //Remainders = 0  ONLY

            //selectTwoNumbers(4,2,true); // Remainders = 0 AND remainder != 0 (All mixed)
            //selectTwoNumbers(4,2,false); //(RUNS INFINITY LOOP) Remainders = 0  ONLY
                
            //selectTwoNumbers(4,1,false); // Remainders = 0  ONLY

        var tableElement = document.getElementById("here"+i);
        var trElement = tableElement.getElementsByTagName("tr")[0];
        var tdElement1 = trElement.getElementsByTagName("td")[0];
        var spanElement1 = trElement.getElementsByTagName("span")[0].innerHTML = selectedNumbers[1];
        trElement.getElementsByTagName("span")[0].style.fontFamily = userFont;
        trElement.getElementsByTagName("span")[0].style.fontSize = userSizeFont;


        var tdElement2 = trElement.getElementsByTagName("td")[1];
        var spanElement2 = tdElement2.getElementsByTagName("span")[1].innerHTML = selectedNumbers[0];
        tdElement2.getElementsByTagName("span")[1].style.fontFamily = userFont;
        tdElement2.getElementsByTagName("span")[1].style.fontSize = userSizeFont;
        

        var divElementAnswer = document.getElementsByClassName("rowAnswer")[0]
        var tableElementAnswer = divElementAnswer.getElementsByTagName("table")[i]. innerHTML = selectedNumbers[0]+ " ÷ " + selectedNumbers[1]+" = "+ selectedNumbers[2] +" R"+selectedNumbers[3]
        divElementAnswer.getElementsByTagName("table")[i].style.fontFamily = userFont;
        divElementAnswer.getElementsByTagName("table")[i].style.fontSize = userSizeFont;

    }


}

function selectTwoNumbers(digitsNumA, digitsNumB, remainder){ // returns [numA, numB, result(integer part), Remainder of numA / numB] 
    // numA divided by numB -> select two number, remainder = false -> means NO remainder
    
    var minNum = Math.pow(10,digitsNumA-1);
    var tempNum = 0;
    var maxNum = 0;
    var numB = 0;
    var numA = 0;
    var remainderVal = -1;


    for(var i=0; i<digitsNumA;i++){
        tempNum += Math.pow(10,i);        
    }
    
    maxNum = tempNum*9; 
      
    while(getNumberLength(numA) != digitsNumA){
        numA = Math.floor((Math.random() * maxNum) + minNum);
    }
    
    
    if(remainder == false){   //remainder == false The user doesn't want division with remainder (WANTS remainder = 0)
        var multiplesOfA = multiplesOf(numA);
        //console.log(multiplesOfA);
        if(getNumberLength(multiplesOfA) == 1){
            numA = Math.floor((Math.random() * maxNum) + minNum);
            numB = random_item(multiplesOfA);
        } else {
            while(getNumberLength(numB) != digitsNumB){
                numB = random_item(multiplesOfA);
    
                if(numB == 1){   //divided by 1 is boring, in that case, do it again.
                    numB = random_item(multiplesOfA);
                }
                remainderVal = numA % numB;
            }
        }
        
    } else { //remainder == true  -> the user WANTS division with remainder (WANTS remainder != 0  MAY ACCEPTS remainder = 0, need to check  mixedCalculation  )
        minNum = Math.pow(10,digitsNumB-1);
        tempNum = 0;
        for(var i=0; i<digitsNumB;i++){
            tempNum += Math.pow(10,i);        
        }
        maxNum = tempNum*9;

        numB = Math.floor((Math.random() * maxNum) + minNum);
        
        while(getNumberLength(numB) != digitsNumB){
            numB = Math.floor((Math.random() * maxNum) + minNum);
        }

        
        
        
    }
    
     

    //console.log("Min: " + minNum +" Max:  "+maxNum);
   // console.log(numA +" divided by "+numB + " remainder: "+ numA % numB);

    return [numA, numB, Math.floor(numA / numB), numA % numB];

} // end of selectTwoNumbers

function getNumberLength(num) {
    return Math.ceil(Math.log10(num + 1));
  }

function random_item(items){  //https://www.w3resource.com/javascript-exercises/javascript-array-exercise-35.php
    return items[Math.floor(Math.random()*items.length)];     
}

function multiplesOf(num){ //return a list with the multiple of "num"
    var multiplesList = [];
    for(var i=1; i<num;i++){
        if(num%i == 0){
            multiplesList.push(i);
        }
    }
    return multiplesList;
}


function createQuestionElement(num, className){ //create the html spot on the page. This spot will be populated with each question
    var myNode = document.querySelector(className);

    for(var i=0; i<num;i++){
        var divElement = document.createElement("DIV");
        divElement.setAttribute("class","column");
        var tableElement = document.createElement("TABLE");
        tableElement.setAttribute("id","here"+i);
        divElement.appendChild(tableElement);
        myNode.appendChild(divElement);
    }
}


function createDivisionElements(tableId){ // create the division algorithm symbol + create the spot to put the numbers
    var myNode = document.querySelector(tableId);
    var trElement = document.createElement("TR");
    
        var tdElement1 = document.createElement("TD");
            tdElement1.setAttribute("style","position:relative;");
                var spanElement1 = document.createElement("SPAN");
                spanElement1.setAttribute("style","position:absolute; top:5px; right:-3px;");
                spanElement1.setAttribute("id","span1");
                tdElement1.appendChild(spanElement1);
            trElement.appendChild(tdElement1);

        var tdElement2 = document.createElement("TD");
            tdElement2.setAttribute("style","position:relative;");
                var spanElement2A = document.createElement("SPAN");
                    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svgElement.setAttribute("style","width: 90px; height: 30px;");
                        var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathElement.setAttribute("d","M 77.3,1 L 1,1 a5.4,9.1 0 0,1 1,27.8");
                        pathElement.setAttribute("fill","none");
                        pathElement.setAttribute("stroke","black");
                        pathElement.setAttribute("stroke-width","1");
                    svgElement.appendChild(pathElement);
                spanElement2A.appendChild(svgElement);
            tdElement2.appendChild(spanElement2A);            
                
                var spanElement2B = document.createElement("SPAN");
                spanElement2B.setAttribute("style","position:absolute; top:5px; left:15px;");
                spanElement2B.setAttribute("id","span2");
            tdElement2.appendChild(spanElement2B);
        
    trElement.appendChild(tdElement2);

    myNode.appendChild(trElement);
}

