import { NextResponse } from 'next/server'

export async function GET() {
  const accessCode = process.env.ESIM_ACCESS_CODE
  const secretKey = process.env.ESIM_SECRET_KEY

  return NextResponse.json({
    accessCodeLength: accessCode?.length || 0,
    accessCodeFirst5: accessCode?.substring(0, 5) || 'undefined',
    accessCodeLast5: accessCode?.substring(accessCode.length - 5) || 'undefined',
    secretKeyLength: secretKey?.length || 0,
    hasAccessCode: !!accessCode,
    hasSecretKey: !!secretKey,
    // Check for quotes
    startsWithQuote: accessCode?.startsWith('"') || false,
    endsWithQuote: accessCode?.endsWith('"') || false,
  })
}
