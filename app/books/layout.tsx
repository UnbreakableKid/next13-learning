type layoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  return (
    <div className="container mt-7 grid gap-5">
      <h1>Books</h1>

      {children}
    </div>
  );
};
export default Layout;
