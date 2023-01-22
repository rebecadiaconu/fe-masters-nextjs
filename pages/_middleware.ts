import { NextResponse } from 'next/server'
import { AuthMode } from '../lib/EndpointsModels'

const signedinPages = ['/', '/playlist', '/library']

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect(`/${AuthMode.SIGN_IN}`)
    }
  }
}
