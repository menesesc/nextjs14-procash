'use server'
import { NextResponse } from 'next/server'

export type PedidoProps = {
  pedido: string,
  cliente: string,
  atm: string,
  direccion: string,
  localidad: string,
  provincia: string,
  tecnicoasistio: string,
  fechaalta: string,
  horaalta: string,
  fechallegada: string,
  horallegada: string,
  fechafin: string,
  horafin: string,
  };

  export async function createPedido(pedido: PedidoProps) {
    try {
      console.log(pedido)
      const pedidoRes = await fetch('/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: pedido,
      })
      const pedidoJson = await pedidoRes.json()
      return NextResponse.json(pedidoJson)

    } catch (error) {
      console.log(error);
    }
  }
export async function createBulkUPedidos(pedidos: PedidoProps[]) {
    try {
      for (const pedido of pedidos) {
        await createPedido(pedido);
      }
    } catch (error) {
      console.log(error);
    }
  }
