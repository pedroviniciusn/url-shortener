-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "new_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_new_url_key" ON "urls"("new_url");
