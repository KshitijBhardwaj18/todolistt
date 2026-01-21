import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { categorizeTodo } from "@/lib/gemini";

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

    const result = await categorizeTodo(title, description);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI categorization error:", error);
    return NextResponse.json(
      { 
        category: "Other",
        priority: "medium",
        suggestedTags: []
      },
      { status: 200 }
    );
  }
}
