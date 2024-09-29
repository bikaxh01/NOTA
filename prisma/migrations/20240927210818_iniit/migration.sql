/*
  Warnings:

  - You are about to drop the `folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_workspaceId_fkey";

-- DropTable
DROP TABLE "folder";

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "inTrash" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "inTrash" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workSpaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workSpaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
