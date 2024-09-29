-- CreateTable
CREATE TABLE "workSpaces" (
    "id" TEXT NOT NULL,
    "workspaceOwner" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "inTrash" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workSpaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "inTrash" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workSpaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
