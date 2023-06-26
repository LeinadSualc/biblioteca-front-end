import { NextResponse } from 'next/server'
import axios from 'axios'
import jwt from 'jsonwebtoken'



export async function POST(req: Request) {
    const { email, senha }: any = await req.json();
  
    try {
      const response = await axios.post('http://localhost:8000/login', {    
        email,
        password: senha,
      });
  
      if (response.status === 200) {
        // Login bem-sucedido
        const token = response.data.token;
  
        // Realize qualquer tratamento adicional necessário antes de retornar a resposta
  
        return NextResponse.json({ token });
      } else {
        // Trate o caso de erro no login, como credenciais inválidas
        return new Response('Dados incorretos', {
          status: 401,
        });
      }
    } catch (error: any) {
      console.error(error);
      return new Response(error.message, {
        status: 500,
      });
    }
  }