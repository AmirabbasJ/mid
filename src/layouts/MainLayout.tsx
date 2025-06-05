interface Props {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: Props) => {
  return <div className="bg-black flex flex-col w-full">{children}</div>;
};
