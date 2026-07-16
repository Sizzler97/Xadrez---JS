
    class Move {
        constructor(fromX, fromY, toX, toY, piece, capturedPiece = null) {
            this.fromX = fromX;
            this.fromY = fromY;
            this.toX = toX;
            this.toY = toY;

            this.piece = piece;
            this.capturedPiece = capturedPiece;

            this.promoted = false;
            this.castled = false;
            this.enPassant = false;
        }
    }