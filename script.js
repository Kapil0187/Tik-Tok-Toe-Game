 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGamebtn = document.querySelector(".btn");

 let currentPlayer;
 let gameGrid;

 const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    //remove element from UI
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })
    boxes.forEach((box)=>{
        box.classList.remove("win");
    })
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }
 initGame();
 

 function swapTurn(){
    if(currentPlayer=='X')
    {
        currentPlayer = 'O';
    }
    else
    {
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }

 function checkGameOver(){
    let ans = "";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!==""  && gameGrid[position[2]]!=="") 
           && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]==='X')
                ans = "X";
            else
                ans = "O";
            
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!=="")
    {
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGamebtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    })

    if(fillCount===9)
    {
        gameInfo.innerText = `Game Over`;
        newGamebtn.classList.add("active");
        return;
    }
 }
 
 function handleClick(index){
    if(gameGrid[index]==="")
    {
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;
        // swap tern
        swapTurn();
         //check any onew is win or not
        checkGameOver();         
    }
 }

 boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index); 
    })
 })


 newGamebtn.addEventListener("click",initGame);

