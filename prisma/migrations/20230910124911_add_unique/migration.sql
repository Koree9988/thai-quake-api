/*
  Warnings:

  - A unique constraint covering the columns `[fault_id]` on the table `fault_area` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fault_area_fault_id_key" ON "fault_area"("fault_id");
