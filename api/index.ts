import express from "express";
import fs from "fs";
import path from "path";
import { loginWithUsernamePasswordWithAuthResponse } from "@azure/ms-rest-nodeauth";

const app = express();

app.get("/api/subscriptions", async (req, res) => {
  const { email, password } = req.query as { email: string; password: string };
  if (!email || !password) {
    return res.status(400).json({
      msg: "please input email and password!",
    });
  }
  try {
    const authResponse = await loginWithUsernamePasswordWithAuthResponse(
      email,
      password,
    );
    res.json(authResponse?.subscriptions);
  } catch (error) {
    res.status(500).send({ detail: error.message });
  }
});

module.exports = app;
