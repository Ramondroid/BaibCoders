import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Received body:', body)

    const { table, data } = body

    if (!table || !data) {
      return NextResponse.json({ error: 'Missing table or data' }, { status: 400 })
    }

    const { error } = await supabase.from(table).insert([data])
    
    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Insert successful' }, { status: 200 }) // ensure 200
  } catch (err: any) {
    console.error('Unhandled API error:', err)
    return NextResponse.json({ error: err.message || 'Unknown server error' }, { status: 500 })
  }
}
