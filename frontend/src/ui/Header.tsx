import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className="flex border px-8 py-4 [grid-column:2/3] [grid-row:1/2]">
      <HeaderMenu />
    </div>
  );
}

export default Header;
