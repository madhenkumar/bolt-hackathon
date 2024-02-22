import TopNav from "../_components/NavBar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-0 left-0">
    <TopNav/>
    </div>
  );
}
