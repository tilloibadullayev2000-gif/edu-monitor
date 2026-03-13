import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.BACK4APP_SERVER_URL}/classes/Payments`,
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": process.env.BACK4APP_APP_ID || "",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_KEY || "",
          "Content-Type": "application/json",
        },
        cache: "no-store",
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
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server xatoligi" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      studentName: String(body.studentName || ""),
      amount: String(body.amount || ""),
      status: String(body.status || ""),
      date: String(body.date || ""),
    };

    const response = await fetch(
      `${process.env.BACK4APP_SERVER_URL}/classes/Payments`,
      {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": process.env.BACK4APP_APP_ID || "",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Payments saqlashda xatolik" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server xatoligi" },
      { status: 500 }
    );
  }
}