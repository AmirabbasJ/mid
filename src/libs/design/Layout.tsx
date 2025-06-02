interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props) => {
  return <div className="bg-black px-6">{children}</div>;
};
