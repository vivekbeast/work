import { NextRequest, NextResponse } from "next/server";
import { connectMongodb } from "@/lib/mongodb";
import SubuserForm from "@/models/subuser";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const taskDate = formData.get("taskDate");
    const submissionDate = formData.get("submissionDate");
    const taskDescription = formData.get("taskDescription");
    const taskName = formData.get("taskName");

    if (!userId || !taskDate || !submissionDate || !taskDescription || !taskName) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectMongodb();

    let user = await SubuserForm.findOne({ userId });

    if (user) {
      // Append task to existing user's tasks
      user.tasks.push({ taskDate, submissionDate, taskDescription, taskName, status: "" });
      await user.save();
      return NextResponse.json({ message: "Task added to existing user!" }, { status: 200 });
    } else {
      // Create new user and add the task
      user = new SubuserForm({
        userId,
        tasks: [{ taskDate, submissionDate, taskDescription, taskName , status: "" }],
      });
      await user.save();
      return NextResponse.json({ message: "User created and task added!" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save form data. Details: " }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, taskName, status } = await request.json();

    if (!userId || !taskName || !status) {
      return NextResponse.json({ error: "UserId, taskName, and status are required." }, { status: 400 });
    }

    await connectMongodb();

    // Find the user and the specific task in one go
    const user = await SubuserForm.findOne({ userId, "tasks.taskName": taskName });

    if (!user) {
      return NextResponse.json({ error: "User or task not found." }, { status: 404 });
    }

    // Find the specific task
    const task = user.tasks.find((t: { taskName: any; }) => t.taskName === taskName);

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    // Ensure `status` is treated as a string
    task.status = status;

    await user.save(); // Save the updated document

    return NextResponse.json({ message: "Task status updated successfully!", task }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task. Details: "  }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required." }, { status: 400 });
  }

  try {
    await connectMongodb();

    const user = await SubuserForm.findOne({ userId });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Tasks fetched successfully.", tasks: user.tasks },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch form data." }, { status: 500 });
  }
}




// import SubuserForm from "@/models/subuser";
// import { connectMongodb } from "@/lib/mongodb";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const formData = await request.formData();

//   const userId = formData.get('userId');
//   const taskDate = formData.get('taskDate');
//   const submissionDate = formData.get('submissionDate');
//   const taskDescription = formData.get('taskDescription');
// //   const uploadedImages = formData.getAll('uploadedImages');

//   try {
//     await connectMongodb();

//     const newSubuserForm = new SubuserForm({
//       userId,
//       taskDate,
//       submissionDate,
//       taskDescription,
//     //   uploadedImages: uploadedImages.map((file) => ({
//     //     imageUrl: URL.createObjectURL(file), 
//     //     filename: file.name, 
//     //   })),
//     });

//     await newSubuserForm.save();

//     return NextResponse.json({ message: "Form data saved successfully!" }, { status: 200 });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     return NextResponse.json({ error: "An error occurred while saving form data" }, { status: 500 });
//   }
// }




// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId"); // Retrieve userId from query parameters

//   if (!userId) {
//     return NextResponse.json(
//       { error: "User ID is required to fetch form data." },
//       { status: 400 }
//     );
//   }

//   try {
//     // Connect to MongoDB
//     await connectMongodb();

//     // Fetch user data based on the userId
//     const formData = await SubuserForm.findOne({ userId });

//     if (!formData) {
//       return NextResponse.json(
//         { error: "Form data not found for the specified User ID." },
//         { status: 404 }
//       );
//     }

//     // No need to check for 'role' field anymore, just return success if user is found
//     return NextResponse.json(
//       { message: "User ID verified successfully." },
//       { status: 200 }
//     );
    
//   } catch (error) {
//     console.error("Error fetching form data:", error);
//     return NextResponse.json(
//       { error: "An error occurred while fetching form data." },
//       { status: 500 }
//     );
//   }
// }
