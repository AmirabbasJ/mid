import { floorDec } from '../../utils/floorDec';

interface Props {
  value: number;
  decimalScale?: number;
}

export const SubNumber = ({ value, decimalScale = 8 }: Props) => {
  const match = /(\d+\.\d)(0{5,})(\d+)/.exec(String(value))!;
  if (!match) return floorDec(value, decimalScale);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, firstHalf, zeros, secondHalf] = match;

  const secondHalfNumber = secondHalf?.slice(0, 4);

  return (
    <>
      {firstHalf}
      <sub>{zeros?.length}</sub>
      {secondHalfNumber}
    </>
  );
};
