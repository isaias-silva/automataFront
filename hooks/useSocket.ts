/* eslint-disable react-hooks/exhaustive-deps */
import { Socket } from 'dgram'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

export function useSocket(url: string, token?: string|null): Socket {
    const [socket, setSocket]: Socket | any = useState(null)

    useEffect(() => {
        const socketIo = io(url, {
            query: {
                token
            }
        })

        setSocket(socketIo)

        function cleanup() {
            socketIo.disconnect()
        }
        return cleanup

        // should only run once and not on every re-render,
        // so pass an empty array
    }, [])

    return socket
}