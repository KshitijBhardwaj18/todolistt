import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSubtasks } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const subtasks = await generateSubtasks(title, description);

    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error("AI subtask generation error:", error);
    return NextResponse.json(
      { subtasks: [] },
      { status: 200 }
    );
  }
}
