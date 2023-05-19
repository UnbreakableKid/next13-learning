/*
  Warnings:

  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'https://placehold.co/600x400.png',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL,
    "status" TEXT NOT NULL DEFAULT 'Reading',
    "username" TEXT NOT NULL DEFAULT '1'
);
INSERT INTO "new_Book" ("author", "cover", "createdAt", "id", "published", "rating", "status", "title", "updatedAt") SELECT "author", "cover", "createdAt", "id", "published", "rating", "status", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
