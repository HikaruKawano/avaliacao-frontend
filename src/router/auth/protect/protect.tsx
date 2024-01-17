import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface props {
    isSignedIn: boolean,
    children: ReactNode
}


export default function Protect({ isSignedIn, children }: props) {
    if (!isSignedIn) {
        return <Navigate to="/login" replace />
    }
    return children
}
