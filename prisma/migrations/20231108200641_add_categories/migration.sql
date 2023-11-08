-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serverServerId" TEXT,
    "productProductId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_serverServerId_fkey" FOREIGN KEY ("serverServerId") REFERENCES "Server"("serverId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productProductId_fkey" FOREIGN KEY ("productProductId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
