import fs from "fs";
import { execSync } from "child_process";
import { randomBytes } from "crypto";

// Instalar dependencias
console.log("INSTALANDO DEPENDECIAS");
execSync("npm install");
console.log("DEPENDENCIAS INSTALADAS");

// Crear archivo .env
console.log("CREATING `.env` FILE CONTENT");
const randomIdentifier = Math.floor(Math.random() * 1_000_000) + 100;
const randomJWT_SECRET = randomBytes(32).toString("hex");
const envContent = `MONGODB_CNN='mongodb://localhost:27017/db_control_academico_2022474__${randomIdentifier}'
JWT_SECRET='${randomJWT_SECRET}'
PORT=3000`;

console.log(envContent);
fs.writeFileSync(".env", envContent);
console.log("FILE `.env ` CREATED");
