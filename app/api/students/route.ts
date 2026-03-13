import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.BACK4APP_SERVER_URL}/classes/Students`,
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": process.env.BACK4APP_APP_ID || "",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_KEY || "",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Back4App xatoligi" },
        { status: response.status }
      );
    }

    return NextResponse.json({ results: data.results || [] });
  } catch {
    return NextResponse.json(
      { error: "Server xatoligi" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.BACK4APP_SERVER_URL}/classes/Students`,
      {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": process.env.BACK4APP_APP_ID || "",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: body.fullName,
          groupName: body.groupName,
          phone: body.phone,
          parentName: body.parentName,
          parentPhone: body.parentPhone,
          balance: Number(body.balance),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Back4App xatoligi" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { error: "Server xatoligi" },
      { status: 500 }
    );
  }
}