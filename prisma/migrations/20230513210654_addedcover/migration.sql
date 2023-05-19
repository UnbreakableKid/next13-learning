-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'https://images-na.ssl-images-amazon.com/images/I/51QrFJtVqFL._SX331_BO1,204,203,200_.jpg',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL,
    "status" TEXT NOT NULL DEFAULT 'Reading'
);
INSERT INTO "new_Book" ("author", "createdAt", "id", "published", "rating", "status", "title", "updatedAt") SELECT "author", "createdAt", "id", "published", "rating", "status", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
