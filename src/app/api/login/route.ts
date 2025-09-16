import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "YM";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (email === "ym@email.com" && password === "123456") {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "8h" });

      return NextResponse.json({ message: "Login bem-sucedido", token });
    } else {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
