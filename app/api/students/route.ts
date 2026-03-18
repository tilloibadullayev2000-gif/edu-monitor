import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    test: "NEW_CODE_WORKING",
    serverUrlExists: !!process.env.BACK4APP_SERVER_URL,
    appIdExists: !!process.env.BACK4APP_APP_ID,
    restKeyExists: !!process.env.BACK4APP_REST_KEY,
  });
}

export async function POST() {
  return NextResponse.json({ test: "POST_NEW_CODE_WORKING" });
}