-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATETIME NOT NULL,
    "progress" INTEGER NOT NULL
);
