import { floorDec, separateThousand } from '@/utils';

interface Props {
  value: number;
  decimalScale?: number;
}

export const SubNumber = ({ value, decimalScale = 8 }: Props) => {
  const match = /(\d+\.\d)(0{5,})(\d+)/.exec(String(value))!;
  if (!match) return separateThousand(floorDec(value, decimalScale));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, firstHalf, zeros, secondHalf] = match;

  const secondHalfNumber = secondHalf?.slice(0, 4);

  return (
    <>
      {separateThousand(firstHalf!)}
      <sub>{zeros?.length}</sub>
      {secondHalfNumber}
    </>
  );
};
