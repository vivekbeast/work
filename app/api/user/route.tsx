import User from "@/models/user";
import { connectMongodb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// POST request: User Registration
export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

// GET request: Fetch User Details by Email
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  console.log("Full Request URL:", request.url); // Log the full request URL
  console.log("Parsed Email:", email); // Log the email value

  if (!email) {
    return NextResponse.json(
      { error: "Email is required to fetch user details." },
      { status: 400 }
    );
  }

  try {
    await connectMongodb();
    const user = await User.findOne({ email });

    console.log("Fetched User:", user); // Log the fetched user data

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
    console.error("Error in API:", error); // Log errors
    return NextResponse.json(
      { error: "An error occurred while fetching user details." },
      { status: 500 }
    );
  }
}

