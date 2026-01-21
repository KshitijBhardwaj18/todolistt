import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// UPDATE a todo
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Verify the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo || existingTodo.userId !== session.user.id) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Update the todo
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.completed !== undefined) updateData.completed = body.completed;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
    if (body.order !== undefined) updateData.order = body.order;

    const todo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("Update todo error:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE a todo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo || existingTodo.userId !== session.user.id) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete todo error:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
