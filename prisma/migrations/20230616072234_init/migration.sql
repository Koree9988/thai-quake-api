-- CreateTable
CREATE TABLE "fault_data" (
    "id" SERIAL NOT NULL,
    "magnitute" DOUBLE PRECISION NOT NULL,
    "date_utc" TIMESTAMP(6) NOT NULL,
    "fault_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "fault_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faults" (
    "fault_id" SERIAL NOT NULL,
    "fault_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "faults_pkey" PRIMARY KEY ("fault_id")
);

-- CreateTable
CREATE TABLE "raw_data" (
    "raw_id" SERIAL NOT NULL,
    "date_utc" TIMESTAMP(6) NOT NULL,
    "magnitute" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "utm_x" INTEGER NOT NULL,
    "utm_y" INTEGER NOT NULL,
    "depth" INTEGER,
    "phase" INTEGER,
    "center_th" VARCHAR,
    "center_en" VARCHAR,
    "severity_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "raw_data_pkey" PRIMARY KEY ("raw_id")
);

-- AddForeignKey
ALTER TABLE "fault_data" ADD CONSTRAINT "fault_data_fault_id_fkey" FOREIGN KEY ("fault_id") REFERENCES "faults"("fault_id") ON DELETE SET NULL ON UPDATE CASCADE;
