export function parseTableData(board: string): {table: number[][], size:number} {
  let data = {
    table: [],
    size: 3
  }

  data.size = Math.sqrt(board.length);

  for(let i = 0; i < board.length; ++i) {
    let row = [];

    data.table.push()
  }

  return data;
}

export function boardStringify(board: number[][], size:number): string {
  let string = "";

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      string += board[i][j];
    }
  }

  return string;
}

export function transposedArry(board: number[][]) {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

export function getWinner( board: number[][], size: number ): number {
  // row
  for(let i = 0; i < size; i++) {
    if( board[i].every( cell => cell === 1) ) {
      return 1;
    }
    if( board[i].every( cell => cell === 2) ) {
      return 2;
    }
  }

  // col
  const tBoard = transposedArry(board);

  for(let i = 0; i < size; i++) {
    if( tBoard[i].every( cell => cell === 1) ) {
      return 1;
    }
    if( tBoard[i].every( cell => cell === 2) ) {
      return 2;
    }
  }

  let diff = false;
  for (let i = 1; i < size; i++) {
    if (board[i][i] !== board[0][0]) {
      diff = true;
    }
  }
  if (!diff) {
    return board[0][0];
  }

  diff = false;
  for (let i = 0; i < size; i++) {
    if (board[i][size-i-1] !== board[0][size-1]) {
      diff = true;
    }
  }
  if (!diff) {
    return board[0][size-1];
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if(board[i][j] === 0) {
        return 0
      }
    }
  }

  return 3;
}
