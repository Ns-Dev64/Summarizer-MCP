-- DropIndex
DROP INDEX "Note_title_idx";

-- CreateIndex
CREATE INDEX "Note_id_title_idx" ON "Note"("id", "title");
