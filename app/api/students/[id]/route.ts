import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${process.env.BACK4APP_SERVER_URL}/classes/Students/${id}`,
      {
        method: "DELETE",
        headers: {
          "X-Parse-Application-Id": process.env.BACK4APP_APP_ID || "",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_KEY || "",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.error || "O‘chirishda xatolik" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Server xatoligi" },
      { status: 500 }
    );
  }
}