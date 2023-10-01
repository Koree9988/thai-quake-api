/*
  Warnings:

  - You are about to drop the `fault_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fault_data" DROP CONSTRAINT "fault_data_fault_id_fkey";

-- DropForeignKey
ALTER TABLE "fault_data" DROP CONSTRAINT "fault_data_raw_data_id_fkey";

-- AlterTable
ALTER TABLE "raw_data" ADD COLUMN     "fault_id" INTEGER;

-- DropTable
DROP TABLE "fault_data";

-- AddForeignKey
ALTER TABLE "raw_data" ADD CONSTRAINT "raw_data_fault_id_fkey" FOREIGN KEY ("fault_id") REFERENCES "faults"("id") ON DELETE SET NULL ON UPDATE CASCADE;
