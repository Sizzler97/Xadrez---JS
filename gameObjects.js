 
    class Piece
    {
        constructor(color)
        {
            this.color = color;
            this.hasMoved = false;
        }
    }

    var canEnPassant = false;

    class Pawn extends Piece {

        constructor(color)
        {
            super(color);

            this.symbol = color === "white" ? "♙" : "♟";
        }
        EnPassant(board, x, y, direction) {
            const moves = [];

            if (isInside(board, x + 1, y) && board[y][x + 1].piece instanceof Pawn && board[y][x + 1].piece.color !== this.color) {
                moves.push(board[y + direction][x + 1]);
            }

            if (isInside(board, x - 1, y) && board[y][x - 1].piece instanceof Pawn && board[y][x - 1].piece.color !== this.color) {
                moves.push(board[y + direction][x - 1]);
            }

            return moves;
        }
        getMoves(board, x, y) {
            const moves = [];
            const direction = this.color === "white" ? -1 : 1;

            if (isInside(board, x, y + direction)) {
                if (!board[y + direction][x].piece) {

                    moves.push(board[y + direction][x]);

                }
            }
            if (!this.hasMoved && !board[y + direction][x].piece && !board[y + direction * 2][x].piece) {
                moves.push(board[y + direction * 2][x]);
            }

            if (isInside(board, x, y + direction)) {
                if (board[y + direction][x - 1]?.piece && board[y + direction][x - 1].piece.color !== this.color) {

                    moves.push(board[y + direction][x - 1]);
                }
            }

            if (isInside(board, x, y + direction)) {
                if (board[y + direction][x + 1]?.piece && board[y + direction][x + 1].piece.color !== this.color) {

                    moves.push(board[y + direction][x + 1]);
                }
            }

            if(canEnPassant)
                moves.push(...this.EnPassant(board, x, y, direction));  

            return moves;
        }
    }

    class Rook extends Piece
    {
        constructor(color)
        {
            super(color);

            this.symbol = color === "white" ? "♖" : "♜";
        }
        scanDirection(board, x, y, dx, dy)
        {
            const moves = [];

            x += dx;
            y += dy;

            while (board[y]?.[x])
            {
                const tile = board[y][x];

                if (!tile.piece)
                {
                    moves.push(tile);
                }
                else
                {
                    if (tile.piece.color !== this.color)
                    {
                        moves.push(tile);
                    }
                    break;
                }

                x += dx;
                y += dy;
            }

            return moves;
        }
        getMoves(board, x, y)
        {
            return [
                ...this.scanDirection(board, x, y, 1, 0),
                ...this.scanDirection(board, x, y, -1, 0),
                ...this.scanDirection(board, x, y, 0, 1),
                ...this.scanDirection(board, x, y, 0, -1),
            ];
        }
    }

    const offsets = [
        [2, 1], [2, -1],
        [-2, 1], [-2, -1],
        [1, 2], [1, -2],
        [-1, 2], [-1, -2]
    ];

    class Knight extends Piece
    {
        constructor(color)
        {
            super(color);

            this.symbol = color === "white" ? "♘" : "♞";
        }

        getMoves(board, x, y)
        {
            const moves = [];
            var tempx, tempy;

            for (const [dx, dy] of offsets)
            {
                tempx = x + dx;
                tempy = y + dy;

                if (!isInside(board, tempx, tempy))
                    continue;

                const tile = board[tempy][tempx];

                if (tile.piece == null || tile.piece.color != this.color)
                {
                    moves.push(tile);
                }

            }
            return moves;
        }
    }

    function isInside(board, x, y)
    {
        return y >= 0 && y < board.length && x >= 0 && x < board[y].length;
    }

    class Bishop extends Piece
    {
        constructor(color)
        {
            super(color);

            this.symbol = color === "white" ? "♗" : "♝";
        }
        scanDirection(board, x, y, dx, dy)
        {
            const moves = [];

            x += dx;
            y += dy;

            while (board[y]?.[x])
            {
                const tile = board[y][x];

                if (!tile.piece)
                {
                    moves.push(tile);
                }
                else
                {
                    if (tile.piece.color !== this.color)
                    {
                        moves.push(tile);
                    }
                    break;
                }

                x += dx;
                y += dy;
            }

            return moves;
        }
        getMoves(board, x, y)
        {
            return [
                ...this.scanDirection(board, x, y, 1, 1),
                ...this.scanDirection(board, x, y, 1, -1),
                ...this.scanDirection(board, x, y, -1, 1),
                ...this.scanDirection(board, x, y, -1, -1),
            ];
        }
    }

    class Queen extends Piece
    {
        constructor(color)
        {
            super(color);

            this.symbol = color === "white" ? "♕" : "♛";
        }
        scanDirection(board, x, y, dx, dy)
        {
            const moves = [];

            x += dx;
            y += dy;

            while (board[y]?.[x])
            {
                const tile = board[y][x];

                if (!tile.piece)
                {
                    moves.push(tile);
                }
                else
                {
                    if (tile.piece.color !== this.color)
                    {
                        moves.push(tile);
                    }
                    break;
                }

                x += dx;
                y += dy;
            }

            return moves;
        }
        getMoves(board, x, y)
        {
            return [
                ...this.scanDirection(board, x, y, 1, 0),
                ...this.scanDirection(board, x, y, -1, 0),
                ...this.scanDirection(board, x, y, 0, 1),
                ...this.scanDirection(board, x, y, 0, -1),
                ...this.scanDirection(board, x, y, 1, 1),
                ...this.scanDirection(board, x, y, 1, -1),
                ...this.scanDirection(board, x, y, -1, 1),
                ...this.scanDirection(board, x, y, -1, -1),
            ];
        }
    }

    const directions = [
        [1, 0], [-1, 0],
        [0, 1], [0, -1],
        [1, 1], [1, -1],
        [-1, 1], [-1, -1]
    ];

    class King extends Piece
    {
        constructor(color) {
            super(color);

            this.symbol = color === "white" ? "♔" : "♚";
        }
        checkCastling(board, y, x)
        {
            const moves = [];
            if (isInside(board, x - 4, y) && isInside(board, x + 3, y))
            {
                if (this.color == "white")
                {

                    if (board[y][x + 1].piece == null && board[y][x + 2].piece == null && board[y][x + 3].piece instanceof Rook && !board[y][x + 3].piece.hasMoved && !this.hasMoved)
                    {
                        moves.push(board[y][x + 2]);
                    }
                    if (board[y][x - 1].piece == null && board[y][x - 2].piece == null && board[y][x - 3].piece == null && board[y][x - 4].piece instanceof Rook && !board[y][x - 4].piece.hasMoved && !this.hasMoved)
                    {

                        moves.push(board[y][x - 2]);
                    }
                }

                if (this.color == "black") {
                    if (board[y][x + 1].piece == null && board[y][x + 2].piece == null && board[y][x + 3].piece instanceof Rook && !board[y][x + 3].piece.hasMoved && !this.hasMoved) {
                        moves.push(board[y][x + 2]);
                    }
                    if (board[y][x - 1].piece == null && board[y][x - 2].piece == null && board[y][x - 3].piece == null && board[y][x - 4].piece instanceof Rook && !board[y][x - 4].piece.hasMoved && !this.hasMoved) {
                        moves.push(board[y][x - 2]);
                    }
                }
            }
            return moves;
        }

        getMoves(board, x, y)
        {
            const moves = [];
            var tempx = 0;
            var tempy = 0;

            for (const [dx, dy] of directions)
            {
                tempx = x + dx;
                tempy = y + dy;

                if (!isInside(board, tempx, tempy))
                    continue;


                const tile = board[tempy][tempx];

                if (tile.piece == null || tile.piece.color != this.color)
                {
                    moves.push(tile);
                }
                moves.push(...this.checkCastling(board, y, x));
                
            }
            return moves;
        }
    }

