-- CreateTable
CREATE TABLE "ServerOwner" (
    "id" SERIAL NOT NULL,
    "serverOwnerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "ServerOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerOwner_serverOwnerId_key" ON "ServerOwner"("serverOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "ServerOwner_email_key" ON "ServerOwner"("email");
