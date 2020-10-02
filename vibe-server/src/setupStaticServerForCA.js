import express from "express";

// Put a ./well-known folder in vibe-server/ for this to work.
export default function (app) {
  app.use("/.well-known", express.static(".well-known", { dotfiles: "allow" }));
}
