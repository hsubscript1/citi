import React from "react";


interface HeaderProps {
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 md:flex hidden capitalize">
        {currentView === "home" ? "Home" : currentView}
      </h1>

    </header>
  );
};

export default Header;
