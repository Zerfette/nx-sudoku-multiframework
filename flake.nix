{
  description = "Multiframework Sudoku";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodejs = pkgs.nodejs_22;
      in  {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
          ];
          shellHook = ''
            SHOW_CURSOR='\e[?25h'
            GREEN='\033[0;32m'
            YELLOW='\033[0;33m'
            BLUE='\033[0;34m'
            WHITE='\033[0;37m'
            NODE_VERSION=$(node -v)
            
            echo -e "$GREEN"
            echo -e "🚀 Welcome to the Multiframework NX Sudoku development enviroment!"
            echo -e "$YELLOW"
            echo -e "🔷 node: $NODE_VERSION"
            echo -e "$WHITE"

            export PS1="$BLUE[Sudoku] $ $WHITE$SHOWCURSOR"
          '';
        };
      }
    );
}