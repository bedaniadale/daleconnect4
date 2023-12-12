//https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/qd1p2yaogl41ymtozppc.jpg



var boardUser = [[0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0] ,[0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0]]

//declare move buttons
let col1 = document.querySelector(".col1") 
let col2 = document.querySelector(".col2") 

let col3 = document.querySelector(".col3") 
let col4 = document.querySelector(".col4") 
let col5 = document.querySelector(".col5") 
let col6 = document.querySelector(".col6") 
let col7 = document.querySelector(".col7") 
let curruser = document.querySelector("#curruser")  
let resetbutton = document.querySelector(".restart") 


function showWinner(user) {
    let userwinner = '' 
    let color = ''; 
    if(user == 1){  
        userwinner = document.getElementById("player1").innerHTML 
        color = 'red'
    } else { 
        userwinner = document.getElementById("player2").innerHTML
        color = 'yellow'
    }
    let popup = document.querySelector(".winner-pop") 
    let winnertext = document.querySelector("#winner")
    popup.style.display = "flex"
    winnertext.innerHTML = userwinner + " - wins" + `(${color})`
}

function checkRows(user) {
    let combo = [user, user,user,user]
    for(let x = 0; x < 6; x++) { 
        for(let y = 0; y < 7-3; y++) { 
            let a = boardUser[x][y]
            let b = boardUser[x][y+1]
            let c = boardUser[x][y+2] 
            let d = boardUser[x][y+3] 
          
            if(a == combo[0] && b == combo[1] && c == combo[2] && d == combo[3]) { 
                return true
            } 
        }
    }
} 

function checkCols(user) {
    let combo = [user,user,user,user]
    for(let x = 0; x < 7; x++){ 
        for(let y = 0; y < 6-3; y++){
            let a = boardUser[y][x]
            let b = boardUser[y+1][x]
            let c = boardUser[y+2][x]
            let d = boardUser[y+3][x]
            
            if(a == combo[0] && b == combo[1] && c == combo[2] && d == combo[3]) { 
                return true
            } 

        }
    }
} 

function checkDiagonal(user) { 
    let combo = [user,user,user,user]
    let bu = boardUser
   
    //left to right -> center  to down
    let ltrcd1 = [bu[0][0], bu[1][1], bu[2][2], bu[3][3], bu[4][4], bu[5][5]]
    let ltrcd2 = [bu[1][0], bu[2][1], bu[3][2], bu[4][3], bu[5][4]]
    let ltrcd3 = [bu[2][0], bu[3][1], bu[4][2], bu[5][3]]

    //left to right -> center to up
    let ltrcu1 = [bu[0][1], bu[1][2], bu[2][3], bu[3][4], bu[4][5], bu[5][6]]
    let ltrcu2 =[bu[0][2], bu[1][3], bu[2][4], bu[3][5], bu[4][6]] 
    let ltrcu3 = [bu[0][3], bu[1][4], bu[2][5], bu[3][6]]

    //right to left -> center to up
    let rtlcu1 = [bu[5][0], bu[4][1], bu[3][2], bu[2][3], bu[1][4], bu[0][5]]
    let rtlcu2 = [bu[4][0], bu[3][1], bu[2][2], bu[1][3], bu[0][4]]
    let rtlcu3 = [bu[3][0], bu[2][1], bu[1][2], bu[0][3]] 

    //right to left -> center to down 
    let rtlcd1 = [bu[5][1], bu[4][2], bu[3][3], bu[2][4], bu[1][5], bu[0][6]]
    let rtlcd2 = [bu[5][2], bu[4][3], bu[3][4], bu[2][5], bu[1][6]]
    let rtlcd3 = [bu[5][3], bu[4][4], bu[3][5], bu[2][6]]

    let diagonals = [ltrcd1, ltrcd2, ltrcd3, ltrcu1, ltrcu2, ltrcu3, rtlcu1, rtlcu2, rtlcu3, rtlcd1, rtlcd2, rtlcu3]


    for(let i = 0; i < diagonals.length; i++) { 
        if(diagonals[i].length == 4) { 
            let a = diagonals[i][0]
            let b = diagonals[i][1]
            let c = diagonals[i][2] 
            let d = diagonals[i][3]
            if(a == combo[0] && b == combo[1] && c == combo[2] && d == combo[3]) { 
                return true
            }
        } else { 
            for(let j = 0; j <= diagonals[i].length-4; j++) { 
                let a = diagonals[i][j]
                let b = diagonals[i][j+1]
                let c = diagonals[i][j+2] 
                let d = diagonals[i][j+3]
                if(a == combo[0] && b == combo[1] && c == combo[2] && d == combo[3]) { 
                    return true
                }

            }
        }
    }


}


function resetGame() { 
    boardUser = [[0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0] ,[0,0,0,0,0,0,0], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0]]
    loadBoard()
    let popup = document.querySelector(".winner-pop")
    popup.style.display = "none"
    curruser.innerHTML = "PLAYER 1"
}



function getCurrentUser() { 
    if(curruser.innerHTML == "PLAYER 1") {
        return 1
    }
   
    return 2 
}
function insertMove(user, col) {
    if(boardUser[0][col] != 0)  { 
        alert("FULL"); 
        return

    }

    let index = 5; 
    while(index >= 0) { 
        if(boardUser[index][col] == 0){ 
            if(user == 1) { 
                boardUser[index][col] = 1 
                curruser.innerHTML = "PLAYER 2"
                if(checkRows(1) == true) { 
                    showWinner(1)
                    return
                }

                if(checkCols(1)== true) { 
                    showWinner(1)
                    return
                }
                if(checkDiagonal(1)== true) { 
                    showWinner(1)
                    return
                }
                return

                
            } else { 
                boardUser[index][col] =2;
                curruser.innerHTML = "PLAYER 1"
                if(checkRows(2) == true) { 
                    showWinner(2)
                    return 
                } 
                if(checkCols(2) == true) { 
                    showWinner(2)
                    return 
                } 
                if(checkDiagonal(2)== true) { 
                    showWinner(2)
                    return
                }
                return 
            }
        }
        index--; 
    }

}

//load board
function loadBoard() { 
    let board = document.querySelector(".board-box")
    board.innerHTML = ''
    let tab = ''
    for(let i = 0; i < 6; i++) { 
        tab+="<div class ='row'>"
        for(let j = 0; j < 7; j++) { 
            if(boardUser[i][j] == 1) { 
                tab+=` <div class="slot"> <div class="circle p1circle"></div></div>`
            } else if(boardUser[i][j] == 2) { 
                tab+=` <div class="slot"> <div class="circle p2circle"></div></div>`
            } else { 
                tab+=` <div class="slot"> <div class="circle"></div></div>`
            }
            
        }
        tab+=`</div>`
    }


    board.innerHTML = tab
}
// on startup of page 

loadBoard()

//event listeners
col1.addEventListener("click",()=> {
    insertMove(getCurrentUser(), 0)
    loadBoard()
}) 

col2.addEventListener("click",()=> {
    insertMove(getCurrentUser(), 1)
    loadBoard()
}) 

col3.addEventListener("click",()=> {
    insertMove(getCurrentUser(), 2)
    loadBoard()
}) 

col4.addEventListener("click",()=> {
    insertMove(getCurrentUser(), 3)
    loadBoard()
}) 

col5.addEventListener("click",()=> {
    insertMove(getCurrentUser(),4)
    loadBoard()
}) 


col6.addEventListener("click",()=> {
    insertMove(getCurrentUser(), 5)
    loadBoard()
}) 


col7.addEventListener("click",()=> {
    insertMove(getCurrentUser(), 6)
    loadBoard()
}) 



//event listener reset
resetbutton.addEventListener("click",()=> { 
    resetGame()
})