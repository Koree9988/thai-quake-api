/*
  Warnings:

  - The primary key for the `faults` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fault_id` on the `faults` table. All the data in the column will be lost.
  - You are about to drop the column `fault_name` on the `faults` table. All the data in the column will be lost.
  - The primary key for the `raw_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `raw_id` on the `raw_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "fault_data" DROP CONSTRAINT "fault_data_fault_id_fkey";

-- AlterTable
ALTER TABLE "fault_data" ADD COLUMN     "deleted_at" TIMESTAMP(6),
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "faults" DROP CONSTRAINT "faults_pkey",
DROP COLUMN "fault_id",
DROP COLUMN "fault_name",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "faults_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "raw_data" DROP CONSTRAINT "raw_data_pkey",
DROP COLUMN "raw_id",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "severity_level" SET DEFAULT 0,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "raw_data_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "fault_data" ADD CONSTRAINT "fault_data_fault_id_fkey" FOREIGN KEY ("fault_id") REFERENCES "faults"("id") ON DELETE SET NULL ON UPDATE CASCADE;
