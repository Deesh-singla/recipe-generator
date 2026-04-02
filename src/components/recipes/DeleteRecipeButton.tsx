"use client";

import { deleteRecipe } from "@/src/actions/generate";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

const DeleteRecipeButton = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteRecipe(id);
                });
            }}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Delete recipe"
            title="Delete recipe"
        >
            <Trash2 size={18} />
        </button>
    );
};

export default DeleteRecipeButton;
