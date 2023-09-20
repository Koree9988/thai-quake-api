/*
  Warnings:

  - Added the required column `raw_data_id` to the `fault_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fault_data" ADD COLUMN     "raw_data_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "fault_area" (
    "id" SERIAL NOT NULL,
    "fault_id" INTEGER NOT NULL DEFAULT 0,
    "lats" TEXT,
    "longs" TEXT,
    "utms_x" TEXT,
    "utms_y" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fault_area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fault_data" ADD CONSTRAINT "fault_data_raw_data_id_fkey" FOREIGN KEY ("raw_data_id") REFERENCES "raw_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fault_area" ADD CONSTRAINT "fault_area_fault_id_fkey" FOREIGN KEY ("fault_id") REFERENCES "faults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
