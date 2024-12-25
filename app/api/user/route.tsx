import User from "@/models/user";
import { connectMongodb } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { name, email, companyName } = await request.json();
    if (!name || !email || !companyName) {
      return NextResponse.json(
        { error: "Name, email, and company name are required." },
        { status: 400 }
      );
    }

        await connectMongodb();
        await User.create({ name, email, companyName });
        return NextResponse.json({ message: "User Registered" }, { status: 201 });
    
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email'); // Retrieve email from query parameters

  if (!email) {
    return NextResponse.json(
      { error: "Email is required to fetch user details." },
      { status: 400 }
    );
  }

  try {
    await connectMongodb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { name: user.name, email: user.email, companyName: user.companyName },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching user details." },
      { status: 500 }
    );
  }
}