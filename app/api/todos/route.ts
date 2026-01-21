import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET all todos for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: [
        { completed: "asc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ todos });
  } catch (error) {
    console.error("Get todos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// CREATE a new todo
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, priority, category, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Get the highest order value to place new todo at the end
    const lastTodo = await prisma.todo.findFirst({
      where: { userId: session.user.id },
      orderBy: { order: "desc" },
    });

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        priority: priority || "medium",
        category: category || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        order: (lastTodo?.order || 0) + 1,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ todo }, { status: 201 });
  } catch (error) {
    console.error("Create todo error:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
