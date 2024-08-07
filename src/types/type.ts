export interface Member {
  id: string;
  name: string;
  reading: string; //ふりがな
  faculty: string; //学部
  studentNum: number; //学籍番号
  year: number; //学年
  campus: string;
};

export interface Board {
  id: string;
  title: string;
  text: string;
}

export type SquareType = string | null;

export interface SquareProps {
  value: SquareType;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface BoardType {
  xIsNext: boolean;
  squares: SquareType[];
  onPlay: (nextSquares: SquareType[]) => void;
}

export type GptText = string;

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}