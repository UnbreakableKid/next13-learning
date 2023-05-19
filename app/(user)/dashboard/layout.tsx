type layoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return <div className="container mt-7 grid gap-5">{children}</div>;
};
export default layout;
