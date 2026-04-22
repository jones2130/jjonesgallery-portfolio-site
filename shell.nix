{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.git
    pkgs.python311
    pkgs.poetry
  ];
}