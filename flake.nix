{
  description = "Multiframework Sudoku";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodejs = pkgs.nodejs_22;
        lolcat = pkgs.lolcat;
      in  {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            lolcat
          ];
          shellHook = ''
            SHOW_CURSOR='\e[?25h'
            GREEN='\033[0;32m'
            YELLOW='\033[0;33m'
            BLUE='\033[0;34m'
            WHITE='\033[0;37m'

            NODE_VERSION=$(node -v | cut -c2-)
            cat ascii-art.txt | lolcat
            echo -e "$GREEN \n"
            echo -e "🚀 Welcome to the multiframework sudoku development environment!"
            echo -e "$BLUE"
            echo -e "🔷 node: $NODE_VERSION"
            echo -e "$WHITE"

            export PS1="nx-sudoku $ $SHOWCURSOR"
          '';
        };
      }
    );
}